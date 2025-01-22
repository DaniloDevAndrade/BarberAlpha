"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { requestCreateRow, requestOneRow } from '../../api/requestCreateRow';

type BodyProp = {
    emailBusiness?: string;
}

export default function ButtonRow({emailBusiness}: BodyProp) {
    const [status, setStatus] = useState<string | null>(null)

    useEffect(() =>{
      async function FecthRow() {
        const result = await requestOneRow(emailBusiness as string)
        if ('status' in result) {
          setStatus(result.status);
        } else {
          console.log(result.error.message)
        }
      }
      FecthRow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleSubmitCreateRow = async () => {
      try {
        const result = await requestCreateRow(emailBusiness as string);
        setStatus(result.Row?.status as string)
        console.log(result)
      } catch (error) {
          console.error('Error:', error);
      }
    }

    const buttonText = status === "Active" ? "Desativar Fila" : "Ativar Fila";
    const buttonColor = status === "Active" ? "destructive" : "default";

  return (
    <Button variant={buttonColor} onClick={handleSubmitCreateRow}>
      {buttonText}
    </Button>
  );
}
