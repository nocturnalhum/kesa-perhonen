import Container from '@/app/components/Container';
import { products } from '@/utils/products';
import ProductDetails from './ProductDetails';

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const product = products.find((item) => item.id === params.productId);
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
};

export default Product;
