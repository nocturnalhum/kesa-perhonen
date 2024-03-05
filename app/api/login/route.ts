import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userId = data.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: { userId, status: 'pending' },
    });

    if (order) {
      return NextResponse.json(order);
    } else {
      return NextResponse.json(
        { error: 'No pending order found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching order:', error); // Log error for debugging
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
