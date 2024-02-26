import ManageOrdersClient from './ManageOrdersClient';
import NullData from '@/app/components/NullData';
import getOrders from '@/actions/getOrders';
import { getCurrentUser } from '@/actions/getCurrentUser';
import Container from '@/app/components/Container';

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title='Oops! Access Denied' />;
  }

  return (
    <div className='p-8'>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
