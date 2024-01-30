'use client';

import { formatPrice } from '@/utils/formatPrice';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { MdArrowBack, MdCheckCircle } from 'react-icons/md';
import SetColor from './SetColor';
import SetQuantity from './SetQuantity';
import Button from '@/app/components/forms/Button';
import ProductImage from './ProductImage';
import { useCart } from '@/hooks/useCart';
import SetSize from './SetSize';

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  cartProductId: string;
  id: string;
  name: string;
  description: string;
  category: string[];
  quantity: number;
  selectedItem: SelectedItemType;
};

export type SelectedItemType = {
  color: string;
  colorCode: string;
  image: string;
  itemDetail: SizeType;
};

export type SizeType = {
  size: string[];
  price: number;
  discount: number;
  inventory: number;
};

const Horizontal = () => {
  return <hr className='w-[30%] my-2' />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, shoppingCart } = useCart();

  const router = useRouter();

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    cartProductId: uuidv4(),
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    quantity: 1,
    selectedItem: {
      color: product.items[0].color,
      colorCode: product.items[0].colorCode,
      image: product.items[0].image,
      itemDetail: {
        ...product.items[0].sizes[0],
      },
    },
  });

  // ==========================================================================
  // ========<<< Calculate Product Rating >>>==================================
  // ==========================================================================
  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  // ==========================================================================
  // ========<<< Handle Size Select >>>========================================
  // ==========================================================================
  const handleSizeSelect = useCallback(
    (item: SizeType) => {
      const updatedSelectedItem = {
        ...cartProduct.selectedItem,
        itemDetail: item,
      };
      setCartProduct((prev) => {
        return { ...prev, selectedItem: updatedSelectedItem };
      });

      return;
    },
    [cartProduct.selectedItem]
  );

  // ==========================================================================
  // ========<<< Handle Color Select >>>=======================================
  // ==========================================================================
  const handleColorSelect = useCallback(
    (item: SelectedItemType) => {
      const { color, colorCode, image } = item;
      const updatedItem = {
        ...cartProduct.selectedItem,
        color,
        colorCode,
        image,
      };
      setCartProduct((prev) => {
        return { ...prev, selectedItem: updatedItem };
      });
    },
    [cartProduct.selectedItem]
  );

  // ==========================================================================
  // ========<<< Handle Quantity Increase >>>==================================
  // ==========================================================================
  const handleQtyIncrease = useCallback(() => {
    // if (cartProduct.quantity >= cartProduct.selectedItem.inventory) {
    //   return toast.error(
    //     `Sorry. We currently have ${cartProduct.selectedItem.inventory} in stock.`,
    //     {
    //       id: 'quantity_limit',
    //       duration: 1000,
    //     }
    //   );
    // }
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity + 1,
      };
    });
  }, []);

  // ==========================================================================
  // ========<<< Handle Quantity Decrease >>>==================================
  // ==========================================================================

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity > 1 ? prev.quantity - 1 : prev.quantity,
      };
    });
  }, []);

  // ==========================================================================
  // ==========================================================================

  return (
    <>
      <div
        onClick={() => router.back()}
        className='flex items-center font-semibold gap-1 pb-3 text-slate-500 duration-300 hover:tracking-wider cursor-pointer'
      >
        <MdArrowBack size={20} /> Back
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
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
            <SetSize
              cartProduct={cartProduct}
              items={product.items}
              handleSizeSelect={handleSizeSelect}
            />
            {/* ========<<< In Stock >>>========================================= */}
            <div>In Stock</div>
            <Horizontal />
            {/* ========<<< Set Color >>>====================================== */}
            <SetColor
              cartProduct={cartProduct}
              items={product.items}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            {/* ========<<< Set Quantity >>>=================================== */}
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            {/* ========<<< Add To Cart Button >>>============================= */}
            <div className='max-w-80'>
              <Button
                label='Add To Cart'
                onClick={() => {
                  handleAddProductToCart(cartProduct);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
