/*
  Warnings:

  - You are about to alter the column `value` on the `FinishedHaircuts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Made the column `value` on table `FinishedHaircuts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FinishedHaircuts" ALTER COLUMN "value" SET NOT NULL,
ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2);
