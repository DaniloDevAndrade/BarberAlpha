'use client'

import { Button } from "@/components/ui/button"
import ServiceStartedRow from "../../api/requestButtonServiceStarted";
import { toast } from "@/hooks/use-toast";

type BodyProp = {
    onRefresh: () => void;
    emailBusiness: string;
}

export default function ButtonServiceStarted({onRefresh, emailBusiness}: BodyProp){
        
    const handleSubmitCreateRow = async () => {
        try {
            const res = await ServiceStartedRow(emailBusiness);
            if(res.success === true){
                toast({
                    title: "Atendimento Iniciado!",
                    description: `O Atendimento de ${res.user?.name} foi iniciado com sucesso!`,
                })
            } else {
                toast({
                    title: "Ops algo aconteceu!",
                    description: `Motivo: ${res.error?.message}!`,
                })
            }

            onRefresh()
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Ops algo aconteceu!",
                description: `Ocorreu algum erro ocorreu!`,
              })
        }
    }
    return(
        <Button onClick={handleSubmitCreateRow}>Iniciar Atendimento</Button>
    )
}