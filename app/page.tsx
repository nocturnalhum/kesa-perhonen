export const revalidate = 0;

import Container from './components/Container';
import ProductCard from './components/products/ProductCard';
import NullData from './components/NullData';
import getProducts, { IProductParams } from '@/actions/getProducts';
import { Product } from '@prisma/client';
import { Metadata } from 'next';
import Slider from './components/Slider';
import { categories } from '@/utils/categories';
import Link from 'next/link';
import CategoryProducts from './components/CategoryProducts';

export const metadata: Metadata = {
  title: 'kesä perhonen | Home Goods | Apparel | Gifts Store',
};
interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title="Oops! No products found. Click 'All' to clear filters" />
    );
  }

  function shuffleArray(array: Product[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className='min-h-[90dvh]'>
      <Slider />
      <Container>
        <div className='w-full text-center text-2xl md:text-3xl text-slate-600 font-medium ml-3 mb-4 uppercase tracking-widest'>
          {searchParams.category ? searchParams.category : 'All Products'}
        </div>
        {!searchParams.category ? (
          <div>
            {categories.slice(1, categories.length).map((category) => {
              return (
                <CategoryProducts
                  key={category.id}
                  category={category.category}
                  shuffledProducts={shuffledProducts}
                />
              );
            })}
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-2 capitalize sm:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-10'>
            {shuffledProducts.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
