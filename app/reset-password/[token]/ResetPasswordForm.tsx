'use client';

import Heading from '@/app/components/Heading';
import Button from '@/app/components/forms/Button';
import Input from '@/app/components/forms/Input';
import { SafeUser } from '@/types';
import { User } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface ResetPasswordFormProps {
  token: string;
  currentUser?: SafeUser | null;
}
const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
  currentUser,
}) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>(null);

  // Reroute to Home if user is already logged in:
  useEffect(() => {
    if (currentUser) {
      router.replace('/');
      router.refresh();
    }
  }, [currentUser, router]);

  // Check if token is valid and not expired:
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post('/api/verify-token', { token });

        if (res.status === 400) {
          setError('Invalid token or has expired');
          setVerified(true);
        }
        if (res.status === 200) {
          setError('');
          setVerified(true);
          const userData = await res.data.user;
          setUser(userData);
        }
      } catch (error: any) {
        setError('Invalid token or has expired');
        toast.error(error.response.data.message);
        setVerified(true);
        console.log(error.response.data.message);
      }
    };
    verifyToken();
  }, [token]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { password: '', confirmPassword: '' },
  });

  const password = watch('password', '');

  const validatePassword = (value: string) => {
    return value.length > 5 || 'Password must be at least 6 characters';
  };

  const validatePasswordMatch = (value: string) => {
    return value === password || 'Passwords do not match';
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    const res = axios.put('/api/verify-token', {
      email: user?.email,
      password: data.password,
    });
    res
      .then((response) => {
        toast.success(response.data.message);
        setError('');
        router.push('/login');
      })
      .catch((error) => {
        console.log('ERROR: ', error);
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title='Reset Password' />

      <hr className='bg-slate-300 w-full h-[1.5px]' />
      {error && (
        <div className='flex flex-col text-center gap-5 py-5'>
          <p
            className='text-lg
           text-slate-500 font-semibold'
          >
            The reset password token is invalid or has expired.
          </p>

          <Link
            href='/forgot-password'
            className='text-base text-blue-500 hover:underline'
          >
            Click here to request a new reset password token
          </Link>
        </div>
      )}

      {!error && (
        <>
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
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            validate={validatePasswordMatch}
          />
          <Button
            label={isLoading ? 'Loading' : 'Reset Password'}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading || !!error}
          />
        </>
      )}
    </>
  );
};

export default ResetPasswordForm;
