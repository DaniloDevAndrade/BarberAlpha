'use server'
import { prisma } from "@/database/database"
import { Prisma } from "@prisma/client"

export async function getAllCosts(emailBusiness: string){
    try {
        const where: Prisma.BusinessWhereInput = {}
        if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}

        const findBusiness = await prisma.business.findFirst({where})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}
            
        const costs = await prisma.costs.findMany({
            where: 
            {businessId: findBusiness.id}
        , orderBy: {custsDate: 'desc'}})

        return { success: true, costs }

    } catch (error) {
        console.log(error)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {success: false, message: error.message}
    }
}