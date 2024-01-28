import { products } from '@/utils/products';
import Container from '@/app/components/Container';
import NullData from '@/app/components/NullData';
import ProductDetails from './ProductDetails';
import ListRating from './ListRating';

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
        <div className='flex flex-col mt-20 gap-4'>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
