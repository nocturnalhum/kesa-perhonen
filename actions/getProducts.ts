import prisma from '@/libs/prismadb';
import { Product } from '@prisma/client';

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  // ==========================================================================
  // =========<<< Shuffle Products >>>==========================================
  // ==========================================================================
  function shuffleArray(array: Product[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm || '';

    let query: any = {};

    if (category) {
      query.category = {
        has: category,
      };
    }
    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
        ],
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
    return shuffleArray(products); // shuffle products;
  } catch (error: any) {
    throw new Error(error);
  }
}
