'use client'

import { Button } from "@/components/ui/button"
import { Vibrate } from "lucide-react";

type BodyProp = {
    userPhone: string;
    onRefresh: () => void;
}

export default function ButtonSendMessage({onRefresh, userPhone}: BodyProp){
        
    const handleSubmitCreateRow = async () => {
        try {
            console.log(userPhone)
            onRefresh()
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return(
        <Button onClick={handleSubmitCreateRow}><Vibrate />Chamar</Button>
    )
}