'use client';

import Heading from '../components/Heading';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { MdArrowBack } from 'react-icons/md';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/navigation';
import ItemContent from './ItemContent';
import Button from '../components/forms/Button';
import { SafeUser } from '@/types';

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { shoppingCart, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  // ========<<< Empty Shopping Cart Display >>>===============================
  if (shoppingCart?.length === 0 || shoppingCart === null) {
    return (
      <div className='flex flex-col items-center'>
        <div className='text-2xl'>Your cart is empty</div>
        <div>
          <Link
            href={'/'}
            className='text-slate-500 flex items-center gap-1 mt-2'
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ========<<< Shopping Cart Headers Display >>>======================== */}
      <Heading title='Shopping Cart' center />
      <div className='grid grid-cols-5 text-xs gap-4 mt-8 pb-2 items-center uppercase'>
        <div className='col-span-2 justify-self-start'>product</div>
        <div className='justify-self-center'>price</div>
        <div className='justify-self-center'>quantity</div>
        <div className='justify-self-end'>total</div>
      </div>

      {/* ========<<< Shopping Cart Items Display >>>========================== */}
      <div>
        {shoppingCart &&
          shoppingCart?.map((item) => {
            return <ItemContent key={item.cartProductId} item={item} />;
          })}
      </div>
      <div className='border-t-[1.5px] border-slate-200 flex justify-between py-4'>
        {/* ========<<< Clear Shopping Cart Button >>>========================= */}
        <div className='w-24 mr-2'>
          <Button
            label='Clear Cart'
            small
            outline
            onClick={() => {
              handleClearCart();
            }}
          />
        </div>

        {/* ========<<< Shopping Cart Subtotal >>>============================= */}
        <div className='flex flex-col gap-1 items-start text-sm'>
          <div className='flex justify-between w-full text-base font-semibold'>
            <span>Subtotal:</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className='text-slate-500'>
            Taxes and shipping calculated at checkout
          </p>
          <Button
            label={currentUser ? 'Checkout' : 'Login To Checkout'}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push('/checkout') : router.push('/login');
            }}
          />

          <Link
            href={'/'}
            className='text-slate-500 flex items-center gap-1 mt-2'
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
