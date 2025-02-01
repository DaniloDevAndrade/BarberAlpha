'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardBillingPRO(){
    return(
        <>
        <Card>
            <CardHeader className="borber-b border-border">
                <CardTitle className="text-lg">Plano PRO</CardTitle>
                <CardTitle>Você está atualmente no <span className="bg-red-600 uppercase">PRO</span>.</CardTitle>
            </CardHeader>
            <CardContent>
                <span>Parabens no plano PRO você poderá desfrutar de todas nossas funções ilimitado!</span>
            </CardContent>
        </Card>
        </>
    )
}