'use client';

import { CartProductType } from '@/app/product/[productId]/ProductDetails';

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const buttonStyles = 'border-[1.2px] border-slate-300 px-2 rounded';

const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className='flex gap-8 items-center'>
      {!cartCounter && <div className='font-semibold uppercase'>quantity</div>}
      <div className='flex gap-4 items-center text-base'>
        <button onClick={handleQtyDecrease} className={buttonStyles}>
          -
        </button>
        <div className='w-5 text-center'>{cartProduct.quantity}</div>
        <button onClick={handleQtyIncrease} className={buttonStyles}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
