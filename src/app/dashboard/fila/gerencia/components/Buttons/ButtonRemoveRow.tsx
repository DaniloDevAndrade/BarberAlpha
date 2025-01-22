'use client'

import { Button } from "@/components/ui/button"
import removeUsersRow from "../../api/requestButtonRemoveRow";

type BodyProp = {
    emailBusiness: string;
    userEmail: string;
    onRefresh: () => void;
}

export default function ButtonRemoveRow({onRefresh, emailBusiness, userEmail}: BodyProp){

    const body = {
        emailBusiness: emailBusiness as string,
        userEmail: userEmail as string
    }
        
    const handleSubmitCreateRow = async () => {
        try {
            const result = await removeUsersRow(body);
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