-- CreateEnum
CREATE TYPE "BussinessStatus" AS ENUM ('Active', 'Inactive', 'Pending');

-- CreateEnum
CREATE TYPE "RowPositionStatus" AS ENUM ('InServiced', 'Waiting');

-- CreateEnum
CREATE TYPE "RowStatus" AS ENUM ('Active', 'Inactive');

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "nameBarber" VARCHAR(255) NOT NULL,
    "cep" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "numberAddress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "uf" VARCHAR(255) NOT NULL,
    "neighborhood" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "BussinessStatus" NOT NULL DEFAULT 'Inactive',

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "rowId" TEXT,
    "businessId" TEXT,
    "position" INTEGER DEFAULT 0,
    "rowStatus" "RowPositionStatus" NOT NULL DEFAULT 'Waiting',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinRowAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedHaircuts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "value" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinishedHaircuts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barbers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Row" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "barberId" TEXT,
    "status" "RowStatus" NOT NULL DEFAULT 'Inactive',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Row_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Business_phone_key" ON "Business"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "Row"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedHaircuts" ADD CONSTRAINT "FinishedHaircuts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedHaircuts" ADD CONSTRAINT "FinishedHaircuts_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barbers" ADD CONSTRAINT "Barbers_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Row" ADD CONSTRAINT "Row_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Row" ADD CONSTRAINT "Row_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barbers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
