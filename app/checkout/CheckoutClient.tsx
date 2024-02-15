'use client';

import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutClient = () => {
  const { shoppingCart, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const router = useRouter();

  console.log('shoppingCart', shoppingCart);
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

  return <div>CheckoutClient</div>;
};

export default CheckoutClient;
