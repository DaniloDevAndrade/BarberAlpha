'use server'
import { prisma } from "@/database/database";
import { UserCreateSchemaDashboard } from "@/schemas/UserSchema";
import { RowPositionStatus } from "@prisma/client";

type BodyTypeNewUser = {
    emailBusiness: string;
    userName: string;
    userPhone: string;
    userEmail?: string;
}

export default async function requestAddUser(body: BodyTypeNewUser){

    try {
        const UserBody = UserCreateSchemaDashboard.parse(body)

        const findBusiness = await prisma.business.findUnique({where: {email: UserBody.emailBusiness}})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}

        const findUser = await prisma.users.findFirst({where: {phone: UserBody.userPhone}})

        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})
        if(!findRow) return {success: false, error:{message: "Fila não encontrada"}}

        const position = await prisma.users.count({where: {rowId: findRow?.id}})
        if(!findRow) return {success: false, error:{message: "Fila não encontrada!"}}

        if(!findUser){
            const newUser = {
                name: UserBody.userName,
                phone: UserBody.userPhone,
                email: UserBody.userEmail,
                rowId: findRow.id,
                position: position + 1,
                businessId: findBusiness.id,
                joinRowAt: new Date()
            }
            const User = await prisma.users.create({data: newUser})
            return {success: true, User}
        }

        const updateUser = {
            rowId: findRow.id,
            position: position + 1,
            rowStatus: "Waiting" as RowPositionStatus,
            joinRowAt: new Date()
        }

        const User = await prisma.users.update({where: {phone: findUser.phone}, data: updateUser})

        return {success: true, User}
    } catch (error) {
        console.log(error)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {success: false, message: error.message}
    }
}