-- CreateEnum
CREATE TYPE "categoryCosts" AS ENUM ('Aluguel', 'Materiais', 'Salarios', 'Marketing', 'Luz', 'Agua', 'Outros');

-- CreateTable
CREATE TABLE "Costs" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "value" VARCHAR(10) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "custsDate" TIMESTAMP(3) NOT NULL,
    "category" "categoryCosts" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Costs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Costs" ADD CONSTRAINT "Costs_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
