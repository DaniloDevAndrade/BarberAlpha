'use server'

import { prisma } from "@/database/database"
import { RowStatus } from "@prisma/client"

export default async function NextUserRow(emailBusiness: string ) {
    try {
        const findBusiness = await prisma.business.findUnique({where: {email: emailBusiness}})

        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}
        
        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})

        if(!findRow){
            const newRow = {
                businessId: findBusiness.id as string,
                status: 'Inactive' as RowStatus
            }
    
            const createRow = await prisma.row.create({data: newRow})
            return {success: true, createRow}
        }
        
        const updateRowData = findRow.status === "Active" ? "Inactive" : "Active"

        const updatedRow = await prisma.row.update({
            where: {id: findRow.id},
            data: {status: updateRowData}
        })

        return {success: true, updatedRow}
    } catch (error) {
        return {success: false, error:{message: error}}
    }
}
