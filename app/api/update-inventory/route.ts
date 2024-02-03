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
  // console.log('Update-Inventory', items);
  // try {
  //   for (const item of items) {
  //     const updatedProduct = await prisma.product.update({
  //       where: {
  //         id: item.id,
  //       },
  //       data: {
  //         items: {
  //           updateMany: {
  //             where: {
  //               color: item.selectedItem.color,
  //             },
  //             data: {
  //               sizes: {
  //                 updateMany: {
  //                   where: {
  //                     size: { has: item.selectedItem.itemDetail.size[0] },
  //                   },
  //                   data: {
  //                     inventory: {
  //                       decrement: item.selectedItem.itemDetail.quantity,
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }
  return NextResponse.json({ message: 'Inventory updated successfully' });
  // } catch (error) {
  //   console.error('Error updating inventory:', error);
  //   return NextResponse.error();
  // }
}
