import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ""; // Provide a default value if undefined

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20",
  appInfo: {
    name: "Ignite Shop",
  },
});
