'use server'

import { prisma } from "@/database/database"
import { BusinessSchemaLogin } from "@/schemas/BusinessAuthSchema"
import { Prisma } from "@prisma/client"
import { compareSync } from "bcrypt-ts"

type BusinessLogin = {
    name: string
    email: string
}

export async function RequestLogin(credentials: Partial<Record<'email' | 'password', unknown>>): Promise<BusinessLogin | null>{
    const {email, password} = BusinessSchemaLogin.parse(credentials)

    const where: Prisma.BusinessWhereInput = {}

    if(email) where.email = {contains: email, mode: 'insensitive'}

    const FindBusiness = await prisma.business.findFirst({where})
    if(!FindBusiness) return null

    const ComparePassword = compareSync(password, FindBusiness.password)
    if(!ComparePassword) return null

    const user = {email: FindBusiness.email, name: FindBusiness.nameBarber}
    return user
}