import prisma from '@/libs/prismadb';
import Stripe from 'stripe';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { CartProductType } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const TAXES = 113;
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal =
      item.selectedItem.price *
      item.quantity *
      (1 - item.selectedItem.discount / 100);
    return acc + itemTotal;
  }, 0);

  return Math.round(totalPrice * TAXES);
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();

  const { items, payment_intent_id } = body;
  const totalAmount = calculateOrderAmount(items);

  // MongoDB object:
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: totalAmount,
    currency: 'cad',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: totalAmount }
      );
      // update order
      const [existing_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: totalAmount,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: 'Invalid Payment Intent' },
          { status: 400 }
        );
      }
      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    // Create New Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
    });
    // Create the Order
    orderData.paymentIntentId = paymentIntent.id;
    await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json({ paymentIntent });
  }

  return NextResponse.error();
}
