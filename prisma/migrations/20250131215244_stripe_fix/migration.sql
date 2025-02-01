/*
  Warnings:

  - Made the column `stripeCustomerId` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripePriceId` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripeSubscriptionId` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripeSubscriptionStatus` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "stripeCustomerId" SET NOT NULL,
ALTER COLUMN "stripePriceId" SET NOT NULL,
ALTER COLUMN "stripeSubscriptionId" SET NOT NULL,
ALTER COLUMN "stripeSubscriptionStatus" SET NOT NULL;
