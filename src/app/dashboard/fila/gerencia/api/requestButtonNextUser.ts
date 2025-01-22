'use server'

import { prisma } from "@/database/database"
import { RowPositionStatus } from "@prisma/client"

export default async function NextUserRow(emailBusiness: string ) {
    try {
        const dataRemoveUserRow = {
            rowId: null,
            position: null,
            rowStatus: "Waiting" as RowPositionStatus
        }

        const findBusiness = await prisma.business.findUnique({where: {email: emailBusiness}})
        if(!findBusiness) return {created: false, error:{message: "Barbearia não encontrada, faça login!"}}
        
        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})
        if(!findRow) return {created: false, error:{message: "Fila não encontrada"}}
        
        const findUser = await prisma.users.findFirst({
            where: { rowId: findRow.id },
            orderBy: {position: 'asc'}
        })
        if(!findUser) return {error:{message: "Usuario não encontrado!"}}

        if(findUser.position === null) return {error:{message: "Posição do Usuario não encontrada!"}}

        const remainUsers = await prisma.users.findMany({
            where: {
                rowId: {contains: findRow.id},
                position: {
                    gt: findUser.position,
                }
            },
            orderBy: {
                position: "asc"
            }
        })

        if(findUser.rowStatus === "InServiced" && remainUsers.length === 0){
            const removeUserRow = await prisma.users.update({where: {phone: findUser.phone}, data: dataRemoveUserRow})
            return {message:"Ultimo Cliente Atendido, Fila Vazia", removeUserRow}
        }

        if (findUser.rowStatus === "InServiced"){
            const nextuser = remainUsers[0]
            const updateStatusNextUser = await prisma.users.update({where: {phone: nextuser.phone}, data: {rowStatus: "InServiced" as RowPositionStatus}})
            for (let i = 0; i < remainUsers.length; i++) {
                const users = remainUsers[i];
                    if (users && typeof users.position === 'number') {
                        await prisma.users.update({
                            where: { phone: users.phone },
                            data: {
                                position: users.position - 1
                            }
                        });
                    } else {
                        console.error(`Usuario na posição de array ${i} não tem posição definida!.`);
                    }
            }

            const removeUserRow = await prisma.users.update({where: {phone: findUser.phone}, data: dataRemoveUserRow})

            return {updateStatusNextUser, removeUserRow}
        }
        
        const CallNextUserRow = await prisma.users.update({where: {phone: findUser.phone}, data: {rowStatus: "InServiced" as RowPositionStatus}})

        return {CallNextUserRow}
    } catch (error) {
        console.error('Error:', error);
    }
}
