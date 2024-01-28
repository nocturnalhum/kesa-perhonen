import { products } from '@/utils/products';
import Container from '@/app/components/Container';
import NullData from '@/app/components/NullData';
import ProductDetails from './ProductDetails';

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = products.find((prod) => prod.id === params.productId);

  if (!product) {
    return <NullData title='Oops! Product with given ID does not exist' />;
  }

  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
};

export default Product;
