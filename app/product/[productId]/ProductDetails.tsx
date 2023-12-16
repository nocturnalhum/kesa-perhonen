'use client';

import Button from '@/app/components/Button';
import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/setQuantity';
import { Rating } from '@mui/material';
import { useCallback, useState } from 'react';

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className='w-[30%] my-2' />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product?.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const productRating =
    product.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews?.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity < 25 ? prev.quantity + 1 : prev.quantity,
      };
    });
  }, []);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity > 1 ? prev.quantity - 1 : prev.quantity,
      };
    });
  }, []);

  return (
    <div className='grid grid-cols-1 tablet:grid-cols-2 gap-12'>
      <div>Images</div>
      <div className='flex flex-col gap-1 text-slate-500 text-sm'>
        <h2 className='text-3xl font-medium to-sky-700'>{product.name}</h2>
        <div className='flex items-center gap-2'>
          <Rating value={productRating} precision={0.5} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className='text-justify'>{product.description}</div>
        <Horizontal />
        <div>
          <span className='font-semibold uppercase'>category: </span>
          {product.category}
        </div>
        <div>
          <span className='font-semibold uppercase'>brand: </span>
          {product.brand}
        </div>
        <div
          className={`capitalize ${
            product.inStock > 5 ? 'text-teal-400' : 'text-rose-400'
          }`}
        >
          {product.inStock > 5
            ? 'in stock'
            : product.inStock > 0
            ? `Only ${product.inStock} left in stock.`
            : 'out of stock'}
        </div>
        <Horizontal />
        <div>
          <SetColor
            cartProduct={cartProduct}
            images={product.images}
            handleColorSelect={handleColorSelect}
          />
        </div>
        <Horizontal />
        {/* <div className='font-semibold uppercase'>quantity: </div> */}
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
        <Horizontal />
        <div className='max-w-xs'>
          <Button outline label='Add To Cart' onClick={() => () => {}} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
