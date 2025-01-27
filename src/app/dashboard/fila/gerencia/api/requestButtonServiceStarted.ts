'use server'

import { prisma } from "@/database/database"
import { RowPositionStatus } from "@prisma/client"

export default async function ServiceStartedRow(emailBusiness: string ) {
    try {
        
        const findBusiness = await prisma.business.findUnique({where: {email: emailBusiness}})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}
        
        const findRow = await prisma.row.findFirst({where: {businessId: findBusiness.id}})
        if(!findRow) return {success:false, error:{message: "Fila não encontrada"}}
        
        const findUser = await prisma.users.findFirst({
            where: { rowId: findRow.id },
            orderBy: {position: 'asc'}
        })
        if(!findUser) return {success:false, error:{message: "Fila vazia!"}}

        if(findUser.position === null) return {success:false, error:{message: "Posição do Usuario não encontrada!"}}

        if (findUser.rowStatus === "InServiced") return {success: false, error:{message:"Serviço já iniciado"}}

        const dataCallUser = {
            rowStatus: "InServiced" as RowPositionStatus
        }
        
        const CallNextUserRow = await prisma.users.update({where: {phone: findUser.phone}, data: dataCallUser})

        return {successs: true, user: CallNextUserRow}
    } catch (error) {
        console.error('Error:', error);
        return {success: false, error:{message: error}}
    }
}
