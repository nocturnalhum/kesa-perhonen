'use client';

import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import Image from 'next/image';
import React from 'react';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { name, items, price, reviews } = data;
  const router = useRouter();

  const productRating =
    reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className='col-span-1 cursor-pointer border border-slate-200 bg-slate-50 rounded-sm p-2 hover:scale-105 duration-300 text-center text-sm'
    >
      <div className='flex flex-col items-center w-full'>
        <div className='relative w-full aspect-square overflow-hidden'>
          <Image
            src={items[0].image}
            alt={name}
            height={600}
            width={600}
            className='w-full h-full object-contain'
          />
        </div>
        <div className='mt-4 h-10'>{truncateText(name)}</div>
        <div>
          <Rating value={productRating} precision={0.5} readOnly />
        </div>
        <div>{reviews.length} reviews</div>
        <div className='font-semibold'>{formatPrice(price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
