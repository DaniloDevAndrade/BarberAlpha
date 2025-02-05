export const config = {
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      plans: {
        free: {
          priceId: 'price_1QnluPAmkdpZ3CboLlUaifA8',
        },
        pro: {
          priceId: 'price_1QnltzAmkdpZ3Cbo51A6dT1Q'
        }
      }
    }
  }