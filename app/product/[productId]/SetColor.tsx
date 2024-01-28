'use client';

import {
  CartProductType,
  SelectedItemType,
} from '@/app/product/[productId]/ProductDetails';
import Image from 'next/image';
import React from 'react';

interface SetColorProps {
  items: SelectedItemType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedItemType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  items,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className='flex gap-4 items-center'>
      <div>
        <span className='font-bold uppercase'>
          color:
          <span className='font-normal capitalize ml-2'>
            {cartProduct.selectedItem.color}
          </span>
        </span>
        <div className='grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 sm:gap-1 mt-0.5'>
          {/* =====<<< Map out colored radio buttons to select product color >>>===== */}
          {items?.map((item) => {
            return (
              <div
                onClick={() => handleColorSelect(item)}
                key={item.color}
                className={`h-20 w-20 aspect-square rounded-full flex items-center justify-center ${
                  cartProduct.selectedItem.color === item.color
                    ? 'border-2 border-amber-400'
                    : 'border-none'
                }`}
              >
                <Image
                  src={item.image}
                  alt='image.color'
                  height={70}
                  width={70}
                  className='rounded-full bg-white'
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
