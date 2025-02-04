'use client'

import { Button } from "@/components/ui/button"
import removeUsersRow from "../../api/requestButtonRemoveRow";
import { UserRoundX } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Users } from "@prisma/client";

type BodyProp = {
    emailBusiness: string;
    user: Users;
    onRefresh: () => void;
}

export default function ButtonRemoveRow({onRefresh, emailBusiness, user}: BodyProp){

    const body = {
        emailBusiness: emailBusiness as string,
        userEmail: user.email as string
    }
        
    const handleSubmitCreateRow = async () => {
        try {
            const result = await removeUsersRow(body);
            onRefresh()
            if(result.success === true) {
                toast({
                    title: "Usuario removido com sucesso!",
                    description: `${user.name} foi removido da fila com sucesso!`,
                  })
            } else {
                toast({
                    title: "Ops algum erro ocorreu!",
                    description: `Motivo: ${result.error?.message}`,
                  })
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return(
        <Button className='' variant="destructive" onClick={handleSubmitCreateRow}><UserRoundX></UserRoundX>Remover</Button>
    )
}