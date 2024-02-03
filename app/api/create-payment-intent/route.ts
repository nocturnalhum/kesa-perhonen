import Stripe from 'stripe';
import prisma from '@/libs/prismadb';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// ============================================================================
// ========<<< Calculate Order Amount >>>======================================
// ============================================================================
const calculateOrderAmount = (items: CartProductType[]) => {
  const TAXES = 113;
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal =
      item.selectedItem.itemDetail.price *
      item.quantity *
      (1 - item.selectedItem.itemDetail.discount / 100);
    return acc + itemTotal;
  }, 0);

  return Math.round(totalPrice * TAXES);
};

// ============================================================================
// ========<<< POST Request >>>================================================
// ============================================================================
export async function POST(request: NextRequest) {
  // Get CurrentUser:
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const { items, payment_intent_id } = body;
  const totalAmount = calculateOrderAmount(items);

  // MongoDB ORDER object:
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: totalAmount,
    currency: 'cad',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items,
  };

  // Check if PaymentIntentId already exists:
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    // Update Payment Intent on ORDER change:
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: totalAmount }
      );
      // Update ORDER in MongoDB with new Items and Total Amount:
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
    // Create New Payment Intent if doesn't exist:
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
    });
    // Create new Order in MongoDB with PaymentIntentId:
    orderData.paymentIntentId = paymentIntent.id;
    await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json({ paymentIntent });
  }

  return NextResponse.error();
}
