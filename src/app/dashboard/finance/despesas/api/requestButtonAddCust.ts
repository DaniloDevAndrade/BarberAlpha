'use server'

import { prisma } from "@/database/database"
import { categoryCosts, Prisma } from "@prisma/client"



type BodyAddCosts = {
    custValue: string,
    description: string,
    custsDate: Date,
    category: categoryCosts,
}

export async function postCustsAdd(body: BodyAddCosts, emailBusiness: string) {
    try {
    const where: Prisma.BusinessWhereInput = {}
        
    if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
    const findBusiness = await prisma.business.findFirst({where})
    if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada!"}}
    const bodyCreate = {
        businessId: findBusiness.id,
        value: body.custValue,
        description: body.description,
        custsDate: body.custsDate,
        category: body.category,
    }

    const costs = await prisma.costs.create({data: bodyCreate}) 
    

    return { success: true, costs }
    } catch (error) {
        console.log(error)
        return {success: false, error:{message: "Ocorreu algum erro!"}}
    }
    
}