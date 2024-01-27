'use client';

import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { IoSearchOutline } from 'react-icons/io5';

const SearchBar = () => {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='relative hidden h-12 mx-3 border border-slate-300 rounded-md md:block w-full'
    >
      <div className='flex h-full hover:shadow-lg hover:shadow-neutral-200/50'>
        <input
          {...register('searchTerm')}
          autoComplete='off'
          type='text'
          placeholder='What are you looking for?'
          className='tracking-wide pl-3 w-full ring-0 focus:outline-none'
        />
        <button
          type='submit'
          className='absolute top-0 right-0 h-full w-14 flex items-center justify-center text-white bg-black rounded-r-md'
        >
          <IoSearchOutline size={25} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
