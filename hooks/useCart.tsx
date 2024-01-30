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
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
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
          (item) => item.cartProductId !== product.cartProductId
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
  // ========<<< Handle Cart Qty Increase >>>==================================
  // ==========================================================================
  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity >= product.selectedItem.itemDetail.inventory) {
        return toast.error(
          `Sorry. We only have ${product.selectedItem.itemDetail.inventory} in stock.`,
          {
            id: 'limit_reached',
            duration: 2500,
          }
        );
      }

      if (shoppingCart) {
        updatedCart = [...shoppingCart];
        const existingIndex = shoppingCart.findIndex(
          (item) => item.cartProductId === product.cartProductId
        );

        if (existingIndex > -1) {
          ++updatedCart[existingIndex].quantity;
        }
        setShoppingCart(updatedCart);
        localStorage.setItem('shopCartItems', JSON.stringify(updatedCart));
      }
    },
    [shoppingCart]
  );

  // ==========================================================================
  // ========<<< Handle Cart Qty Decrease >>>==================================
  // ==========================================================================
  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity <= 1) {
        return toast.error("Click 'Remove' to remove product.", {
          id: 'remove',
          duration: 1000,
        });
      }

      if (shoppingCart) {
        updatedCart = [...shoppingCart];

        const existingIndex = shoppingCart.findIndex(
          (item) => item.cartProductId === product.cartProductId
        );

        if (existingIndex > -1) {
          --updatedCart[existingIndex].quantity;
        }
        setShoppingCart(updatedCart);
        localStorage.setItem('shopCartItems', JSON.stringify(updatedCart));
      }
    },
    [shoppingCart]
  );

  // ==========================================================================
  // ========<<< Handle Clear Cart >>>=========================================
  // ==========================================================================
  const handleClearCart = useCallback(() => {
    setShoppingCart(null);
    setCartTotalQty(0);
    localStorage.setItem('shopCartItems', JSON.stringify(null));
  }, []);

  // ==========================================================================
  // ========<<< CartContextProvider Values >>>================================
  // ==========================================================================
  const value = {
    cartTotalQty,
    shoppingCart,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
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
