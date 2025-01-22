'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { requestJoinRow } from '../api/requestJoinRow'

const formSchema = z.object({
    name: z.string().min(3, { message: 'Nome completo deve ter pelo menos 3 caracteres' }),
    phone: z.string().refine(
      (value) => /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(value),
      { message: 'Número de telefone inválido. Use o formato (DD)XXXXX-XXXX' }
    ),
    email: z.string().email({ message: 'E-mail inválido' }),
  });

export function QueueRegistrationForm() {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'| 'errorRow'>('idle')

  const searchParams = useSearchParams()
  const businessId = searchParams.get('businessId')

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        if(!businessId) {
            console.log('Error BusinessId não encontrado em query params')
            return setSubmissionStatus('error')
        }
        const formattedValues = {...values, phone: formatPhoneNumber(values.phone).replace(/\D/g, '')}
        const response = await requestJoinRow(businessId, formattedValues)

        if(response.rowClosed === true){
            return setSubmissionStatus('errorRow')
        }

        if(!response.token) return console.log('Token não retornado')

        Cookies.set('auth_token_user', response.token, {expires: 1})
        setSubmissionStatus('success')
        router.push('/row/join')
    } catch (error) {
        setSubmissionStatus('error')
        console.log(error)
    }
    
  }

  function formatPhoneNumber(value: string) {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return `(${numbers}`
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)})${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)})${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  return (
    <div className='flex flex-col'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="João da Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(11)99999-9999"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value)
                    field.onChange(formatted)
                  }}
                  maxLength={14}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">E-mail</FormLabel>
              <FormControl>
                <Input type='email' placeholder="joao@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='justify-center' type="submit">Entrar na Fila</Button>
      </form>
      {submissionStatus === 'success' && (
        <p className="mt-4 text-green-600">Registro na fila realizado com sucesso!</p>
      )}
      {submissionStatus === 'error' && (
        <p className="mt-4 text-red-600">Erro ao entrar na fila. Tente novamente.</p>
      )}
      {submissionStatus === 'errorRow' && (
        <p className="mt-4 text-red-600">A fila está fechada pela barbearia. Tente mais tarde.</p>
      )}
    </Form>
    </div>
  )
}

