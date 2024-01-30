import Image from 'next/image';
import {
  CartProductType,
  SelectedItemType,
} from '@/app/product/[productId]/ProductDetails';

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
    <div className='flex flex-col items-start'>
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
              className={`h-12 w-12 aspect-square rounded-full flex items-center justify-center ${
                cartProduct.selectedItem.color === item.color
                  ? 'border-2 border-amber-400'
                  : 'border-none'
              }`}
            >
              <Image
                src={item.image}
                alt={item.color}
                height={40}
                width={40}
                className='rounded-full bg-white'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetColor;
