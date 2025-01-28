'use server';
import { prisma } from "@/database/database";
import { Prisma } from "@prisma/client";

export const generateMockData = async (emailBusiness: string) => {
  const chartData = [
    { month: "Jan", Receita: 0, Despesas: 0, Lucro:0},
    { month: "Fev", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Mar", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Abr", Receita: 0, Despesas: 0, Lucro:10 },
    { month: "Mai", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Jun", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Jul", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Ago", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Set", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Out", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Nov", Receita: 0, Despesas: 0, Lucro:0 },
    { month: "Dez", Receita: 0, Despesas: 0, Lucro:0 }
  ]

  const where: Prisma.BusinessWhereInput = {}
  if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
  
  const findBusiness = await prisma.business.findFirst({where})
  if(!findBusiness) return console.log({success: false, error:{message: "Barbearia não encontrada, faça login!"}})

  const finishedHaircuts = await prisma.finishedHaircuts.findMany({
    where:{
      businessId: findBusiness.id
    },
    select: {
      timeInRow: true,
      value: true 
    }
  });
  
  finishedHaircuts.forEach(haircut => {
    const date = new Date(haircut.timeInRow);
    const month = date.getMonth();

    const value = parseFloat(haircut.value);
    if (!isNaN(value)) {
      chartData[month].Receita += value;
    }
  });

  const Costs = await prisma.costs.findMany({
    where: {
      businessId: findBusiness.id
    },
    select: {
      createdAt: true,
      value: true 
    }
  });

  Costs.forEach(cost => {
    const date = new Date(cost.createdAt);
    const month = date.getMonth();

    const value = parseFloat(cost.value);
    if (!isNaN(value)) {
      chartData[month].Despesas += value;
    }
  });

  chartData.forEach(data => {
    data.Lucro = data.Receita - data.Despesas;
  });

  return chartData
};

export const CalculateTotals = async (emailBusiness: string) => {

  const where: Prisma.BusinessWhereInput = {}
  if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
  
  const findBusiness = await prisma.business.findFirst({where})
  if(!findBusiness) return console.log({success: false, error:{message: "Barbearia não encontrada, faça login!"}})

  const finishedHaircuts = await prisma.finishedHaircuts.findMany({where: {businessId: findBusiness.id}});
  const totalValueReceita = finishedHaircuts.reduce((sum, haircut) => sum + parseFloat(haircut.value), 0);
  
  const Costs = await prisma.costs.findMany({where: {businessId: findBusiness.id}});
  const totalValueCosts = Costs.reduce((sum, cost) => sum + parseFloat(cost.value), 0);

  const totalValueLucro = totalValueReceita - totalValueCosts

  const TotalData = { receitaTotal: totalValueReceita, despesasTotal: totalValueCosts, lucroTotal: totalValueLucro }

    return TotalData
};