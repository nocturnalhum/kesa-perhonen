'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import Button from '../components/forms/Button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatPrice';
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const formattedPrice = formatPrice(cartTotalAmount * 1.13);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (!stripe || !elements) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (result.error) {
        toast.error(`Payment Error: ${result.error.message}`);
      } else {
        toast.success('Checkout Success');
        handleClearCart();
        handleSetPaymentSuccess(true);
        handleSetPaymentIntent(null);
      }
    } catch (error) {
      console.error('Unexpected error during payment:', error);
      toast.error('Unexpected error during payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id='payment-form'>
      <div className='mb-6'>
        <Heading title='Enter your details to complete checkout' />
      </div>
      <h2 className='font-semibold mb-2'>Address Information</h2>
      <AddressElement
        options={{ mode: 'shipping', allowedCountries: ['CA', 'US'] }}
      />
      <h2 className='font-semibold mt-4 mb-2'>Payment Information</h2>
      <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />
      <div className='py-4 text-center text-slate-700 text-xl font-bold'>
        Total with tax: {formattedPrice}
      </div>
      <Button
        label={isLoading ? 'Processing' : 'Pay now'}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
