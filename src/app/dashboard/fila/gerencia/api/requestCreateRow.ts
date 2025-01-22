'use server'
import { prisma } from "@/database/database"
import { RowStatus } from "@prisma/client"

export async function requestCreateRow(emailBusiness: string){
    try {
        const findBusiness = await prisma.business.findUnique({where: {email: emailBusiness}})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}
        
        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})

        if(!findRow){
            const newRow = {
                businessId: findBusiness.id as string,
                status: 'Inactive' as RowStatus
            }
            const Row = await prisma.row.create({data: newRow})
            return {success: true, Row}
        }
        
        const updateRowData = findRow.status === "Active" ? "Inactive" : "Active"
        const Row = await prisma.row.update({
            where: {id: findRow.id},
            data: {status: updateRowData}
        })
        return {sucesss: true, Row}
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {success: false, error:{message: error.message}}
    }
}

export async function requestOneRow(emailBusiness: string ){
    try {
        const findBusiness = await prisma.business.findUnique({where: {email: emailBusiness}})
        if(!findBusiness) return {created: false, error:{message: "Barbearia não encontrada, faça login!"}}
        
        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})
        if(!findRow) return {created: false, error:{message: "Fila não encontrada"}}

        const result = await prisma.row.findFirst({
            where: {id: findRow.id}
        })

        if(!result) return {created: false, error:{message: "Fila, não encontrada!"}}

        return result
    } catch (error) {
        return {created: false, error:{message: error}}
    }
}