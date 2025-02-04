'use server'
import { prisma } from '@/database/database';
import { RowPositionStatus } from '@prisma/client';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    phone: string;
    name: string;
}

export async function requestRow(token: string) {
    const secret = process.env.JWT_KEY_SECRET as string;
    try {
        const decoded = jwt.verify(token, secret) as DecodedToken;
        const { phone } = decoded
        const user = await prisma.users.findFirst({where: {phone: phone}})
        return {success: true, user};
    } catch (error) {
        return {success: false, error:{message: error} };
    }
}

export async function requestRemoveRow(phone: string) {
    try {
        const findUser = await prisma.users.findFirst({where: {phone}})
        if(!findUser) return {success: false, error:{message: "Usuario não está em uma fila"}}

        const findBusiness = await prisma.business.findUnique({where: {id: findUser.businessId as string}})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada!"}}

        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})
        if(!findRow) return {success: false, error:{message: "Fila não encontrada"}}
        
        if(findUser.position === null) return {success: false, error:{message: "Posição do Usuario não encontrada!"}}
        
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
            rowStatus: "Waiting" as RowPositionStatus,
            lastCall: null
        }

        const removeUserRow = await prisma.users.update({where: {phone: findUser.phone}, data: dataRemoveUserRow})
        return {success: true, removeUserRow}
    } catch (error) {
        return {success: false, error: error}
    }
}