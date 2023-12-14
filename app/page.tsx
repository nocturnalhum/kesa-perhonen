import type { Metadata } from 'next';
import HeroBanner from './components/HeroBanner';
import Container from './components/Container';
import { products } from '../utils/products';

export const metadata: Metadata = {
  title: 'kesä perhonen | Home Goods | Apparel | Gifts Store',
};

export default function Home() {
  return (
    <div className='p-8'>
      <Container>
        <div>
          <HeroBanner />
        </div>
      </Container>
    </div>
  );
}
