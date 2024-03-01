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
    <div>
      <div className='text-2xl md:text-xl text-rose-800 font-semibold underline capitalize pl-5 pb-4 hover:text-rose-600'>
        <button onClick={() => router.push(`/?category=${category}`)}>
          {category}
        </button>
      </div>
      <div className='grid grid-cols-2 gap-2 capitalize md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10 px-2'>
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
