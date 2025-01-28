import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function CardBilling(){
    return(
        <Card>
            <CardHeader className="borber-b border-border">
                <CardTitle>Plano Gratis</CardTitle>
                <CardTitle>Você está atualmente no plano GRÁTIS. E faltam [X DIAS] para acabar!</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <header className="flex item-center justify-between">
                        <span>1/7</span>
                        <span>20%</span>
                    </header>
                </div>
                <Progress value={20}></Progress>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-border">
                <span className="mt-5">Assine o PRO e use avontade!</span>
                <Button className="mt-5">Assinar o PRO</Button>
            </CardFooter>
        </Card>
    )
}