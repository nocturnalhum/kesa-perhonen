'use client';

import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

type CartContextType = {
  cartTotalQty: number;
  shoppingCart: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [shoppingCart, setShoppingCart] = useState<CartProductType[] | null>(
    null
  );

  console.log('shopCartItems', shoppingCart);

  // ==========================================================================
  // ========<<< Get Shopping Cart and Payment Intent from Local Storage >>>===
  // ==========================================================================
  useEffect(() => {
    const cartItems: any = localStorage.getItem('shopCartItems');
    if (cartItems) {
      const shopLocalStorage: CartProductType[] | null = JSON.parse(cartItems);
      setShoppingCart(shopLocalStorage);
    }
  }, []);

  // ==========================================================================
  // ========<<< Handle Add Product to Cart >>>================================
  // ==========================================================================
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    // Add unique cartProductId for each ShoppingCart item:
    const updateCardProductId = { ...product, cartProductId: uuidv4() };

    setShoppingCart((prev) => {
      const updatedCart = prev
        ? [...prev, updateCardProductId]
        : [updateCardProductId];
      localStorage.setItem('shopCartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success('Product added to cart');
  }, []);

  // ==========================================================================
  // ========<<< Handle Remmove Cart Product >>>===============================
  // ==========================================================================
  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (shoppingCart) {
        const filteredCartProducts = shoppingCart.filter(
          (item) =>
            item.id !== product.id ||
            item.selectedItem.color !== product.selectedItem.color
        );
        setShoppingCart(filteredCartProducts);
        toast.success('Product removed');
        localStorage.setItem(
          'shopCartItems',
          JSON.stringify(filteredCartProducts)
        );
      }
    },
    [shoppingCart]
  );

  // ==========================================================================
  // ========<<< CartContextProvider Values >>>================================
  // ==========================================================================
  const value = {
    cartTotalQty,
    shoppingCart,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  };
  return <CartContext.Provider value={value} {...props} />;
};

// ==========================================================================
// ========<<< Export UseCart Context >>>====================================
// ==========================================================================
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};
