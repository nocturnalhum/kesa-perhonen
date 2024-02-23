import { getCurrentUser } from '@/actions/getCurrentUser';
import { ItemType, SizeType } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (currentUser.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const colorToRemove = params.slug[0];
  const sizeToRemove = params.slug[1];
  const id = params.slug[2];

  const product = await prisma?.product.findUnique({
    where: { id },
  });
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Find item index in product's items array based on color
  const itemToUpdateIndex = product.items.findIndex(
    (item: ItemType) => item.color === colorToRemove
  );

  if (itemToUpdateIndex === -1) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  const updatedSizes = product.items[itemToUpdateIndex].sizes.filter(
    (size: SizeType) => size.size[0] !== sizeToRemove
  );

  // console.log('updatedSizes', updatedSizes);

  // When the sizes array is empty, delete the color item from items
  if (updatedSizes.length < 1) {
    const updatedProduct = await prisma?.product.update({
      where: { id },
      data: {
        items: {
          set: product.items.filter(
            (item: ItemType) => item.color !== colorToRemove
          ),
        },
      },
    });

    // If all items are gone, delete the product
    if (updatedProduct?.items.length === 0) {
      const deletedProduct = await prisma?.product.delete({
        where: { id },
      });
      return NextResponse.json(deletedProduct);
    }

    // console.log('updatedProduct', updatedProduct);

    return NextResponse.json(updatedProduct);
  } else {
    const updatedItem = {
      ...product.items[itemToUpdateIndex],
      sizes: updatedSizes,
    };

    const updatedItemsArray = [...product.items];
    updatedItemsArray[itemToUpdateIndex] = updatedItem;

    // console.log('updatedItemsArray', updatedItemsArray);

    const updatedProduct = await prisma?.product.update({
      where: { id },
      data: {
        items: {
          set: updatedItemsArray,
        },
      },
    });

    // console.log('updatedProduct', updatedProduct);

    return NextResponse.json(updatedProduct);
  }
}
