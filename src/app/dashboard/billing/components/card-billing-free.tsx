'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requestCreateSubscribeSession } from "../api/requestStripe";
import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import Loading from "@/app/components/Loading";
import { planDays } from "../api/planDays";

type ClientProps = {
    emailBusiness: string;
    name?: string
    plan: string
  }

type resDays = {
    days?: {
        daysOff: number 
        percent: number
        currentDay:number
    }
    success?: boolean
    error?: {
        message: string
    }
}


export default function CardBillingFree({emailBusiness, plan}: ClientProps){
    const [days, setDays] = useState<resDays>()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    const comments = [
        {
            id: 1,
            name: "Lucas Mendes",
            barbershop: "Barbearia Alpha",
            comment: "O Barber Alpha transformou a forma como gerencio minha barbearia! As filas online são uma mão na roda!",
        },
        {
            id: 2,
            name: "Camila Rocha",
            barbershop: "Estilo Moderno",
            comment: "A gestão de clientes ficou muito mais fácil com o Barber Alpha. Recomendo para todos os barbeiros!",
        },
        {
            id: 3,
            name: "Fernando Lima",
            barbershop: "Corte Perfeito",
            comment: "Adorei o painel financeiro! Com o Barber Alpha, consigo acompanhar tudo em tempo real.",
        },
        {
            id: 4,
            name: "Tatiane Nascimento",
            barbershop: "Barbearia Trend",
            comment: "Cliente satisfeito é sinônimo de sucesso! O sistema ajudou a melhorar a experiência na minha barbearia.",
        },
        {
            id: 5,
            name: "Ricardo Santos",
            barbershop: "A Arte do Corte",
            comment: "Minhas vendas aumentaram com o uso do Barber Alpha! O sistema facilita até o upselling.",
        },
        {
            id: 6,
            name: "Juliana Almeida",
            barbershop: "Barbearia Viva",
            comment: "O melhor sistema que já usei! As filas online ajudaram a reduzir o tempo de espera e a fidelizar clientes.",
        },
    ];
    

    const handleSubmitCreateRow = async () => {
          try {
            requestCreateSubscribeSession(emailBusiness)
          } catch (error) {
              console.error('Error:', error);
          }
        }

    useEffect(() => {
        async function requestPlanEffect() {
            const res = await planDays(emailBusiness)
            setDays(res as resDays)
            setIsLoading(false)
        }
        requestPlanEffect()
        
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (comments.length - 2))
          }, 5000) // Change comments every 5 seconds
        return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailBusiness])

    if (isLoading) {
        return (<Loading />);
    }

    return(
        <>
        <Card>
            <CardHeader className="borber-b border-border">
                <CardTitle>Plano Gratis</CardTitle>
                <CardTitle>Você está atualmente no <span className="bg-green-700 uppercase">{plan}</span>. E faltam {days?.days?.daysOff} Dias para acabar!</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <header className="flex item-center justify-between">
                        <span>{Math.min(7, days?.days?.currentDay as number)}/7</span>
                        <span>{days?.days?.percent}%</span>
                    </header>
                </div>
                <Progress value={days?.days?.percent}></Progress>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-border">
                <span className="mt-5">Assine o PRO e use avontade!</span>
                <Button onClick={handleSubmitCreateRow} className="mt-5">Assinar o PRO</Button>
            </CardFooter>
        </Card>
        <div className="mt-2">
        <Card>
            <CardHeader className="border-b border-border">
                <CardTitle>Aproveite o PRO</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li className="mt-2"><span className="font-bold">Gerenciamento de Filas Online:</span> Agende horários de forma conveniente e evite filas longas.</li>
                    <li className="mt-2"><span className="font-bold">Aumento da Satisfação do Cliente:</span> Melhoria na experiência do cliente com agendamentos fáceis.</li>
                    <li className="mt-2"><span className="font-bold">Painel Financeiro Integrado:</span> Acompanhe receitas, despesas e lucros em tempo real.</li>
                    <li className="mt-2"><span className="font-bold">Análises e Relatórios:</span> Relatórios detalhados sobre desempenho e tendências.</li>
                    <li className="mt-2"><span className="font-bold">Gestão de Clientes:</span> Armazene informações e personaliza o atendimento.</li>
                    <li className="mt-2"><span className="font-bold">Redução de Cancelamentos e Faltas:</span> Lembretes automáticos diminuem a taxa de não comparecimento.</li>
                    <li className="mt-2"><span className="font-bold">Facilidade de Cadastro e Pagamento:</span> Processos de cadastro e pagamento seguros e eficientes.</li>
                </ul>
            </CardContent>
            <CardFooter className="flex items-center justify-center border-t border-border">
                <Button onClick={handleSubmitCreateRow} className="mt-5 text-xl">Assinar o PRO por R$99,90</Button>
            </CardFooter>
        </Card>
        </div>
        <div className="w-full max-w-4xl mx-auto p-4">
            <Card className="bg-gradient-to-br">
                <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Comentários</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    
                    {comments.slice(currentIndex, currentIndex + 3).map((comment) => (
                    <div
                        key={comment.id}
                        className="p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md border border-border"
                    >
                        <div className="flex items-center mb-2">
                        <User className="w-6 h-6 mr-2" />
                        <div>
                            <p className="font-semibold ">{comment.name}</p>
                            <p className="text-sm">{comment.barbershop}</p>
                        </div>
                        </div>
                        <p className="">{comment.comment}</p>
                        <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                        ))}
                    </div>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
            </div>
        </>
    )
}