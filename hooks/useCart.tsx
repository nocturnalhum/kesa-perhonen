import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { createContext, useCallback, useContext, useState } from 'react';
import toast from 'react-hot-toast';

type CartContextType = {
  cartTotalQty: number;
  shoppingCart: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
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

  // ==========================================================================
  // ========<<< Handle Add Product to Cart >>>================================
  // ==========================================================================
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    console.log('handleAddProductToCart-product', product);
    setShoppingCart((prev) => {
      return prev ? [...prev, product] : [product];
    });
    // const cartProduct = {
    //   ...product,
    //   id: `${product.id}-${product.selectedItem.colorCode}-${product.selectedItem.size}`,
    // };
    // setShoppingCart((prev) => {
    //   let updatedCart;
    //   if (prev) {
    //     updatedCart = [...prev, cartProduct];
    //   } else {
    //     updatedCart = [cartProduct];
    //   }
    //   localStorage.setItem('shopCartItems', JSON.stringify(updatedCart));

    //   return updatedCart;
    // });
    // toast.success('Product added to cart');
  }, []);

  // ==========================================================================
  // ========<<< CartContextProvider Values >>>================================
  // ==========================================================================
  const value = {
    cartTotalQty,
    shoppingCart,
    handleAddProductToCart,
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
