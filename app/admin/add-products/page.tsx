import Container from '@/app/components/Container';
import AddProductForm from './AddProductForm';
import FormWrap from '@/app/components/FormWrap';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title='Oops! Access Denied' goBack={false} />;
  }
  if (currentUser.role !== 'ADMIN') {
    return <NullData title='Oops! Access Denied' goBack={false} />;
  }

  return (
    <div className='px-8'>
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
