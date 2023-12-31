'use client';

import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems');
    if (cartItems) {
      const cartProductsLocalStore: CartProductType[] | null =
        JSON.parse(cartItems);
      setCartProducts(cartProductsLocalStore);
    }
    const shopPaymentIntent: any = localStorage.getItem('shopPaymentIntent');
    const paymentIntent: string | null = JSON.parse(shopPaymentIntent);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  // ==========================================================================
  // ========<<< Handle Add Cart Product >>>===================================
  // ==========================================================================
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    const cartProduct = {
      ...product,
      id: product.id + product.selectedImg.colorCode,
    };
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, cartProduct];
      } else {
        updatedCart = [cartProduct];
      }
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));

      return updatedCart;
    });
    toast.success('Product added to cart');
  }, []);

  // ==========================================================================
  // ========<<< Handle Remmove Cart Product >>>===============================
  // ==========================================================================
  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredCartProducts = cartProducts.filter(
          (item) =>
            item.id !== product.id ||
            item.selectedImg.color !== product.selectedImg.color
        );
        setCartProducts(filteredCartProducts);
        toast.success('Product removed');
        localStorage.setItem(
          'eShopCartItems',
          JSON.stringify(filteredCartProducts)
        );
      }
    },
    [cartProducts]
  );

  // ==========================================================================
  // ========<<< Handle Cart Qty Increase >>>==================================
  // ==========================================================================
  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity >= product.selectedImg.inStock) {
        return toast.error(
          `Sorry. We only have ${product.selectedImg.inStock} in stock.`
        );
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          ++updatedCart[existingIndex].quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  // ==========================================================================
  // ========<<< Handle Cart Qty Decrease >>>==================================
  // ==========================================================================
  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity <= 1) {
        return toast.error(
          'Minimum quantity reached.\n Click Remove to remove product.'
        );
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          --updatedCart[existingIndex].quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  // ==========================================================================
  // ========<<< Clear Cart >>>================================================
  // ==========================================================================
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem('eShopCartItems', JSON.stringify(null));
  }, []);

  // ==========================================================================
  // ========<<< Handle Set Payment Intent >>>=================================
  // ==========================================================================

  const handleSetPaymentIntent = useCallback((value: string | null) => {
    setPaymentIntent(value);
    localStorage.setItem('shopPaymentIntent', JSON.stringify(value));
  }, []);

  // ==========================================================================
  // ========<<< Cart Context Values >>>=======================================
  // ==========================================================================
  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};
