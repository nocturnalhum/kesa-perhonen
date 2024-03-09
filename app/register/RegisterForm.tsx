'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';
import Heading from '../components/Heading';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { SafeUser } from '@/types';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import { FcGoogle } from 'react-icons/fc';

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/');
      router.refresh();
    }
  }, [currentUser, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const password = watch('password', '');

  const validateName = (value: string) => {
    return value.length > 2 || 'Name must be at least 3 characters';
  };

  const validatePassword = (value: string) => {
    return value.length > 5 || 'Password must be at least 6 characters';
  };

  const validatePasswordMatch = (value: string) => {
    return value === password || 'Passwords do not match';
  };

  const validateEmail = (value: string) => {
    return emailRegex.test(value) || 'Email is not valid';
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Account created');
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.back();
            router.refresh();
            toast.success('Logged In');
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          id: 'emailAlreadyInUse',
        });
      })
      .finally(() => {
        data.password = '';
        data.confirmPassword = '';
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return <p className='text-center'>Logged In. Redirecting...</p>;
  }

  return (
    <>
      <Heading title='Sign up for an Account' />
      <Button
        outline
        label='Sign up with Google'
        icon={FcGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <Button
        outline
        label='Sign up with GitHub'
        icon={AiOutlineGithub}
        onClick={() => {
          signIn('github');
        }}
      />
      <hr className='bg-slate-300 w-full h-px' />
      <Input
        id='name'
        label='name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={validateName}
      />
      <Input
        id='email'
        label='email'
        type='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={validateEmail}
      />
      <Input
        id='password'
        label='password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={validatePassword}
      />
      <Input
        id='confirmPassword'
        label='confirm password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
        validate={validatePasswordMatch}
      />
      <Button
        label={isLoading ? 'Loading' : 'Sign Up'}
        onClick={handleSubmit(onSubmit)}
      />
      <div className='flex text-sm'>
        Already have an account?
        <Link href='/login'>
          <div className='underline ml-2 duration-300 hover:scale-105'>
            Log In
          </div>
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
