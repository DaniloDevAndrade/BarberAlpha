"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { requestButtonFinally } from "../../../api/requestButtonFinally";

type BodyProp = {
    emailBusiness: string;
}

const formSchema = z.object({
    value: z.string().min(3, { message: 'O valor não pode ser vazio!' }),
  });

export default function FormFinallyUser({emailBusiness}: BodyProp){
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          value: '',
        },
      })

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
          try {
              const formattedValues = {...values, value: formatMoney(values.value).replace(/^R\$\s?/g, '')}
              const body = {
                hairValue: formattedValues.value,
                emailBusiness: emailBusiness as string
              }

              console.log(body)

              const result = await requestButtonFinally(body)

              console.log(result)

              if(result.error){
                console.log(result.error.message)
                return setSubmissionStatus('error')
              }

              setSubmissionStatus('success')
              setTimeout(() =>{
                window.location.reload()
              }, 1000)
          } catch (error) {
              setSubmissionStatus('error')
              console.log(error)
          }
          
        }

        function formatMoney(value: string) {
          const numbers = value.replace(/\D/g, '')
          if (numbers.length === 0) return 'R$0,00';
          const numericValue = parseFloat(numbers) / 100;
          return `R$${numericValue.toFixed(2).replace('.', ',')}`;
        }

  
    return(
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="R$35,00"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatMoney(e.target.value)
                          field.onChange(formatted)
                        }}
                        maxLength={14}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Finalizar Corte</Button>
            </form>
            {submissionStatus === 'success' && (
              <p className="mt-4 text-green-600">Corte finalizado com sucesso!</p>
            )}
            {submissionStatus === 'error' && (
              <p className="mt-4 text-red-600">Erro ao finalizar corte. Tente novamente.</p>
            )}
          </Form>
        </>
    )
}