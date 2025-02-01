'use server'
import { prisma } from "@/database/database"
import { BusinessSchemaRegister } from "@/schemas/BusinessAuthSchema"
import { createStripeCustomer } from "@/services/stripe"
import { Prisma } from "@prisma/client"
import { hashSync } from 'bcrypt-ts'

type body = {
    name: string
    email: string
    password: string
    phone: string
    cpf: string
    nameBarber: string
    cep: string
    street: string
    numberAddress: string
    city: string
    uf: string
    neighborhood: string
}
type returnRequest = {
    created?: boolean
    errorEmail?: boolean
    error?: {
        message: string
    }
    registerNewBusiness?: object
}

export async function requestRegister(body: body): Promise<returnRequest>{
    try {
        const BusinessBody = BusinessSchemaRegister.parse(body)
        BusinessBody.password = hashSync(body.password, 10)

        const where: Prisma.BusinessWhereInput = {}
        if(body.email) where.email = {contains: body.email, mode: 'insensitive'}

        const FindBusiness = await prisma.business.findFirst({where})
        if(FindBusiness) return {errorEmail: true, error:{message: "Email já cadastrado!"}}

        const CreatedBusiness = await prisma.business.create({
             data: BusinessBody
        })

        await createStripeCustomer({
            name: CreatedBusiness.name,
            email: CreatedBusiness.email
        })

        return {created: true}
    } catch (err) {
        return {created: false, error:{message: err as string}}
    }
}