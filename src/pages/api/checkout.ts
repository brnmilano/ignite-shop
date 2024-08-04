import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  checkoutUrl: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const priceId = "price_1PjRWYBpXSU3L2Tbu8sqK3km";

  const successUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return res.status(201).json({ checkoutUrl: checkoutSession.url });
}
