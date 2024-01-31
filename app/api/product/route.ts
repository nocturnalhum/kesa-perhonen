// export const dynamic = 'force-dynamic';

import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (currentUser.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();

  const { name, description, category, isNew, items } = body;

  const existingProduct = await prisma.product.findFirst({
    where: { AND: [{ name }, { description }] },
  });

  if (!existingProduct) {
    const product = await prisma.product.create({
      data: { name, description, category, isNew, items },
    });

    return NextResponse.json(product);
  }

  const updatedProduct = await prisma.product.update({
    where: { id: existingProduct.id },
    data: {
      items: [...existingProduct.items, ...items],
    },
  });

  return NextResponse.json(updatedProduct);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }
  const body = await request.json();
  const { productId, isNew } = body;
  const product = await prisma.product.update({
    where: { id: productId },
    data: { isNew },
  });

  return NextResponse.json(product);
}
