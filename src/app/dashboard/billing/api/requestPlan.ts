'use server'

import { prisma } from "@/database/database"
import { getPlanByPrice } from "@/services/stripe"
import { Prisma } from "@prisma/client"

type returnPlan = {
    plan?: {
        name: string
    }
    planStatus?:{
        status: string | null
    }
    success?: boolean
    error?: {
        message: string
    }
}

export async function requestPlan(emailBusiness: string): Promise<returnPlan> {
    const where: Prisma.BusinessWhereInput = {}
    if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
      
    const findBusiness = await prisma.business.findFirst({where})
    if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}

    const plan = await getPlanByPrice(findBusiness.stripePriceId as string)
    const planStatus = {
        status: findBusiness.stripeSubscriptionStatus
    } 
    return {plan, planStatus}
}