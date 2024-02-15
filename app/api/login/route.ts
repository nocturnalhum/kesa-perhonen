import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const userId = data.userId;

  if (userId) {
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
  } else {
    return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
  }
}
