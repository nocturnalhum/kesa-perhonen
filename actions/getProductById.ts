import NullData from '@/app/components/NullData';
import prisma from '@/libs/prismadb';

interface IParams {
  productId?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const { productId } = params;

    if (!productId) {
      return null;
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: 'desc',
          },
        },
      },
    });

    return product;
  } catch (error: any) {
    // Prisma's error code for "Record not found"
    if (error.code === 'P2023') {
      return null;
    } else {
      throw new Error('Failed to fetch product', error);
    }
  }
}
