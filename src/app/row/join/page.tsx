'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Cookies from 'js-cookie'
import { requestRemoveRow, requestRow } from '../api/requestRow'
import StarryBackground from '@/app/components/StarryBackgroud'
import Header from '@/app/components/Header'

export default function QueuePositionDisplay() {
  const [position, setPosition] = useState<number | null>(null)
  const [phoneUser, setPhoneUser] = useState<string | null>(null)

  const fetchQueuePosition  = async () =>{
    const token = Cookies.get('auth_token_user')

    if (!token) {
      console.log('Nenhum token encontrado. Usuário não autenticado.');
      setPosition(null)
      return;
    }

    try {
      const res = await requestRow(token)

      if (!res.success) {
        throw new Error(`Erro: ${res.error?.message}`);
      }
      const phone = await res.user?.phone as string
      const position = await res.user?.position as number
      setPhoneUser(phone)
      setPosition(position)
    } catch (error) {
      console.error('Erro ao buscar posição na fila:', error);
    }
  }

  useEffect(() => {
    fetchQueuePosition()

    const interval = setInterval(() =>{
      fetchQueuePosition()
    }, 15000)

    return () => clearInterval(interval);
  }, []);

  const handlerButtonSubmit = async () => {
    if(!phoneUser) return  console.log('Telefone do usuario não identificado!')

    await requestRemoveRow(phoneUser as string);
    setTimeout(() =>{
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <StarryBackground />
      <Header></Header>
      <div className="text-center flex flex-col items-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8">Mostrador de Posição na Fila</h1>
        
        <div className="relative w-64 h-64 rounded-full bg-white shadow-lg flex items-center justify-center mb-8">
          {position !== null ? (
            <div className="text-6xl font-bold text-blue-600">{position}</div>
          ) : (
            <div className="text-xl font-medium text-gray-500 px-4 text-center">
              Você não está em uma Fila
            </div>
          )}
        </div>
        {position === null ? <h1 className='hidden'></h1> : <Button onClick={handlerButtonSubmit}className="w-full max-w-xs">Sair da Fila</Button>}
      </div>
    </div>
  )
}


