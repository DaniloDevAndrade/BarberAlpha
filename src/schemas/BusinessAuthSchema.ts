import { z } from "zod";

export const BusinessSchemaRegister = z.object({
    name: z.string().min(3, { message: 'Nome completo deve ter pelo menos 3 caracteres' }).nonempty('Nome é obrigatório'),
    phone: z.string().nonempty('Telefone é obrigatório').min(11, { message: 'Precisa ter no minimo 11 caracteres' }),
    email: z.string().nonempty('Email é obrigatório').email({ message: 'E-mail inválido. Use o formato email@email.com' }),
    cpf: z.string().nonempty('CPF é obrigatório').refine(
      (value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value),
      { message: 'Número de CPF inválido. Use o formato XXX.XXX.XXX-XXX' }
    ),
    cep: z.string().nonempty('CEP é obrigatório').refine(
      (value) => /^\d{5}-?\d{3}$/.test(value),
  { message: 'Número de CEP inválido. Use o formato XXXXX-XXX' }
    ),
    street: z.string().min(1, { message: 'Rua é obrigatório' }),
    nameBarber: z.string().min(3, { message: 'Nome da barbearia deve ter pelo menos 3 caracteres' }),
    numberAddress: z.string().min(1, { message: 'Número do endereço é obrigatório' }),
    city: z.string().min(1, { message: 'Cidade é obrigatória' }),
    uf: z.string().length(2, { message: 'UF deve ter exatamente 2 caracteres' }).nonempty('UF é obrigatório'),
    neighborhood: z.string().min(1, { message: 'Bairro é obrigatório' }),
    password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
});
export const BusinessSchemaLogin = z.object({
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória')
});