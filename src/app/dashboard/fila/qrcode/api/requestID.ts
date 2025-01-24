'use server'

import { prisma } from "@/database/database"
import { Prisma } from "@prisma/client"

export async function requestQRCode(emailBusiness: string){
    try {
        const where: Prisma.BusinessWhereInput = {}
                
            if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
            
            const findBusiness = await prisma.business.findFirst({where})    
            if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada!"}}

            const businessId = findBusiness.id
        
            return { success: true, businessId }
    } catch (error) {
        console.log(error)
        return {success: false, error:{message: "Ocorreu algum erro!"}}
    }
}