import OrdersClient from './OrdersClient';
import { getCurrentUser } from '@/actions/getCurrentUser';
import getOrdersByUserId from '@/actions/getOrdersByUserId';
import NullData from '@/app/components/NullData';
import Container from '../components/Container';

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title='Oops! Access Denied' goBack={false} />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title='No orders yet...' goBack={false} />;
  }

  return (
    <div className='p-8'>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
