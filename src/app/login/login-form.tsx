"use client"
// import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginAction from "./api/loginAction";
import Link from "next/link";
import LoadingConfirmation from "../components/ButtonLoading";

const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido. Use o formato email@email.com' }),
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
});

export default function LoginForm(){
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
              email: '',
              password: '',
            },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const formattedValues = {...values}
        setLoading(true)
          const body = {
            email: formattedValues.email as string,
            password: formattedValues.password as string
          }
          const response = await loginAction(body)

          if(response?.success === false){
            setErrorMessage(response.message)
            setLoading(false)
            return setSubmissionStatus('error')
          }
          setIsLoading(false)
          } catch (error) {
                setSubmissionStatus('error')
                setLoading(false)
                console.log(error)
          }
            
    }


    return(
      <div className="flex flex-col">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
        <FormField 
          control={form.control} 
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Email</FormLabel>
              <FormControl>
                <Input placeholder='joão@exemplo.com' {... field}/>
              </FormControl>
            </FormItem>
          )} />
          <FormField 
          control={form.control} 
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Senha</FormLabel>
              <FormControl>
                <Input placeholder='Digite sua senha' type="password" {... field}/>
              </FormControl>
            </FormItem>
          )} />
          {!loading ? (<Button className="justify-center mt-5 bg-indigo-600 text-white hover:bg-indigo-700" type="submit">Entrar</Button>): 
          (<LoadingConfirmation isLoading={isLoading}></LoadingConfirmation>)}
        
      </form>
      
      <div className="mt-5 flex flex-col items-center">
        {submissionStatus === 'error' && (
          <p className=" text-red-600">{errorMessage}</p>
        )}
        <Link className='mt-2 hover:underline' href="/#features">
            <h1>Esqueceu a senha?</h1>
        </Link>
        <h1 className="mt-5">Novo por aqui?</h1>
        <Link className='hover:underline hover:text-indigo-700' href="/#features">
            <h1 className="font-bold text-indigo-600">Conheça nossos planos!</h1>
        </Link>
      </div>
      
      </Form>

      </div>
    )
}