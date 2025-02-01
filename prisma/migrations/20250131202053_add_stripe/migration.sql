-- DropIndex
DROP INDEX "Business_phone_key";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "stripeSubscriptionStatus" TEXT;
