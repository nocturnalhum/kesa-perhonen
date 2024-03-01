import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { items } = body;

  try {
    for (const item of items) {
      const { id, selectedItem, quantity } = item;
      const updatedProduct = await prisma.product.update({
        where: {
          id,
        },
        data: {
          items: {
            updateMany: {
              where: {
                color: selectedItem.color,
              },
              data: {
                sizes: {
                  updateMany: {
                    where: {
                      size: selectedItem.itemDetail.size,
                    },
                    data: {
                      inventory: {
                        decrement: quantity,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
    return NextResponse.json({ message: 'Inventory updated successfully' });
  } catch (error) {
    console.error('Error updating inventory:', error);
    return NextResponse.error();
  }
}
