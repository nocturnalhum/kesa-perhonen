'use client';

import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';
import { useCart } from '@/hooks/useCart';

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const { handleSetPaymentIntent, handleSetCartToLocalStorage } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      axios
        .post('/api/login', { userId: currentUser.id })
        .then((res) => {
          const { data } = res;
          handleSetPaymentIntent(data.paymentIntentId);
          handleSetCartToLocalStorage(data.products);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      router.replace('/');
      router.refresh();
    }
  }, [
    currentUser,
    handleSetPaymentIntent,
    handleSetCartToLocalStorage,
    router,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.back();
        router.refresh();
        toast.success('Logged In');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className='text-center'>Logged In. Redirecting...</p>;
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <Heading title='Sign in to Account' />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <Button
        outline
        label='Continue with GitHub'
        icon={AiOutlineGithub}
        onClick={() => {
          signIn('github');
        }}
      />
      <hr className='bg-slate-300 w-full h-px' />

      <Input
        id='email'
        label='email'
        type='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
        onKeyDown={handleKeyPress}
      />
      <Button
        label={isLoading ? 'Loading' : 'Login'}
        onClick={handleSubmit(onSubmit)}
      />
      <div className='flex items-center justify-between w-full px-4'>
        <p className='text-sm underline cursor-pointer'>Forgot password?</p>
        <p className='text-sm'>
          {`Don't have an account?`}
          <Link href='/register' className='underline ml-2'>
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
