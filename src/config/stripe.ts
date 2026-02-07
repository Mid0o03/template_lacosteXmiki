import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
    console.warn('Stripe Public Key is missing. Payments will not work.');
}

// Return null if no key, to prevent crash
export const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;
