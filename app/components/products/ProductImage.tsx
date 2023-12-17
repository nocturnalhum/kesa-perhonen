'use client';
import {
  CartProductType,
  SelectedImgType,
} from '@/app/product/[productId]/ProductDetails';
import Image from 'next/image';
import React from 'react';

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}
const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className='grid grid-cols-6 gap-2 h-full'>
      <div className='border cursor-pointer h-fit'>
        <div className='flex flex-col items-center'>
          {product.items.map((image: SelectedImgType) => {
            return (
              <div
                key={image.color}
                onClick={() => handleColorSelect(image)}
                className={`relative w-[80%] aspect-square rounded border-teal-300 my-2 ${
                  cartProduct.selectedImg.color === image.color
                    ? 'border-[1.5px]'
                    : 'border-none'
                }`}
              >
                <Image
                  src={image.image}
                  alt={image.color}
                  height={800}
                  width={600}
                  className='object-contain'
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className='col-span-5 aspect-square'>
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          height={800}
          width={600}
          className='w-full h-full object-contain'
        />
      </div>
    </div>
  );
};

export default ProductImage;
