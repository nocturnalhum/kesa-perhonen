import Stripe from 'stripe';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const HST = 1.13;
  const subtotal = items.reduce(
    (acc: number, item: CartProductType) =>
      acc +
      item.selectedItem.itemDetail.price *
        (1 - item.selectedItem.itemDetail.discount / 100) *
        item.quantity,
    0
  );
  return Math.round(subtotal * HST * 100);
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;

  const orderAmount = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: orderAmount,
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
        { amount: orderAmount }
      );
      // Update Order:
      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: orderAmount,
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
    // Create Payment Intent:
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
    });

    // Create Order:
    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json({ paymentIntent });
  }
  return NextResponse.error();
}
