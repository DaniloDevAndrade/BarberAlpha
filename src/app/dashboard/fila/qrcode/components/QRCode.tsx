'use client'
import { useCallback, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { requestQRCode } from '../api/requestID'

interface UserTableProps {
  emailBusiness: string,
}


export default function QRCodeFunction({emailBusiness}: UserTableProps){
    const [businessId, setBusinessId] = useState<string>()

    const fetchBusinessId = useCallback(async () =>{
        const response = await requestQRCode(emailBusiness)
        setBusinessId(response.businessId)
    }, [emailBusiness])

    useEffect(() =>{
        fetchBusinessId()
    }, [fetchBusinessId])

    const link = `https://barberalpha.com/row?businessId=${businessId}`
    return(
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl mb-1 font-extrabold tracking-tight'>QRCode</h1>
            <h1 className='mb-5'>Esse QRCode é para clientes entrar sua fila!</h1>
            <QRCode value={link} />
        </div>
    )
}