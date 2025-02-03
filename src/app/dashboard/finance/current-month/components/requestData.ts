'use server';
import { prisma } from "@/database/database";
import { Prisma } from "@prisma/client";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

type chartData = {
  day: string;
  Receita: number;
  Despesas: number;
  Lucro: number;
}[];


export const generateDataMonth = async (emailBusiness: string) => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const chartData: chartData = [];

  const where: Prisma.BusinessWhereInput = {}
  if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
    
  const findBusiness = await prisma.business.findFirst({where})
  if(!findBusiness) return console.log({success: false, error:{message: "Barbearia não encontrada, faça login!"}})
  
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    chartData.push({ 
      day: day.toString().padStart(2, '0'),
      Receita: 0, 
      Despesas: 0, 
      Lucro: 0 
    });
  }

  const finishedHaircuts = await prisma.finishedHaircuts.findMany({
    where: {
      businessId: findBusiness.id
    },
    select: {
      createdAt: true,
      value: true 
    }
  });
  
  finishedHaircuts.forEach(haircut => {
    const date = new Date(haircut.createdAt);
    
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
      const day = date.getDate();
      const value = parseFloat(haircut.value);
      if (!isNaN(value)) {
        chartData[day - 1].Receita += value;
      }
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
    
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
      const day = date.getDate();
      const value = parseFloat(cost.value);
      if (!isNaN(value)) {
        chartData[day - 1].Despesas += value;
      }
    }
  });

  chartData.forEach(data => {
    data.Lucro = data.Receita - data.Despesas;
  });

  return chartData;
}

export const CalculateTotalsMonth = async (emailBusiness: string) => {
  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(new Date());

  const where: Prisma.BusinessWhereInput = {}
  if(emailBusiness) where.email = {contains: emailBusiness, mode: 'insensitive'}
    
  const findBusiness = await prisma.business.findFirst({where})
  if(!findBusiness) return console.log({success: false, error:{message: "Barbearia não encontrada, faça login!"}})

  const finishedHaircuts = await prisma.finishedHaircuts.findMany({
    where: {
      businessId: findBusiness.id,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const totalValueReceita = finishedHaircuts.reduce((sum, haircut) => sum + parseFloat(haircut.value), 0);
  
  const Costs = await prisma.costs.findMany({
    where: {
      businessId: findBusiness.id,
      custsDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
  
  const totalValueCosts = Costs.reduce((sum, cost) => sum + parseFloat(cost.value), 0);

  const totalValueLucro = totalValueReceita - totalValueCosts;

  const lastMonthStartDate = startOfMonth(subMonths(new Date(), 1));
  const lastMonthEndDate = endOfMonth(subMonths(new Date(), 1));

  const previousFinishedHaircuts = await prisma.finishedHaircuts.findMany({
    where: {
      businessId: findBusiness.id,
      createdAt: {
        gte: lastMonthStartDate,
        lte: lastMonthEndDate,
      },
    },
  });

  const previousTotalValueReceita = previousFinishedHaircuts.reduce((sum, haircut) => sum + parseFloat(haircut.value), 0);
  
  const previousCosts = await prisma.costs.findMany({
    where: {
      businessId: findBusiness.id,
      custsDate: {
        gte: lastMonthStartDate,
        lte: lastMonthEndDate,
      },
    },
  });
  
  const previousTotalValueCosts = previousCosts.reduce((sum, cost) => sum + parseFloat(cost.value), 0);
  
  const previousTotalValueLucro = previousTotalValueReceita - previousTotalValueCosts;

  const projecaoMes = previousTotalValueLucro;

  const TotalData = { receitaMes: totalValueReceita, despesasMes: totalValueCosts, lucroMes: totalValueLucro, projecaoMes };

  return TotalData;
};
