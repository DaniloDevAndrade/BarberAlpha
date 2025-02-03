'use server'

import { prisma } from "@/database/database"
import { Prisma } from "@prisma/client"
import { UserAll } from "../components/types";

export async function getUsersBusiness(emailBusiness: string): Promise<{success: boolean; users?: UserAll[]; error?: {message: string}}> {
    try {
    const where: Prisma.BusinessWhereInput = {}
        
    if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
    const findBusiness = await prisma.business.findFirst({where})
        
    if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada!"}}
    const users = await prisma.users.findMany({
        where: {
            businessId: findBusiness.id}, 
        include: {
            FinishedHaircuts: {
                where: {businessId: findBusiness.id}, 
                select: {createdAt: true},
                orderBy: {createdAt: 'desc'}
        }},
        orderBy: {createdAt: 'asc'}
    })

    return { success: true, users }
        
    } catch (error) {
        console.log(error)
        return {success: false, error:{message: "Ocorreu algum erro!"}}
    }
    
}