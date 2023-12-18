'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';
import Heading from '../components/Heading';
import Input from '../components/inputs/Inputs';
import Button from '../components/Button';

interface RegisterFormProps {
  currentUser: SafeUser | null | undefined;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/cart');
      router.refresh();
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log('Submit', data);
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
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn('google');
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
      />
      <Input
        id='email'
        label='email'
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
      />
      <Button
        label={isLoading ? 'Loading' : 'Sign Up'}
        onClick={handleSubmit(onSubmit)}
      />
      <p className='text-sm'>
        Already have an account?
        <Link href='/login' className='underline ml-2'>
          Log In
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
