'use client';

import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import Button from '../components/forms/Button';
import CheckoutForm from './CheckoutForm';
import { CartProductType } from '@prisma/client';

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
    // Create Payment Intent as soon as page loads:
    if (shoppingCart) {
      setLoading(true);
      setError(false);
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: shoppingCart,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push('/login');
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          console.log(error);
          toast.error('Something went wrong in CheckoutClient');
        });
    }
  }, [shoppingCart, paymentIntent, handleSetPaymentIntent, router]);

  useEffect(() => {
    if (paymentSuccess) {
      toast.success('Payment Success');
      // Update Inventory
      const updateInventory = async () => {
        try {
          const response = await fetch('/api/update-inventory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: cartInventory,
            }),
          });
          const data = await response.json();
          console.log('RETURNED DATA', data);
        } catch (error) {
          console.log(error);
        }
      };
      updateInventory();
    }
  }, [paymentSuccess, router, cartInventory]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  };

  const handleSetPaymentSuccess = useCallback(
    (value: boolean) => {
      setCartInventory(shoppingCart);
      setPaymentSuccess(value);
    },
    [shoppingCart]
  );

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
        <div className='text-center text-rose-800'>Something when wrong...</div>
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
