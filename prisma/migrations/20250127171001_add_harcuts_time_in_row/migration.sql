/*
  Warnings:

  - Added the required column `timeInRow` to the `FinishedHaircuts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinishedHaircuts" ADD COLUMN     "timeInRow" TIMESTAMP(3) NOT NULL;
