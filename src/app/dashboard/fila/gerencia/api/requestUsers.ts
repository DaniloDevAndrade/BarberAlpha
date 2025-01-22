'use server'
import { prisma } from "@/database/database"
import { Prisma } from "@prisma/client"

export async function getUsersRow(emailBusiness: string){
    try {
        const where: Prisma.BusinessWhereInput = {}
        if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}

        const findBusiness = await prisma.business.findFirst({where})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}
            
        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})
        if(!findRow) return {success: false, error:{message: "Fila não encontrada"}}

        const users = await prisma.users.findMany({
            where: 
            {rowId: findRow.id}
        , orderBy: {position: 'asc'}})

        return { success: true, users }

    } catch (error) {
        console.log(error)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {success: false, message: error.message}
    }
}