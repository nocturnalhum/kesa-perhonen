'use client';

import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { SafeUser } from '@/types';

interface ForgetPasswordFormProps {
  currentUser: SafeUser | null;
}

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({
  currentUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.replace('/');
      router.refresh();
    }
  }, [currentUser, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: '' } });

  const validateEmail = (value: string) => {
    return emailRegex.test(value) || 'Email is not valid';
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res = await axios
      .post('/api/reset-password', data)
      .then((res) => {
        toast.success(res.data.message);
        router.push('/login');
      })
      .catch((error) => {
        console.log('TEST: ', error.response.data.message);
        toast.error('Error resetting password', {
          id: 'passwordResetError',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });

    return res;
  };

  return (
    <>
      <Heading title='Forgot Password' />

      <Input
        id='email'
        label='Email'
        type='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={validateEmail}
        onKeyDown={handleKeyPress}
      />

      <Button
        label={isLoading ? 'Loading' : 'Reset Password'}
        onClick={handleSubmit(onSubmit)}
      />
      <div className='flex items-center justify-end w-full text-sm px-4'>
        <Link
          href={'/login'}
          className='text-slate-500 flex items-center gap-1 mt-2 hover:scale-105 duration-300'
        >
          <MdArrowBack size={20} />
          <span className='underline'>Back to Login</span>
        </Link>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
