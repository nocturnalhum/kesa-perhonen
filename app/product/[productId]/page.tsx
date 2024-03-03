import Container from '@/app/components/Container';
import NullData from '@/app/components/NullData';
import ProductDetails from './ProductDetails';
import ListRating from './ListRating';
import getProductById from '@/actions/getProductById';
import { getCurrentUser } from '@/actions/getCurrentUser';
import AddRating from './AddRating';

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product) {
    return (
      <NullData
        title='Oops! Product with given ID does not exist'
        goBack={true}
      />
    );
  }
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product} />
        <div className='flex flex-col mt-20 gap-4'>
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
