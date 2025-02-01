'use server'
import { config } from "@/config";
import { prisma } from "@/database/database";
import Stripe from "stripe";

const stripe = new Stripe(config.stripe.secretKey || '', {
    apiVersion: '2025-01-27.acacia',
    httpClient: Stripe.createFetchHttpClient(),
  })

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  

export async function getStripeCustomerByEmail(email: string) {
  const customers = await stripe.customers.list({ email });
  return customers.data[0];
}

export async function createStripeCustomer(input: {
  name?: string,
  email: string
}) {
  const customer = await getStripeCustomerByEmail(input.email)
    if(customer) return customer
    
    const createdCustomer = await stripe.customers.create({
      email: input.email,
      name: input.name
    });

    const createdCustomerSubscription = await stripe.subscriptions.create({
      customer: createdCustomer.id,
      items: [{price: config.stripe.plans.free.priceId }]
  })

  await prisma.business.update({
    where: {
      email: input.email
    },
    data: {
      stripeCustomerId: createdCustomer.id,
      stripeSubscriptionId: createdCustomerSubscription.id,
      stripeSubscriptionStatus: createdCustomerSubscription.status,
      stripePriceId: config.stripe.plans.free.priceId
    }
  })

  return createdCustomer
}

export async function createCheckoutSession(userId: string, userEmail: string, userSubscriptionId: string) {
  try {
    const customer = await createStripeCustomer({
      email: userEmail
    })

    const subscription = await stripe.subscriptionItems.list({
      subscription: userSubscriptionId,
      limit: 1
    })

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${BASE_URL}/dashboard/billing?success=true`,
      flow_data: {
        type: 'subscription_update_confirm',
        after_completion: {
          type: 'redirect',
          redirect:{
            return_url:`${BASE_URL}/dashboard/billing?success=true`
          }
        },
        subscription_update_confirm: {
          subscription: userSubscriptionId,
          items: [
            {
              id: subscription.data[0].id,
              price: config.stripe.plans.pro.priceId,
              quantity: 1
            }
          ]
        }
      }
    })

    return {
      url: session.url
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error to create checkout session')
  }
}

export const handleProcessWebhookUpdatedSubscription = async (event: { object: Stripe.Subscription }) => {
  const stripeCustomerId = event.object.customer as string
  const stripeSubscriptionId = event.object.id as string
  const stripeSubscriptionStatus = event.object.status
  const stripePriceId = event.object.items.data[0].price.id

  const userExists = await prisma.business.findFirst({
    where: {
      OR: [
        {
          stripeSubscriptionId,
        },
        {
          stripeCustomerId
        }
      ]
    },
    select: {
      id: true
    }
  })

  if(!userExists) {
    throw new Error('user of stripeCustomerId not found')
  }

  await prisma.business.update({
    where: {
      id: userExists.id
    },
    data: {
      stripeCustomerId,
      stripeSubscriptionId,
      stripeSubscriptionStatus,
      stripePriceId
    }
  })
}

type Plan = {
  priceId: string
}

type Plans = {
  [key: string]: Plan
}

export async function getPlanByPrice(priceId: string) {
  const plans: Plans = config.stripe.plans
  
  const planKey = Object.keys(plans).find(
    (key) => plans[key].priceId === priceId
  ) as keyof Plans | undefined

  const plan = planKey? plans[planKey]: null

  if(!plan){
    throw new Error(`Plan not found for priceId: ${priceId}`)
  }

  return {
    name: planKey as string
  }
}