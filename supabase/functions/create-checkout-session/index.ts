
// Follow this setup guide to deploy the function:
// https://supabase.com/docs/guides/functions
//
// 1. supabase functions new create-checkout-session
// 2. Paste this code into supabase/functions/create-checkout-session/index.ts
// 3. supabase secrets set STRIPE_SECRET_KEY=sk_test_...
// 4. supabase functions deploy create-checkout-session

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    apiVersion: '2022-11-15',
})

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { items, email } = await req.json()

        // Map items to Stripe line items
        // NOTE: In a real app, you should validate prices on the backend to avoid client-side manipulation.
        // Here we trust the client for simplicity of the template, but explain the risk.
        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    images: item.image ? [item.image] : [], // Ensure image is a valid URL if possible
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects cents
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
            customer_email: email, // Pre-fill email if user is logged in
        })

        return new Response(
            JSON.stringify({ sessionId: session.id, url: session.url }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
