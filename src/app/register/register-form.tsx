"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { requestRegister } from "./api/requestRegister";

const formSchema = z.object({
    name: z.string().min(3, { message: 'Nome completo deve ter pelo menos 3 caracteres' }),
    phone: z.string().refine(
      (value) => /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(value),
      { message: 'Número de telefone inválido. Use o formato (DD)XXXXX-XXXX' }
    ),
    email: z.string().email({ message: 'E-mail inválido. Use o formato email@email.com' }),
    cpf: z.string().refine(
      (value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value),
      { message: 'Número de CPF inválido. Use o formato XXX.XXX.XXX-XXX' }
    ),
    cep: z.string().refine(
      (value) => /^\d{5}-?\d{3}$/.test(value),
  { message: 'Número de CEP inválido. Use o formato XXXXX-XXX' }
    ),
    street: z.string().min(1, { message: 'Logradouro é obrigatório' }),
    nameBarber: z.string().min(3, { message: 'Nome da barbearia deve ter pelo menos 3 caracteres' }),
    numberAddress: z.string().min(1, { message: 'Número é obrigatório' }),
    city: z.string().min(1, { message: 'Cidade é obrigatória' }),
    uf: z.string().length(2, { message: 'UF deve ter exatamente 2 caracteres' }),
    neighborhood: z.string().min(1, { message: 'Bairro é obrigatório' }),
    password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z.string().min(6, { message: 'Confirmação de senha deve ter pelo menos 6 caracteres' }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export default function RegisterForm(){
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error' | 'errorEmail'>('idle')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: '',
          phone: '',
          email: '',
          cpf: '',
          cep: '',
          street: '',
          numberAddress: '',
          city: '',
          uf: '',
          neighborhood: '',
          password: '',
          confirmPassword: '',
          nameBarber: '',
        },
      })

      function formatPhoneNumber(value: string) {
        const numbers = value.replace(/\D/g, '')
        if (numbers.length <= 2) return `(${numbers}`
        if (numbers.length <= 7) return `(${numbers.slice(0, 2)})${numbers.slice(2)}`
        return `(${numbers.slice(0, 2)})${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
      }

      function formatCPFNumber(value: string) {
        const numbers = value.replace(/\D/g, '')
        if (numbers.length <= 3) return `${numbers}`
        if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
        if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
        return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
      }
      function formatCEPNumber(value: string) {
        const numbers = value.replace(/\D/g, '')
        if (numbers.length <= 5) return `${numbers}`
        if (numbers.length <= 6) return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
        return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
      }

      const cepRequest = async (cep: string) =>{
        try {
          const formattedCEP = cep.replace(/\D/g, '');
          const response = await fetch(`https://viacep.com.br/ws/${formattedCEP}/json/`)
          const data = await response.json()

          if (data.erro) {
            console.log('CEP não encontrado');
            setSubmissionStatus('error');
            return null; 
        }

          return data
        } catch (error) {
          setSubmissionStatus('error')
          console.log(error)
        }
      }

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const formattedValues = {...values, phone: formatPhoneNumber(values.phone).replace(/\D/g, '')}

            const body = {
              name: formattedValues.name,
              email: formattedValues.email,
              password: formattedValues.confirmPassword,
              phone: formattedValues.phone,
              cpf: formattedValues.cpf,
              nameBarber: formattedValues.nameBarber,
              cep: formattedValues.cep,
              street: formattedValues.street,
              numberAddress: formattedValues.numberAddress,
              city: formattedValues.city,
              uf: formattedValues.uf,
              neighborhood: formattedValues.neighborhood,
          }

          console.log(body)

          const response = await requestRegister(body)

          if(response.created === false) {
            throw new Error(response.error?.message)
          }

          if(response.errorEmail === true) {
            return setSubmissionStatus('errorEmail')
          }

            //router.push('/login')
            setSubmissionStatus('success')
        } catch (error) {
            setSubmissionStatus('error')
            console.log(error)
        }
        
      }
      
    return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
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
                <Input placeholder="joao@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="111.111.111-11"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatCPFNumber(e.target.value)
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
          name="nameBarber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Nome da Barbearia</FormLabel>
              <FormControl>
                <Input placeholder="Barbaria Exemplo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="11111-111"
                  {...field}
                  onChange={async (e) => {
                    const formatted = formatCEPNumber(e.target.value)
                    field.onChange(formatted)

                    if (formatted.length === 9) {
                      const cepData = await cepRequest(formatted)

                      if(cepData){
                        form.setValue('street', cepData.logradouro);
                        form.setValue('neighborhood', cepData.bairro);
                        form.setValue('city', cepData.localidade);
                        form.setValue('uf', cepData.uf);
                      }
                    }
                    
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
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Rua</FormLabel>
              <FormControl>
                <Input placeholder="Rua Exemplo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Numero</FormLabel>
              <FormControl>
                <Input placeholder="296" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Alphaville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Barueri" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Estado</FormLabel>
              <FormControl>
                <Input placeholder="São Paulo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-xl">Senha</FormLabel>
                  <FormControl>
                      <Input
                          type="password"
                          placeholder="Digite sua senha"
                          {...field}
                      />
                  </FormControl>
                  <FormMessage />
              </FormItem>
          )}
      />

      <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-xl">Confirme sua Senha</FormLabel>
                  <FormControl>
                      <Input
                          type="password"
                          placeholder="Confirme sua senha"
                          {...field}
                      />
                  </FormControl>
                  <FormMessage />
              </FormItem>
          )}
      />

        <Button type="submit">Registrar Barbearia</Button>
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