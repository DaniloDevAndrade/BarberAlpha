"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type ButtonReflashProps = {
  onRefresh: () => void;
};

export default function ButtonReflash({ onRefresh }: ButtonReflashProps) {
  const handleSubmitCreateRow = async () => {
    try {
      onRefresh();
      toast({
        title: "Fila Atualizada!",
        description: `Atualização da sua fila foi um sucesso!`,
      })
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ops.. algo aconteceu!",
        description: `Ocorreu algum erro na atualização da sua fila!`,
      })
    }
  };

  return (
    <Button className='ml-5' onClick={handleSubmitCreateRow}>Atualizar</Button>
  );
}
