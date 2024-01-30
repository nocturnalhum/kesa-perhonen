import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { items } = body;

  try {
    for (const item of items) {
      const [id, colorCode, itemSize] = item.id.split('-');

      const updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          items: {
            updateMany: {
              where: {
                colorCode: colorCode,
              },
              data: {
                sizes: {
                  updateMany: {
                    where: {
                      size: { has: itemSize },
                    },
                    data: {
                      inventory: {
                        decrement: item.quantity,
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
