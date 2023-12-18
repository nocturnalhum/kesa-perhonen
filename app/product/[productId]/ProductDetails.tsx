'use client';

import Button from '@/app/components/Button';
import ProductImage from '@/app/components/products/ProductImage';
import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import { useCart } from '@/hooks/useCart';
import { Rating } from '@mui/material';
import Link from 'next/link';
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
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  inStock: number;
  image: string;
};

const Horizontal = () => {
  return <hr className='w-[30%] my-2' />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { cartProducts, handleAddProductToCart } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product?.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.items[0] },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === cartProduct.id + cartProduct.selectedImg.colorCode
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, cartProduct]);

  const productRating =
    product.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews?.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value, quantity: 1 };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity >= cartProduct.selectedImg.inStock) {
      return toast.error('Maximum quantity reached');
    }
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity + 1,
      };
    });
  }, [cartProduct]);

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
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className='flex flex-col gap-1 text-slate-500 text-sm'>
        <h2 className='text-3xl font-medium to-sky-700 capitalize'>
          {product.name}
        </h2>
        <div className='flex items-center gap-2'>
          <Rating value={productRating} precision={0.5} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className='text-justify'>{product.description}</div>
        <Horizontal />
        <div className='capitalize'>
          <span className='font-semibold uppercase'>category: </span>
          {product.category}
        </div>
        <div className='capitalize'>
          <span className='font-semibold uppercase'>brand: </span>
          {product.brand}
        </div>
        <div
          className={`capitalize ${
            cartProduct.selectedImg.inStock > 5
              ? 'text-teal-400'
              : 'text-rose-400'
          }`}
        >
          {cartProduct.selectedImg.inStock > 5
            ? 'in stock'
            : cartProduct.selectedImg.inStock > 0
            ? `Only ${cartProduct.selectedImg.inStock} left in stock.`
            : 'out of stock'}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <div>
              <SetColor
                cartProduct={cartProduct}
                items={product.items}
                handleColorSelect={handleColorSelect}
              />
            </div>
            <Horizontal />
            <p className='mb-2 text-slate-500 flex items-center gap-1'>
              <MdCheckCircle size={20} className='text-teal-400' />
              <span>Product added to cart</span>
            </p>
            <div className='max-w-xs'>
              <Button
                label='View Cart'
                outline
                onClick={() => {
                  router.push('/cart');
                }}
              />
              <div
                onClick={() => router.back()}
                className='text-slate-500 flex items-center gap-1 mt-2 cursor-pointer'
              >
                <MdArrowBack />
                <span>Continue Shopping</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <SetColor
                cartProduct={cartProduct}
                items={product.items}
                handleColorSelect={handleColorSelect}
              />
            </div>
            <Horizontal />
            <div>
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
            </div>
            <Horizontal />
            <div className='max-w-xs'>
              <Button
                outline
                disabled={cartProduct.selectedImg.inStock < 1}
                label={
                  cartProduct.selectedImg.inStock < 1
                    ? 'Out of Stock'
                    : 'Add To Cart'
                }
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
