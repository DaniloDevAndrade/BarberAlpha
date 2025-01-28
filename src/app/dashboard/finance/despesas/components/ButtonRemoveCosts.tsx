'use client'

import { Button } from "@/components/ui/button"
import removeCost from "../api/requestButtonRemoveCost";

type BodyProp = {
    emailBusiness: string;
    costsId: string;
    onRefresh: () => void;
}

export default function ButtonRemoveCosts({onRefresh, emailBusiness, costsId}: BodyProp){

    const body = {
        emailBusiness: emailBusiness as string,
        costsId: costsId as string
    }
        
    const handleSubmitCreateRow = async () => {
        try {
            const result = await removeCost(body);
            onRefresh()
            console.log(result)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return(
        <Button className='' variant="destructive" onClick={handleSubmitCreateRow}>Remover</Button>
    )
}