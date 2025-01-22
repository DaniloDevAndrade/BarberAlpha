'use client'

import { Button } from "@/components/ui/button"
import NextUserRow from "../../api/requestButtonNextUser";

type BodyProp = {
    emailBusiness: string;
}

export default function ButtonNextUser({emailBusiness}: BodyProp){
        
    const handleSubmitCreateRow = async () => {
        try {
            await NextUserRow(emailBusiness);
            window.location.reload()
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return(
        <Button onClick={handleSubmitCreateRow}>Proximo da Fila</Button>
    )
}