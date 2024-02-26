'use client';

import toast from 'react-hot-toast';
import SetSize from './SetSize';
import SetColor from './SetColor';
import SetQuantity from './SetQuantity';
import ProductImage from './ProductImage';
import Button from '@/app/components/forms/Button';
import { formatPrice } from '@/utils/formatPrice';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { MdArrowBack, MdCheckCircle } from 'react-icons/md';
import { useCart } from '@/hooks/useCart';

interface ProductDetailsProps {
  product: any;
}

export type ItemType = {
  color: string;
  image: string;
  sizes: SizeType[];
};

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
  image: string;
  itemDetail: SizeType;
};

export type SizeType = {
  size: string;
  price: number;
  discount: number;
  inventory: number;
};

const Horizontal = () => {
  return <hr className='w-[30%] my-2' />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, shoppingCart } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const router = useRouter();

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    cartProductId: '',
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    quantity: 1,
    selectedItem: {
      color: product.items[0].color,
      image: product.items[0].image,
      itemDetail: {
        ...product.items[0].sizes[0],
      },
    },
  });

  useEffect(() => {
    setIsProductInCart(false);
    if (shoppingCart) {
      const existingIndex = shoppingCart.findIndex(
        (item) =>
          item.id === cartProduct.id &&
          item.selectedItem.color === cartProduct.selectedItem.color &&
          item.selectedItem.itemDetail.size[0] ===
            cartProduct.selectedItem.itemDetail.size[0]
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [shoppingCart, cartProduct]);

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

      // Update Quantity to prevent orders exceeding an inventory stock:
      const updateQuantity =
        item.inventory < cartProduct.quantity
          ? item.inventory === 0
            ? 1
            : item.inventory
          : cartProduct.quantity;

      setCartProduct((prev) => {
        return {
          ...prev,
          selectedItem: updatedSelectedItem,
          quantity: updateQuantity,
        };
      });
    },
    [cartProduct]
  );

  // ==========================================================================
  // ========<<< Handle Color Select >>>=======================================
  // ==========================================================================
  const handleColorSelect = useCallback(
    (item: any) => {
      const { color, image, sizes } = item;
      const updateItemDetail = sizes.find(
        (sizeDetail: SizeType) =>
          sizeDetail.size[0] === cartProduct.selectedItem.itemDetail.size[0]
      );

      // Update Quantity to prevent orders exceeding an inventory stock:
      const updateQuantity =
        updateItemDetail.inventory < cartProduct.quantity
          ? updateItemDetail.inventory === 0
            ? 1
            : updateItemDetail.inventory
          : cartProduct.quantity;

      const updatedItem = {
        ...cartProduct.selectedItem,
        color,
        image,
        itemDetail: updateItemDetail,
      };
      setCartProduct((prev) => {
        return { ...prev, selectedItem: updatedItem, quantity: updateQuantity };
      });
    },
    [cartProduct]
  );

  // ==========================================================================
  // ========<<< Handle Quantity Increase >>>==================================
  // ==========================================================================
  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity >= cartProduct.selectedItem.itemDetail.inventory) {
      return toast.error(
        `Sorry. We currently have ${cartProduct.selectedItem.itemDetail.inventory} in stock.`,
        {
          id: 'quantity_limit',
          duration: 1000,
        }
      );
    }
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity + 1,
      };
    });
  }, [cartProduct]);

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
            <div className={`flex gap-4 font-bold text-lg text-slate-600`}>
              <div
                className={`${
                  cartProduct.selectedItem.itemDetail.discount > 0 &&
                  'line-through'
                }`}
              >
                {formatPrice(cartProduct.selectedItem.itemDetail.price)}
              </div>
              <div
                className={`${
                  cartProduct.selectedItem.itemDetail.discount > 0
                    ? 'text-rose-500'
                    : 'hidden'
                }`}
              >
                {formatPrice(
                  cartProduct.selectedItem.itemDetail.price *
                    (1 - cartProduct.selectedItem.itemDetail.discount / 100)
                )}
              </div>
            </div>
            {/* ========<<< In Stock >>>========================================= */}
            <div
              className={`capitalize ${
                cartProduct.selectedItem.itemDetail.inventory > 5
                  ? 'text-teal-400'
                  : 'text-rose-400'
              }`}
            >
              {cartProduct.selectedItem.itemDetail.inventory > 5
                ? 'in stock'
                : cartProduct.selectedItem.itemDetail.inventory > 0
                ? `Only ${cartProduct.selectedItem.itemDetail.inventory} left in stock.`
                : 'out of stock'}
            </div>
            <Horizontal />
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
            <Horizontal />

            {isProductInCart ? (
              // {/* ========<<< Set Color >>>====================================== */}
              <>
                <div>
                  <SetColor
                    cartProduct={cartProduct}
                    items={product.items}
                    handleColorSelect={handleColorSelect}
                  />
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
                      className='text-slate-700 flex items-center gap-1 mt-2 cursor-pointer'
                    >
                      <MdArrowBack />
                      <span>Continue Shopping</span>
                    </div>
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
                {/* ========<<< Set Quantity >>>=================================== */}
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
                    disabled={cartProduct.selectedItem.itemDetail.inventory < 1}
                    label={
                      cartProduct.selectedItem.itemDetail.inventory < 1
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
      </div>
    </>
  );
};

export default ProductDetails;
