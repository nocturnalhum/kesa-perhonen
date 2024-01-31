import Container from './components/Container';
import HeroBanner from './components/HeroBanner';
import { products } from '@/utils/products';
import ProductCard from './components/products/ProductCard';

export default function Home() {
  return (
    <div className='min-h-[90dvh]'>
      <HeroBanner />
      <Container>
        <div className='grid grid-cols-2 gap-2 capitalize md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10'>
          {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
