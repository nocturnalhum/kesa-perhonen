import React from 'react';
import Image from 'next/image';
import { Noto_Serif_JP } from 'next/font/google';
import CartCount from './CartCount';
import Container from '../Container';
import { CiMenuBurger } from 'react-icons/ci';
import { GoChevronDown } from 'react-icons/go';
import { PiEnvelopeThin } from 'react-icons/pi';
import { IoCart, IoSearchOutline } from 'react-icons/io5';

const noto = Noto_Serif_JP({ subsets: ['latin'], weight: ['600'] });

const Navbar = () => {
  return (
    <header className='sticky h-16 w-full bg-slate-50 z-30 shadow-sm'>
      <Container>
        <div className='flex items-center justify-between h-full w-full'>
          {/* =====<<< MENU BUTTON >>>========================================================================= */}
          <div className='text-lg cursor-pointer bg-transparent desktop:hidden'>
            <CiMenuBurger />
          </div>
          <div className='relative w-56 h-10'>
            <h1
              className={`${noto.className} absolute text-xl font-semibold text-center h-full w-full z-20`}
            >
              kesä perhonen
            </h1>
            <Image
              src='/butterfly_logo.gif'
              alt='butterfly logo'
              height={100}
              width={100}
              className='absolute -top-1 left-8 w-full
            h-full'
            />
          </div>
          {/* =====<<< SEARCH BAR >>>========================================================================= */}
          <div className='relative hidden h-12 mx-3 border border-slate-300 rounded-md laptop:block w-full'>
            <div className='flex h-full hover:shadow-lg hover:shadow-neutral-200/50'>
              <div className='flex justify-evenly items-center bg-neutral-200 h-full w-40 text-[0.9rem] text-gray-600 tracking-wide'>
                All categories
                <GoChevronDown size={15} />
              </div>
              <input
                type='text'
                placeholder='What are you looking for?'
                className='tracking-wide pl-2 w-full ring-0 focus:outline-none'
              />
              <div className='absolute top-0 right-0 h-full w-14 flex items-center justify-center text-white bg-[#7f0019] rounded-r-sm'>
                <IoSearchOutline size={25} />
              </div>
            </div>
          </div>
          <CartCount />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
