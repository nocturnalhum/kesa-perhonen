// export const revalidate = 0;

import Container from './components/Container';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/products/ProductCard';
import NullData from './components/NullData';
import getProducts, { IProductParams } from '@/actions/getProducts';
import { Product } from '@prisma/client';
import { Metadata } from 'next';

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
      array[i], (array[j] = array[j]), array[i];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className='min-h-[90dvh]'>
      <HeroBanner />
      <Container>
        <div className='text-3xl font-bold ml-3 mb-4 capitalize'>
          {searchParams.category ? searchParams.category : 'All Products'}
        </div>
        <div className='grid grid-cols-2 gap-2 capitalize md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10'>
          {shuffledProducts.map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
