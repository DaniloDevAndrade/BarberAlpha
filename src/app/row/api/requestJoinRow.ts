'use server'
import { prisma } from "@/database/database"
import { UserCreateSchemaRegister } from "@/schemas/UserSchema"
import { RowPositionStatus } from "@prisma/client"
import jwt from 'jsonwebtoken'

type BodyType = {
    name: string,
    email: string,
    phone: string
}

export async function requestJoinRow(businessId: string, body: BodyType) {
    const secret = process.env.JWT_KEY_SECRET as string

    try {
        const UserBody = UserCreateSchemaRegister.parse(body)

        const findUser = await prisma.users.findFirst({where: {phone: UserBody.phone}})
        const findRow = await prisma.row.findFirst({where: {businessId}})

        const position = await prisma.users.count({where: {rowId: findRow?.id}})
        if(!findRow) return {success: false, error:{message: "Fila não encontrada!"}}
        
        if(findRow.status === "Inactive") return {rowClosed: true, error:{message: "Fila está desativada pela barbearia, Tente mais tarde!"}}

        if(!findUser){
            const newUser = {
                name: UserBody.name,
                phone: UserBody.phone,
                email: UserBody.email,
                rowId: findRow.id,
                position: position + 1,
                businessId,
                joinRowAt: new Date()
            }

            const user = await prisma.users.create({data: newUser})

            const payload = {
                name: user.name,
                phone: user.phone
            }
    
            const token = jwt.sign(payload, secret, {expiresIn: '1d'})
            return {success: true, user, token}
        }

        const updateUser = {
            rowId: findRow.id,
            position: position + 1,
            rowStatus: "Waiting" as RowPositionStatus,
            joinRowAt: new Date()
        }

        const user = await prisma.users.update({where: {phone: findUser.phone}, data: updateUser})

        const payload = {
            name: user.name,
            phone: user.phone
        }

        const token = jwt.sign(payload, secret, {expiresIn: '1d'})

        return {success: true, user, token}
    } catch (error) {
        return {success: false, error: error}
    }
}