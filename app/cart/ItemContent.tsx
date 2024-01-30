'use client';

import React from 'react';
import { CartProductType } from '../product/[productId]/ProductDetails';
import { formatPrice } from '../../utils/formatPrice';
import Link from 'next/link';
import { truncateText } from '../../utils/truncateText';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import SetQuantity from '../product/[productId]/SetQuantity';

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleRemoveProductFromCart,
  } = useCart();
  const { id, name, selectedItem, quantity } = item;
  const itemPrice =
    selectedItem.itemDetail.price *
    (1 - selectedItem.itemDetail.discount / 100);

  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center'>
      <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>
        <Link href={`/product/${id}`}>
          <div className='relative w-20 aspect-square'>
            <Image
              priority
              src={selectedItem.image}
              alt={name}
              height={800}
              width={600}
              className='object-contain'
            />
          </div>
        </Link>
        <div className='flex flex-col justify-between capitalize'>
          <Link href={`/product/${id}`}>{truncateText(name, 30)}</Link>
          <div>{selectedItem.color}</div>
          <div className='w-20'>
            <button
              className='text-slate-500 underline'
              onClick={() => {
                handleRemoveProductFromCart(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className='justify-self-center'>{formatPrice(itemPrice)}</div>
      <div className='justify-self-center'>
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
        />
      </div>
      <div className='justify-self-end font-semibold'>
        {formatPrice(itemPrice * quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
