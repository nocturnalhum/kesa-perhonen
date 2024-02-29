'use client';

import { categories } from '@/utils/categories';
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import Logo from './Logo';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const SearchMenu = () => {
  const [showSearch, setShowSearch] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setShowSearch(false);
    if (!data.searchTerm) return router.push('/');
    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: { searchTerm: data.searchTerm },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  // ==========================================================================
  // =========<<< Category Handler >>>=========================================
  // ==========================================================================
  const handleClick = (label: string) => {
    setShowSearch(false);
    if (label === 'All') {
      router.push('/');
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };
      const url = queryString.stringifyUrl(
        {
          url: '/',
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );
      router.push(url);
    }
  };

  // ==========================================================================
  // =========<<< Toggle Search >>>============================================
  // ==========================================================================
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <>
      <div className='flex items-center md:hidden'>
        <button onClick={toggleSearch}>
          <IoSearchOutline size={24} />
        </button>
      </div>
      <div
        className={`fixed left-0 h-[100dvh] w-screen z-50 bg-slate-300/80 backdrop-blur-md duration-300 ease-in-out ${
          showSearch ? 'top-0' : 'top-[100dvh]'
        }`}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('searchTerm')}
              autoComplete='off'
              type='text'
              placeholder='What are you looking for?'
              className='w-full p-4 focus:outline-none'
            />
          </form>
          <button
            onClick={() => setShowSearch(false)}
            className='absolute z-50 top-4 right-5 text-sm text-white bg-slate-500 px-2 py-1 rounded-md'
          >
            Cancel
          </button>
        </div>

        <div className='flex justify-center w-full pt-8'>
          <Logo />
        </div>
        <div className='flex flex-col items-start gap-6 p-8'>
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.category)}
              className='text-base capitalize font-medium'
            >
              <h1>{item.category}</h1>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchMenu;
