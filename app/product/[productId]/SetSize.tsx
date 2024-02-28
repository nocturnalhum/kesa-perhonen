'use client';

import {
  CartProductType,
  ItemType,
  SizeType,
} from '@/app/product/[productId]/ProductDetails';

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
      <div className='flex gap-3 items-center mt-2'>
        {selectedItem?.sizes.map((sizeDetail) => {
          if (sizeDetail.price !== 0) {
            return (
              <div
                onClick={() => handleSizeSelect(sizeDetail)}
                key={sizeDetail.size}
                className={`flex justify-center items-center h-9 aspect-square border rounded-full p-3 text-xs uppercase select-none ${
                  sizeDetail.size.length > 3 ? 'w-24 rounded-md' : 'w-9'
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
