'use client';

import Image from 'next/image';
import { CartProductType, SelectedItemType } from './ProductDetails';

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedItemType) => void;
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
          {/* Map out different colors of item */}
          {product.items.map((item: any) => {
            return (
              <div
                key={item.color}
                onClick={() => handleColorSelect(item)}
                className={`relative w-[80%] aspect-square rounded border-amber-400 my-2 ${
                  cartProduct.selectedItem?.color === item.color
                    ? 'border-2'
                    : 'border-none'
                }`}
              >
                {/* =====< Sidebar with different color variations of item >>>=====*/}
                <Image
                  src={item.image}
                  alt={item.color}
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
        {/* =====<<< Display large color image of item selected for adding to cart >>>=====*/}
        <Image
          src={cartProduct.selectedItem.image}
          alt={cartProduct.name + ' ' + cartProduct.selectedItem.color}
          height={800}
          width={600}
          className='w-full h-full object-contain'
        />
      </div>
    </div>
  );
};

export default ProductImage;
