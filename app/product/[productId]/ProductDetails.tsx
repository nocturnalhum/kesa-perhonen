'use client';

import { formatPrice } from '@/utils/formatPrice';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowBack, MdCheckCircle } from 'react-icons/md';

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string[];
  selectedItem: SelectedItemType;
  quantity: number;
};

export type SelectedItemType = {
  color: string;
  colorCode: string;
  image: string;
  size: string[];
  price: number;
  discount: number;
  inventory: number;
};

const Horizontal = () => {
  return <hr className='w-[30%] my-2' />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    selectedItem: {
      color: product.items[0].color,
      colorCode: product.items[0].colorCode,
      image: product.items[0].image,
      size: product.items[0].sizes[0].size[1],
      price: product.items[0].sizes[0].price,
      discount: product.items[0].sizes[0].discount,
      inventory: product.items[0].sizes[0].inventory,
    },
    quantity: 1,
  });

  // ==========================================================================
  // ========<<< Calculate Product Rating >>>==================================
  // ==========================================================================
  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  return (
    <>
      <div
        onClick={() => router.back()}
        className='flex items-center font-semibold gap-1 pb-3 text-slate-700 cursor-pointer'
      >
        <MdArrowBack size={20} /> Back
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        <div className=''>Images</div>
        <div className='flex flex-col gap-1 text-slate-500 text-sm'>
          {/* ========<<< Product Name >>>======================================= */}
          <h2 className='text-3xl font-medium capitalize'>{product?.name}</h2>
          {/* ========<<< Rating >>>============================================= */}
          <div className='flex items-center gap-2'>
            <Rating value={productRating} precision={0.5} readOnly />
            <div>{product?.reviews.length} reviews</div>
          </div>
          <Horizontal />
          {/* ========<<< Description >>>======================================== */}
          <div className='text-justify'>{product?.description}</div>
          <Horizontal />
          <div className='space-y-3'>
            {/* ========<<< Price >>>============================================ */}
            Price
            {/* ========<<< Category >>>========================================= */}
            <div className='flex capitalize'>
              <span className='font-semibold'>category:</span>
              <span className='flex  text-s font-normal ml-2'>
                {product.category.map((item: string, index: number) => {
                  return (
                    <div key={index}>
                      <span className='mx-0.5'>{index > 0 ? ' / ' : ''}</span>
                      {item}
                    </div>
                  );
                })}
              </span>
            </div>
            {/* ========<<< Size >>>============================================ */}
            <div>Size</div>
            {/* ========<<< In Stock >>>========================================= */}
            <div>In Stock</div>
            <Horizontal />
            {/* ========<<< Set Color >>>====================================== */}
            <div>Set Color</div>
            <Horizontal />
            {/* ========<<< Set Quantity >>>=================================== */}
            <div>Set Quantity</div>
            <Horizontal />
            {/* ========<<< Add To Cart Button >>>============================= */}
            <div>Add To Cart Button</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
