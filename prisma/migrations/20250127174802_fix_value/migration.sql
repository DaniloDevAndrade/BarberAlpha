/*
  Warnings:

  - You are about to alter the column `value` on the `FinishedHaircuts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "FinishedHaircuts" ALTER COLUMN "value" SET DATA TYPE VARCHAR(10);
