'use client'

import { Button } from "@/components/ui/button"
import ServiceStartedRow from "../../api/requestButtonServiceStarted";

type BodyProp = {
    onRefresh: () => void;
    emailBusiness: string;
}

export default function ButtonServiceStarted({onRefresh, emailBusiness}: BodyProp){
        
    const handleSubmitCreateRow = async () => {
        try {
            await ServiceStartedRow(emailBusiness);
            onRefresh()
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return(
        <Button onClick={handleSubmitCreateRow}>Iniciar Atendimento</Button>
    )
}