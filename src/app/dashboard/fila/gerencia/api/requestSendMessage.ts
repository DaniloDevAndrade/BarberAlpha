'use server'

import { prisma } from "@/database/database"
import { Prisma, Users } from "@prisma/client"

export default async function requestSendMessage(user: Users, emailBusiness:string){
    const number = `55${user.phone}`
    const BASE_WHATS_URL = process.env.NEXT_PUBLIC_BASE_URL_WHATSAPP
    const WHATS_API_KEY = process.env.WHATSAPP_API_KEY
    const NAME_WHATSAPP = process.env.NEXT_PUBLIC_NAME_WHATSAPP

    try {
        const where: Prisma.BusinessWhereInput = {}
        if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
                
        const findBusiness = await prisma.business.findFirst({where})
        if(!findBusiness) return {success: false, error:{message: "Barbearia não encontrada, faça login!"}}

        const bodySend = {
                number: number,
                text: `Ei, *${user.name}* Sua vez chegou! 💈

👉 Sua cadeira está pronta e o barbeiro preparado  para transformar seu visual

Venha para *${findBusiness.nameBarber}* que estamos te aguardando! ✂️

⏰ Você tem *10 minutos* para chegar e ficar no estilo.

Endereço: *${findBusiness.street}, ${findBusiness.numberAddress} - ${findBusiness.neighborhood} - ${findBusiness.city}*.

*Equipe da ${findBusiness.nameBarber} 💈*`
}
        const res = await fetch(`${BASE_WHATS_URL}/message/sendText/${NAME_WHATSAPP}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': `${WHATS_API_KEY}`
            },
            body: JSON.stringify(bodySend)
        }).then(res => res.json())

        const updatedUser = await prisma.users.update({
            where: {phone: user.phone},
            data: {lastCall: new Date()}
        })

        return {success: true, res, updatedUser}
    } catch (error) {
        console.log(error)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {success: false, message: error.message}
    }
}