'use server'

import { prisma } from "@/database/database"
import { Prisma, Users } from "@prisma/client"

export async function getUsersBusiness(emailBusiness: string): Promise<{success: boolean; users?: Users[]; error?: {message: string}}> {
    try {
    const where: Prisma.BusinessWhereInput = {}
        
    if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
    const findBusiness = await prisma.business.findFirst({where})
        
    if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada!"}}
    const users = await prisma.users.findMany({where: {businessId: findBusiness.id}}) as Users[]

    return { success: true, users }
        
    } catch (error) {
        console.log(error)
        return {success: false, error:{message: "Ocorreu algum erro!"}}
    }
    
}