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
    return products.filter((product: Product) =>
      product.category.includes(category)
    );
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <button
        onClick={() => router.push(`/?category=${category}`)}
        className='text-2xl md:text-xl text-slate-800 font-semibold underline uppercase pb-3  hover:text-rose-800'
      >
        {category}
      </button>
      <div className='flex flex-start justify-center gap-5 mb-10 px-2'>
        {filterByCategory(shuffledProducts, category)
          .slice(0, 4)
          .map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default CategoryProducts;
