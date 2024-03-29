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
  cartTotalAmount: number;
  shoppingCart: CartProductType[] | null;
  paymentIntent: string | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  handleSetPaymentIntent: (paymentIntentVal: string | null) => void;
  handleSetCartToLocalStorage: (products: CartProductType[]) => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  const [shoppingCart, setShoppingCart] = useState<CartProductType[] | null>(
    null
  );

  // ==========================================================================
  // ========<<< Get Shopping Cart and Payment Intent from Local Storage >>>===
  // ==========================================================================
  useEffect(() => {
    // Get Shopping Cart Items from Local Storage:
    const cartItems: any = localStorage.getItem('shopCartItems');
    if (cartItems) {
      const cartLocalStorage: CartProductType[] | null = JSON.parse(cartItems);
      setShoppingCart(cartLocalStorage);
    }

    // Get Payment Intent from Local Storage:
    const shopPaymentIntent: any = localStorage.getItem('shopPaymentIntent');
    if (shopPaymentIntent) {
      const paymentIntent: string | null = JSON.parse(shopPaymentIntent);
      setPaymentIntent(paymentIntent);
    }
  }, []);

  // ==========================================================================
  // ========<<< Update Shopping Cart Subtotal >>>=============================
  // ==========================================================================
  useEffect(() => {
    const getTotals = () => {
      if (shoppingCart) {
        const { total, qty } = shoppingCart?.reduce(
          (acc, item) => {
            const itemTotal =
              item.selectedItem.itemDetail.price *
              (1 - item.selectedItem.itemDetail.discount / 100) *
              item.quantity;
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
  }, [shoppingCart]);

  // ==========================================================================
  // ========<<< Handle Set Payment Intent To Local Storage >>>================
  // ==========================================================================
  const handleSetPaymentIntent = useCallback((payIntentVal: string | null) => {
    setPaymentIntent(payIntentVal);
    localStorage.setItem('shopPaymentIntent', JSON.stringify(payIntentVal));
  }, []);

  // ==========================================================================
  // ========<<< Handle Set Products To Local Storage >>>======================
  // ==========================================================================
  const handleSetCartToLocalStorage = useCallback(
    (products: CartProductType[]) => {
      products.forEach((product) => {
        setShoppingCart((prev) => {
          let updatedCart;
          if (prev) {
            // Check if product is already in cart:
            const index = prev.findIndex(
              (item) =>
                item.id === product.id &&
                item.selectedItem.color === product.selectedItem.color
            );
            if (index !== -1) {
              console.log('Already in cart');
              prev[index].quantity += product.quantity;
              updatedCart = [...prev];
            } else {
              console.log('Not in cart');
              updatedCart = [...prev, product];
            }
          } else {
            updatedCart = [product];
          }
          localStorage.setItem('shopCartItems', JSON.stringify(updatedCart));
          return updatedCart;
        });
      });
    },
    []
  );

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
    setCartTotalAmount(0);
    localStorage.setItem('shopCartItems', JSON.stringify(null));
  }, []);

  // ==========================================================================
  // ========<<< CartContextProvider Values >>>================================
  // ==========================================================================
  const value = {
    cartTotalQty,
    cartTotalAmount,
    shoppingCart,
    paymentIntent,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleSetPaymentIntent,
    handleSetCartToLocalStorage,
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
