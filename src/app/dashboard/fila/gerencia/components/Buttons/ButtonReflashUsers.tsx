"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

type ButtonReflashProps = {
  onRefresh: () => void;
};

export default function ButtonReflash({ onRefresh }: ButtonReflashProps) {
  const handleSubmitCreateRow = async () => {
    try {
      onRefresh();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button className='ml-5' onClick={handleSubmitCreateRow}>Atualizar</Button>
  );
}
