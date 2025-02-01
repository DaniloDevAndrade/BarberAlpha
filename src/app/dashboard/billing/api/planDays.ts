'use server'

import { prisma } from "@/database/database"
import { Prisma } from "@prisma/client"

export async function planDays(emailBusiness: string) {

    const where: Prisma.BusinessWhereInput = {}
    if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
          
    const findBusiness = await prisma.business.findFirst({where})
    if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}

    const now = new Date();
    const dayDifference = Math.floor((now.getTime() - findBusiness.createdAt.getTime()) / (1000 * 3600 * 24));

    const daysOff = Math.max(0, 7 - dayDifference);

    const percent = Math.max(0, Math.min(100, (dayDifference / 7) * 100)).toFixed(0);

    const days = {
        daysOff,
        percent,
        currentDay: dayDifference
    }

    return {days}
}
