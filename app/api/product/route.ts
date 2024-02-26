import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { ItemType, SizeType } from '@prisma/client';

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

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }
  const body = await request.json();
  const { productId, itemId, size } = body;

  if (!productId || !itemId || !size) {
    return NextResponse.json(
      { error: 'Missing required data in request body' },
      { status: 400 }
    );
  }

  // Find product based on productId
  const product = await prisma?.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Find item index in product's items array based on itemId
  const itemToUpdateIndex = product.items.findIndex(
    (item: ItemType) => item.itemId === itemId
  );

  if (itemToUpdateIndex === -1) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  // Filter size from item sizes array
  const updatedItemSizes = product.items[itemToUpdateIndex].sizes.filter(
    (itemSize: SizeType) => itemSize.size !== size
  );

  // If updated sizes array is empty, delete the item from items
  if (updatedItemSizes.length < 1) {
    const updatedProduct = await prisma?.product.update({
      where: { id: productId },
      data: {
        items: {
          set: product.items.filter((item: ItemType) => item.itemId !== itemId),
        },
      },
    });

    // If items array is empty, delete the product
    if (updatedProduct?.items.length < 1) {
      const deletedProduct = await prisma?.product.delete({
        where: { id: productId },
      });
      return NextResponse.json({ deleteImage: true });
    }

    return NextResponse.json({ deleteImage: true });
  } else {
    const updatedItem = {
      ...product.items[itemToUpdateIndex],
      sizes: updatedItemSizes,
    };

    const updatedItemsArray = [...product.items];
    updatedItemsArray[itemToUpdateIndex] = updatedItem;

    const updatedProduct = await prisma?.product.update({
      where: { id: productId },
      data: {
        items: {
          set: updatedItemsArray,
        },
      },
    });

    return NextResponse.json({ deleteImage: false });
  }
}
