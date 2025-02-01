export const config = {
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      plans: {
        free: {
          priceId: 'price_1Qnh15PGZsn0XgqTG3HhuQDp',
        },
        pro: {
          priceId: 'price_1QnPofPGZsn0XgqTkDNaBNZk'
        }
      }
    }
  }