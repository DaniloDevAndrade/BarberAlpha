"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { themeFormSchema } from "./schemas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ThemeForm() {
  const { theme, setTheme } = useTheme();
  const form = useForm<z.infer<typeof themeFormSchema>>({
    resolver: zodResolver(themeFormSchema),
    defaultValues: {
      theme: theme ?? "light",
    },
  });
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      form.setValue("theme", theme);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, mounted]);

  const onSubmit = form.handleSubmit(async (data) => {
    setTheme(data.theme as "light" | "dark");
    toast({
      title: "Sucesso:",
      description: "Suas Alterações foram salvas com sucesso!",
    });
  });

  if (!mounted) return null;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-9">
        <Card className="flex flex-col items-center flex-wrap">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-3xl">Temas</CardTitle>
            <CardDescription>Selecione o tema de preferência para seu dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1 max-w-md">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2"
                  >
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary text-lg">
                        <FormControl>
                          <RadioGroupItem value="light" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                              <div className="h-2 w-[120px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[120px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[120px] rounded-lg bg-[#ecedef]" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row w-full p-2 justify-center">
                          <Sun />
                          <span className="ml-2 font-normal">Claro</span>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary text-lg">
                        <FormControl>
                          <RadioGroupItem value="dark" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                          <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                              <div className="h-2 w-[120px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[120px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[120px] rounded-lg bg-slate-400" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row w-full p-2 justify-center">
                          <Moon />
                          <span className="ml-2 font-normal">Escuro</span>
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" className="mr-3 text-lg">Salvar Alterações</Button>
        </div>
      </form>
    </Form>
  );
}
