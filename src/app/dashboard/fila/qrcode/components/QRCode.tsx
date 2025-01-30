'use client'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { requestQRCode } from '../api/requestID'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loading from '@/app/components/Loading'

interface UserTableProps {
  emailBusiness: string,
}


export default function QRCodeFunction({emailBusiness}: UserTableProps){
    const [link, setLink] = useState<string>('')
    const [buttonCopy, setButtonCopy] = useState<string>('Copiar!')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        async function fetchBusiness() {
            const response = await requestQRCode(emailBusiness)
            setLink(`https://barberalpha.com/row?businessId=${response.businessId}`)
            setIsLoading(false)
        }
        fetchBusiness()
    }, [emailBusiness])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link)
            setButtonCopy('Copiado!')

            setTimeout(() =>{
                setButtonCopy('Copiar!')
            }, 5000)
        } catch (err) {
            console.error('Falha ao copiar: ', err)
        }
    }

    if (isLoading) {
        return (<Loading />);
      }

    return(
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl mb-1 font-extrabold tracking-tight'>QRCode</h1>
            <h1 className='mb-5'>Esse QRCode é para clientes entrar sua fila!</h1>
            <QRCode value={link} />
            <div className='mt-5 flex'>
                <Input className='' value={link} readOnly/>
                <Button className='ml-3' onClick={handleCopy}>{buttonCopy}</Button>
            </div>
        </div>
    )
}