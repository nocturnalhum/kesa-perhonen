'use client';

import { categories } from '@/utils/categories';
import React, { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import Logo from './Logo';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

const MenuButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  // ==========================================================================
  // =========<<< Category Handler >>>=========================================
  // ==========================================================================
  const handleClick = (label: string) => {
    setShowMenu(false);
    if (label === 'All') {
      router.push('/');
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
        console.log('Category - Params', currentQuery);
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
  // =========<<< Toggle Menu >>>==============================================
  // ==========================================================================
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <CiMenuBurger />
      </button>
      <div
        className={`fixed top-0 h-[100dvh] w-72 z-50 bg-slate-300/80 backdrop-blur-md duration-300 ease-in-out ${
          showMenu ? '-left-0' : '-left-[100vw]'
        }`}
      >
        <button
          onClick={() => setShowMenu(false)}
          className='absolute top-5 right-5 '
        >
          <IoCloseSharp size={30} />
        </button>
        <div className='flex flex-col items-start gap-6 p-8'>
          <Logo />
          {categories.map((item) => (
            <button
              onClick={() => handleClick(item.category)}
              key={item.id}
              className='text-base font-medium capitalize'
            >
              <h1>{item.category}</h1>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuButton;
