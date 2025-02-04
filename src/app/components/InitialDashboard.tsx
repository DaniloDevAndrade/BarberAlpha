import { MoveUpLeft } from "lucide-react";

export default function InitialDashboard() {
  return (
    <>
    <div className="flex flex-row items-center md:hidden">
        <MoveUpLeft className="ml-6 size-16"></MoveUpLeft>
        <h1 className="ml-2 lg:text-2xl">Começe aqui!</h1>
    </div>
    <div className="flex flex-col justify-center min-h-80 items-center mt-4">
        <h1 className="text-ml font-bold md:text-2xl lg:text-4xl">BEM VINDO AO SEU DASHBOARD</h1>
        <h1 className="m-3 md:text-xl lg:text-2xl">A Barber Alpha fica orgulhosa de ver que você escolheu revolucionar sua barbearia!</h1>
    </div>
    </>
  )
}

