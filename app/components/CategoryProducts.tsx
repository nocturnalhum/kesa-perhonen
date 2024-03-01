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

  return (
    <div className='flex flex-col items-center'>
      <button
        onClick={() => router.push(`/?category=${category}`)}
        className='w-fit text-2xl md:text-2xl text-slate-800 font-semibold underline uppercase py-3  hover:text-rose-800'
      >
        {category}
      </button>
      <div className='flex flex-col items-center w-full mb-10'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 w-fit'>
          {filterByCategory(shuffledProducts, category)
            .slice(0, 4)
            .map((product: Product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
