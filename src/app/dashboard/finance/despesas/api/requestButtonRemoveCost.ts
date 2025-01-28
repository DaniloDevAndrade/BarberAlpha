'use server'

import { prisma } from "@/database/database"

type requestUsersRemoveRow = {
    emailBusiness: string;
    costsId: string
  }

export default async function removeCost(body: requestUsersRemoveRow ) {
    try {

        const BusinessBody = body
        const { emailBusiness, costsId } = BusinessBody

        const findBusiness = await prisma.business.findUnique({where: {email: emailBusiness}})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}

        const findCost = await prisma.costs.findFirst({
            where: {
                AND: [
                    { businessId: findBusiness.id },
                    { id: costsId }
                ]
            }
        })


        if(!findCost) return {success: false, error:{message: "Despesa não encontrada"}}
        
        const removeCost = await prisma.costs.delete({where: {id: findCost.id}})
        return {success: true, removeCost}
        } catch (error) {
            return {success: false, error:{message: error}}
        }
}
