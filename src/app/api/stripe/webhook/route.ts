import { config } from "@/config"
import { handleProcessWebhookUpdatedSubscription } from "@/services/stripe"
import { headers } from "next/headers"
import Stripe from "stripe"

const stripe = new Stripe(config.stripe.secretKey || '', {
    apiVersion: '2025-01-27.acacia',
    httpClient: Stripe.createFetchHttpClient(),
  })

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(`Webhook Error: ${error.message}`)
        return new Response(`WebHook Error: ${error.message}`, { status: 404})
    }

    switch(event.type){
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
            await handleProcessWebhookUpdatedSubscription(event.data)
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return new Response('{ "received": true}', {status: 200})
}