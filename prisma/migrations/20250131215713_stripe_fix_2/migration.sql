-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "stripeCustomerId" DROP NOT NULL,
ALTER COLUMN "stripePriceId" DROP NOT NULL,
ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL,
ALTER COLUMN "stripeSubscriptionStatus" DROP NOT NULL;
