"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import requestAddUser from "../../../api/requestAddUser";
import { toast } from "@/hooks/use-toast";

type BodyProp = {
    emailBusiness: string;
}

const formSchema = z.object({
    name: z.string().min(3, { message: 'Nome completo deve ter pelo menos 3 caracteres' }),
    phone: z.string().refine(
      (value) => /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(value),
      { message: 'Número de telefone inválido. Use o formato (DD)XXXXX-XXXX' }
    ),
    email: z.string().email({ message: 'E-mail inválido' }),
  });

export default function FormAddUser({emailBusiness}: BodyProp){
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
              const formattedValues = {...values, phone: formatPhoneNumber(values.phone).replace(/\D/g, '')}
              const body = {
                userEmail: formattedValues.email,
                userName: formattedValues.name,
                userPhone: formattedValues.phone,
                emailBusiness: emailBusiness as string
              }

              const result = await requestAddUser(body)

              if(result.error){
                console.log(result.error.message)
                toast({
                  title: "Ops algum erro ocorreu!",
                  description: `Motivo: ${result.error.message}!`,
                })
                return setSubmissionStatus('error')
              }

              setSubmissionStatus('success')
              toast({
                title: "Usuario Adicionado com sucesso!",
                description: `${result.User?.name} Foi adicionado a fila com sucesso!`,
              })
              setTimeout(() =>{
                window.location.reload()
              }, 2000)
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

  
    return(
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
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
                    <FormLabel>Telefone</FormLabel>
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="joao@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Entrar na Fila</Button>
            </form>
            {submissionStatus === 'success' && (
              <p className="mt-4 text-green-600">Registro na fila realizado com sucesso!</p>
            )}
            {submissionStatus === 'error' && (
              <p className="mt-4 text-red-600">Erro ao entrar na fila. Tente novamente.</p>
            )}
          </Form>
        </>
    )
}