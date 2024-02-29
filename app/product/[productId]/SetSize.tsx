'use client';

import {
  CartProductType,
  ItemType,
  SizeType,
} from '@/app/product/[productId]/ProductDetails';
import { useEffect, useState } from 'react';

interface SetSizeProps {
  items: ItemType[];
  cartProduct: CartProductType;
  handleSizeSelect: (value: SizeType) => void;
}

const SetSize: React.FC<SetSizeProps> = ({
  items,
  cartProduct,
  handleSizeSelect,
}) => {
  const [roundBorder, setRoundBorder] = useState(true);

  // Return the longest string length of size value in sizes array
  useEffect(() => {
    const longestSizeValue = items
      .map((item) => item.sizes.map((size) => size.size))
      .flat()
      .sort((a, b) => b.length - a.length)[0];

    // If size value is longer than 3 characters, set roundSizeBorder to false
    if (longestSizeValue.length > 3) {
      setRoundBorder(false);
    }
  }, [items]);

  const selectedItem = items.find(
    (item) => item.color === cartProduct.selectedItem.color
  );

  return (
    <div className='flex flex-col py-2'>
      <span className='font-bold uppercase'>
        size:
        <span className='font-normal uppercase ml-2'>
          {cartProduct.selectedItem.itemDetail.size}
        </span>
      </span>
      <div className='flex flex-wrap gap-3 items-center mt-2'>
        {selectedItem?.sizes.map((sizeDetail) => {
          if (sizeDetail.price !== 0) {
            return (
              <div
                onClick={() => handleSizeSelect(sizeDetail)}
                key={sizeDetail.size}
                className={`flex justify-center items-center h-9 aspect-square border rounded-full p-3 text-xs uppercase select-none ${
                  roundBorder ? 'rounded-full w-9' : 'w-24 rounded-md'
                }
              ${
                cartProduct.selectedItem.itemDetail.size === sizeDetail.size
                  ? 'border-[1.5px] border-slate-500'
                  : ''
              }`}
              >
                {sizeDetail.size}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SetSize;
