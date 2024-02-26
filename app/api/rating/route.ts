import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { CartProductType, Order, Review } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, comment, rating, product, userId } = body;

    const deliveredOrder = currentUser?.orders.some(
      (order: Order) =>
        order.products.find(
          (cartProduct: CartProductType) => cartProduct.id === product.id
        ) && order.deliveryStatus === 'delivered'
    );

    const userReview = product?.reviews.find((review: Review) => {
      return review.userId === currentUser.id;
    });

    if (userReview || !deliveredOrder) {
      return NextResponse.error();
    }

    const review = await prisma?.review.create({
      data: {
        title,
        comment,
        rating,
        productId: product.id,
        userId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error in Rating POST request:', error);
    return NextResponse.error();
  }
}
