'use client';

import Heading from '@/app/components/Heading';
import { formatPrice } from '@/utils/formatPrice';
import { CartProductType, Order } from '@prisma/client';
import moment from 'moment';
import OrderItem from './OrderItem';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/forms/Button';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const router = useRouter();

  const HST = 1.13;
  const getSubTotal = (items: CartProductType[]) => {
    let total = 0;
    items.forEach((item) => {
      total +=
        item.selectedItem.itemDetail.price *
        (1 - item.selectedItem.itemDetail.discount / 100) *
        item.quantity;
    });
    return total;
  };

  const getTax = (subTotal: number) => {
    return subTotal * (HST - 1);
  };

  return (
    <div className='max-w-[1150px] mx-auto flex flex-col gap-2'>
      <div className='mt-8'>
        <Heading title='Order Details' />
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Total Amount:{' '}
        <span className='font-bold'>{formatPrice(order.amount / 100)}</span>
      </div>
      <div className='flex gap-2 items-center'>
        <div>Payment Status: </div>
        <div className='font-bold'>
          {order.status === 'pending'
            ? 'Pending'
            : order.status === 'complete'
            ? 'Completed'
            : ''}
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <div>Delivery Status: </div>
        <div className='font-bold'>
          {order.deliveryStatus === 'pending'
            ? 'Pending'
            : order.deliveryStatus === 'dispatched'
            ? 'Dispatched'
            : order.deliveryStatus === 'delivered'
            ? 'Delivered'
            : ''}
        </div>
      </div>
      <div>Date: {moment(order.createDate).fromNow()}</div>
      <div>
        <h2 className='font-semibold mt-4 mb-2'>Order Summary: </h2>
        <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center'>
          <div className='col-span-2 justify-self-start'>PRODUCT</div>
          <div className='justify-self-center'>PRICE</div>
          <div className='justify-self-center'>QTY</div>
          <div className='justify-self-end'>TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item: CartProductType) => {
            return <OrderItem key={item.cartProductId} item={item} />;
          })}
      </div>
      <div className='flex justify-end items-center pt-5 w-full border-t-[1.5px] border-slate-200'>
        Subtotal:
        <div className='ml-2 font-semibold text-sm'>
          {formatPrice(getSubTotal(order.products))}
        </div>
      </div>
      <div className='flex justify-end items-center w-full'>
        Estimated Tax (HST 13%):
        <div className='ml-2 font-semibold text-sm'>
          {formatPrice(getTax(getSubTotal(order.products)))}
        </div>
      </div>
      <div className='flex justify-end items-center w-full font-semibold pb-5'>
        Grand Total:
        <div className='ml-2 font-semibold text-sm'>
          {formatPrice(getSubTotal(order.products) * HST)}
        </div>
      </div>
      <div className='flex mx-auto w-40 pt-5'>
        <Button
          label='Back'
          onClick={() => {
            router.push('/orders');
          }}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
