'use server'

import { prisma } from "@/database/database"
import { UserFinallyHairCut } from "@/schemas/UserSchema";
import { Prisma, RowPositionStatus } from "@prisma/client"

type BodyTypeNewUser = {
    emailBusiness: string;
    hairValue: string
}

export async function requestButtonFinally(body: BodyTypeNewUser) {
    try {
        const dataRemoveUserRow = {
                    rowId: null,
                    position: null,
                    rowStatus: "Waiting" as RowPositionStatus,
                    lastCall: null
        }

        const {emailBusiness, hairValue} = UserFinallyHairCut.parse(body)

        const where: Prisma.BusinessWhereInput = {}
        if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
        
        const findBusiness = await prisma.business.findFirst({where})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}
                    
        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})
        if(!findRow) return {success: false, error:{message: "Fila não encontrada"}}

        const user = await prisma.users.findFirst({where: {rowId: findRow.id}, orderBy: {position: 'asc'}})

        if(user?.rowStatus !== 'InServiced') return {success: false, error:{message: "Usuario não está em atendimento!"}}

        if(user.position !== 0) return {success: false, error:{message: "Usuario não está na posição 0 da fila!"}}

        const remainUsers = await prisma.users.findMany({
            where: {
                rowId: {contains: findRow.id},
                position: {
                    gt: user.position,
                }
            },
            orderBy: {
                position: "asc"
            }
        })

        await prisma.users.update({where: {phone: user.phone}, data: dataRemoveUserRow})

        const dataNewHairCutFinally = {
            userId: user.id,
            businessId: findBusiness.id,
            value: hairValue,
            timeInRow: user.joinRowAt as Date
        }
        console.log(dataNewHairCutFinally)

        await prisma.finishedHaircuts.create({data: dataNewHairCutFinally})

        for (let i = 0; i < remainUsers.length; i++) {
            const users = remainUsers[i];
            if (users && typeof users.position === 'number') {
                await prisma.users.update({
                    where: { phone: users.phone },
                    data: {
                    position: users.position - 1}
        })}};

        return {success: true, message: "Corte Finalizado com sucesso!"}
    } catch (error) {
        return {success: false, error:{message: error}}
    }
}