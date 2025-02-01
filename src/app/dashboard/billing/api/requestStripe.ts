'use server'

import { prisma } from "@/database/database"
import { createCheckoutSession } from "@/services/stripe"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"

export async function requestCreateSubscribeSession(emailBusiness: string) {
    const where: Prisma.BusinessWhereInput = {}
    if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
      
    const findBusiness = await prisma.business.findFirst({where})
    if(!findBusiness) return console.log({success: false, error:{message: "Barbearia não encontrada, faça login!"}})

    const checkoutSession = await createCheckoutSession(findBusiness.id, findBusiness.email, findBusiness.stripeSubscriptionId as string)

    if(!checkoutSession.url) return

    redirect(checkoutSession.url)
}