'use client';

import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { CiShoppingCart } from 'react-icons/ci';

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div
      className='relative cursor-pointer'
      onClick={() => router.push('/cart')}
    >
      <div className='text-3xl'>
        <CiShoppingCart />
      </div>
      <span className='absolute bottom-4 left-4 bg-slate-900 text-white h-5 aspect-square rounded-full flex items-center justify-center text-xs select-none border border-white'>
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
