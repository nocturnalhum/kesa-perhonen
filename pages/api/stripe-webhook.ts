import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import prisma from '@/libs/prismadb';

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Buffer the request data
  const buff = await buffer(req);
  // Verify the Stripe signature
  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).send('Missing Stripe Signature');
  }

  let event: Stripe.Event | undefined;

  try {
    event = stripe.webhooks.constructEvent(
      buff,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).send('Webhook error: ' + error);
  }

  const CHARGE_SUCCEEDED_EVENT = 'charge.succeeded';

  switch (event.type) {
    case CHARGE_SUCCEEDED_EVENT:
      const charge: any = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === 'string') {
        await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: { status: 'complete', address: charge.shipping?.address },
        });
      }
      break;
    default:
      console.warn('Unhandled event type: ', event.type);
  }
  res.json({ received: true });
}
