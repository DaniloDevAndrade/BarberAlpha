"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { postCustsAdd } from "../api/requestButtonAddCust"
import { categoryCosts, Costs } from "@prisma/client"
import { toast } from "@/hooks/use-toast"
import { paginateCosts } from "@/app/dashboard/clientes/todos/api/caculate"
import { useCallback, useEffect, useState } from "react"
import { getAllCosts } from "../api/requestGetAllCosts"
import ButtonRemoveCosts from "./ButtonRemoveCosts"

type BodyProp = {
  emailBusiness: string;
}

const formSchema = z.object({
  value: z.string().min(3, { message: 'O valor não pode ser vazio!' }),
  description: z.string().min(3, { message: 'O valor não pode ser vazio!' }),
  category: z.string().min(3, { message: 'O valor não pode ser vazio!' }),
  date: z.string().min(3, { message: 'O valor não pode ser vazio!' }),
});

export default function AdicionarDespesa({emailBusiness}: BodyProp) {
  const [costsInitials, setCostsInitials] = useState<Costs[]>([]);

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(costsInitials.length / pageSize)

  const costs = paginateCosts(costsInitials, currentPage, pageSize)

  const fetchCosts = useCallback(async () => {
      const response = await getAllCosts(emailBusiness);
      setCostsInitials(response.costs ?? []);
    }, [emailBusiness])

  useEffect(() =>{
    fetchCosts();
  }, [fetchCosts])

  const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            value: '',
            category: '',
            date: '',
            description: '',
          },
        })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedValues = {...values, value: formatMoney(values.value).replace(/^R\$\s?/g, '')}
      const body = {
        custValue: formattedValues.value,
        description: formattedValues.description,
        custsDate: new Date(`${formattedValues.date}T00:00:00`),
        category: formattedValues.category as categoryCosts,
      }
      await postCustsAdd(body, emailBusiness)
      toast({
        title: "Despesa adicionada",
        description: `${body.description} - R$ ${body.custValue}`,
      })
      fetchCosts()
    } catch (error) {
      console.log(error)
    }
    
  }

  function formatMoney(value: string) {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 0) return 'R$0,00';
    const numericValue = parseFloat(numbers) / 100;
    return `R$${numericValue.toFixed(2).replace('.', ',')}`;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Adicionar Despesa</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nova Despesa</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category">Categoria</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Aluguel">Aluguel</SelectItem>
                            <SelectItem value="Materiais">Materiais</SelectItem>
                            <SelectItem value="Salarios">Salários</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Luz">Luz</SelectItem>
                            <SelectItem value="Agua">Agua</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="date">Data</FormLabel>
                    <FormControl>
                      <Input id="date" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
              />
              <Button type="submit">Adicionar Despesa</Button>
            </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Despesas Recentes</CardTitle>
            <CardDescription>(Ultimos 30 Dias)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costs.map((cost: Costs) => (
                  <TableRow key={cost.id}>
                    <TableCell>{cost.description}</TableCell>
                    <TableCell>{cost.value}</TableCell>
                    <TableCell>{cost.category}</TableCell>
                    <TableCell>{new Date(cost.custsDate).toLocaleDateString()}</TableCell>
                    <TableCell><ButtonRemoveCosts onRefresh={fetchCosts} emailBusiness={emailBusiness} costsId={cost.id as string}/></TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <div className="text-sm text-muted-foreground">
                Pagina {currentPage} de {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Proxima
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

