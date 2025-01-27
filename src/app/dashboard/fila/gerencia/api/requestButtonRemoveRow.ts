'use server'

import { prisma } from "@/database/database"
import { RowPositionStatus } from "@prisma/client"

type requestUsersRemoveRow = {
    emailBusiness: string;
    userEmail: string
  }

export default async function removeUsersRow(body: requestUsersRemoveRow ) {
    try {

        const BusinessBody = body
        const { emailBusiness, userEmail } = BusinessBody

        const findBusiness = await prisma.business.findUnique({where: {email: emailBusiness}})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}

        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})
        if(!findRow) return {success: false, error:{message: "Fila não encontrada"}}
        
        const findUser = await prisma.users.findFirst({
            where: {
                AND: [
                    { rowId: findRow.id },
                    { email: userEmail }
                ]
            }
        })


        if(!findUser) return {success: false, error:{message: "Usuario não encontrada"}}
        
        if(findUser.position === null) return {success: false, error:{message: "Posição do usuario não encontrada!"}}
        
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

        const dataRemoveUserRow = {
            rowId: null,
            position: null,
            rowStatus: "Waiting" as RowPositionStatus
        }

        const removeUserRow = await prisma.users.update({where: {phone: findUser.phone}, data: dataRemoveUserRow})
        return {success: true, removeUserRow}
        } catch (error) {
            return {success: false, error:{message: error}}
        }
}
