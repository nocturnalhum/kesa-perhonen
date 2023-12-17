'use client';

import {
  CartProductType,
  SelectedImgType,
} from '@/app/product/[productId]/ProductDetails';
import React from 'react';

interface SetColorProps {
  items: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  items,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className='flex gap-4 items-center'>
      <div>
        <span className='font-bold uppercase'>color:</span>
        <div className='flex gap-1'>
          {items.map((image) => {
            return (
              <div
                onClick={() => handleColorSelect(image)}
                key={image.color}
                className={`h-7 w-7 rounded-full border-teal-300 border flex items-center justify-center ${
                  cartProduct.selectedImg.color === image.color
                    ? 'border-[1.5px]'
                    : 'border-none'
                }`}
              >
                <div
                  style={{ background: image.colorCode }}
                  className='h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer'
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
