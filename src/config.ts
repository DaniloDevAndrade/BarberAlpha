export const config = {
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      plans: {
        free: {
          priceId: 'price_1QotOsAmkdpZ3CboK9iK8rWC',
        },
        pro: {
          priceId: 'price_1QotPCAmkdpZ3Cbow0BJmzvI'
        }
      }
    }
  }