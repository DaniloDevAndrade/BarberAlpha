"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    phone: z.string().refine(
      (value) => /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(value),
      { message: 'Número de telefone inválido. Use o formato (DD)XXXXX-XXXX' }
    ),
    nameBarber: z.string().min(3, { message: 'Nome da barbearia deve ter pelo menos 3 caracteres' }),
  });

export default function AccountForm(){
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error' | 'errorEmail'>('idle')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          phone: '',
          nameBarber: '',
        },
      })

      function formatPhoneNumber(value: string) {
        const numbers = value.replace(/\D/g, '')
        if (numbers.length <= 2) return `(${numbers}`
        if (numbers.length <= 7) return `(${numbers.slice(0, 2)})${numbers.slice(2)}`
        return `(${numbers.slice(0, 2)})${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
      }

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const formattedValues = {...values, phone: formatPhoneNumber(values.phone).replace(/\D/g, '')}

            const body = {
              phone: formattedValues.phone,
              nameBarber: formattedValues.nameBarber,
          }

          console.log(body)

          // const response = await requestRegister(body)

          // if(response.created === false) {
          //   throw new Error(response.error?.message)
          // }

          // if(response.errorEmail === true) {
          //   return setSubmissionStatus('errorEmail')
          // }

            //router.push('/login')
            setSubmissionStatus('success')
        } catch (error) {
            setSubmissionStatus('error')
            console.log(error)
        }
        
      }
      
    return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
        <Card className="w-auto">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-3xl">Edite sua conta!</CardTitle>
            <CardDescription>Aqui você poderá editar os dados de sua conta!</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
            control={form.control}
            name="nameBarber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Nome da Barbearia</FormLabel>
                <FormControl>
                  <Input placeholder="Barbaria do Corte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mt-4">
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
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" className="mr-3 text-lg">Salvar Alterações</Button>
        </div>
      </form>
      {submissionStatus === 'success' && (
        <p className="mt-4 text-green-600">Barbearia registrada com sucesso!</p>
      )}
      {submissionStatus === 'error' && (
        <p className="mt-4 text-red-600">Erro ao registrar. Tente novamente.</p>
      )}
      {submissionStatus === 'errorEmail' && (
        <p className="mt-4 text-red-600">Email já registrado!</p>
      )}
    </Form>
    )
}