'use client';

import { Product } from '@prisma/client';
import React from 'react';
import ProductCard from './products/ProductCard';
import { useRouter } from 'next/navigation';

interface CategoryProductsProps {
  shuffledProducts: Product[];
  category: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({
  shuffledProducts,
  category,
}) => {
  const router = useRouter();

  // ==========================================================================
  // =========<<< Filter By Category >>>=======================================
  // ==========================================================================
  const filterByCategory = (products: Product[], category: string) => {
    return products
      .filter((product: Product) => product.category.includes(category))
      .sort((a, b) => {
        if (a.isNew && !b.isNew) {
          return -1;
        } else if (!a.isNew && b.isNew) {
          return 1;
        } else {
          return 0;
        }
      });
  };

  const hasItems = filterByCategory(shuffledProducts, category).length > 0;

  return (
    <>
      {hasItems ? (
        <div>
          <div className='flex justify-center w-full'>
            <button
              onClick={() => router.push(`/?category=${category}`)}
              className='w-fit text-2xl md:text-2xl text-slate-800 font-semibold underline uppercase p-3 hover:text-rose-800'
            >
              {category}
            </button>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 mb-4 lg:mb-6 px-2 sm:px-0'>
            {filterByCategory(shuffledProducts, category)
              .slice(0, 4)
              .map((product: Product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CategoryProducts;
