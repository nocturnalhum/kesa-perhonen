'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { CartProductType } from '@prisma/client';
import toast from 'react-hot-toast';
import CheckoutForm from './CheckoutForm';
import Button from '../components/forms/Button';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { shoppingCart, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cartInventory, setCartInventory] = useState<CartProductType[] | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (shoppingCart) {
        setLoading(true);
        setError(false);

        try {
          const res = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: shoppingCart,
              payment_intent_id: paymentIntent,
            }),
          });

          setLoading(false);

          if (res.status === 401) {
            return router.push('/login');
          }

          const data = await res.json();
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
          return data;
        } catch (error) {
          setError(true);
          console.error('Error in CheckoutClient: ', error);
          toast.error('Error in CheckoutClient');
        }
      }
    };

    fetchData();
  }, [shoppingCart, paymentIntent, router, handleSetPaymentIntent]);

  useEffect(() => {
    if (shoppingCart) {
      setCartInventory(shoppingCart);
    }
    const updateInventory = async () => {
      if (paymentSuccess) {
        try {
          const res = await fetch('/api/update-inventory', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cartInventory }),
          });
        } catch (error) {
          setError(true);
          console.error('Error in CheckoutClient Inventory Update: ', error);
          toast.error('Error in CheckoutClient Inventory Update');
        }
      }
    };
    updateInventory();
  }, [paymentSuccess, cartInventory, shoppingCart]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className='w-full'>
      {clientSecret && shoppingCart && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className='text-center'>Loading Checkout</div>}
      {error && (
        <div className='text-center text-rose-500'>Something when wrong...</div>
      )}
      {paymentSuccess && (
        <div className='flex items-center flex-col gap-4'>
          <div className='text-center text-teal-500'>Payment Success</div>
          <div className='w-full max-w-[220px]'>
            <Button
              label='View Your Orders'
              onClick={() => router.push('/orders')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
