'use client'

import { Button } from "@/components/ui/button"
import { Vibrate } from "lucide-react";
import requestSendMessage from "../../api/requestSendMessage";
import { Users } from "@prisma/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

type BodyProp = {
    user: Users;
    emailBusiness: string
    onRefresh: () => void;
}

export default function ButtonSendMessage({onRefresh, user, emailBusiness}: BodyProp){
    const [lastRequest, setLastRequest] = useState<number>(0);
        
    const handleSubmitCreateRow = async () => {
        const currentTime = Date.now();
        
        if (currentTime - lastRequest >= 3 * 60 * 1000) {
            try {
                await requestSendMessage(user, emailBusiness);
                onRefresh();
                setLastRequest(currentTime);
                toast({
                    title: "Mensagem de chamada enviada!",
                    description: `Mensagem para ${user.name} Enviada com sucesso!`,
                  })
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            toast({
                title: "Ei Aguarde!",
                description: "Aguarde 3 minutos antes de enviar outra mensagem.",
              })
        }
    }
    return(
        <Button onClick={handleSubmitCreateRow}><Vibrate />Chamar</Button>
    )
}