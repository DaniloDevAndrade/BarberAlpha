import { z } from "zod";

export const UserCreateSchemaRegister = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email('Email inválido').optional(),
    phone: z.string().nonempty('Telefone é obrigatório')
});

export const UserCreateSchemaDashboard = z.object({
    userName: z.string().nonempty('Nome é obrigatório'),
    emailBusiness: z.string().email('Email inválido').nonempty('Email é obrigatório, faça login'),
    userEmail: z.string().email('Email inválido').optional(),
    userPhone: z.string().nonempty('Telefone é obrigatório')
});

export const UserFinallyHairCut = z.object({
    hairValue: z.string().nonempty('Valor de Corte é obrigatório!'),
    emailBusiness: z.string().email('Email inválido').nonempty('Email é obrigatório, faça login'),
});

export const UserQueryCreateSchemaRegister= z.string().nonempty('Id da barbearia é obrigatório')

export const UserRemoveSchemaRow = z.object({
    phone: z.string().nonempty('Telefone é obrigatório')
});