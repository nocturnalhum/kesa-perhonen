import React from 'react';
import Image from 'next/image';
import { Noto_Serif_JP } from 'next/font/google';
import CartCount from './CartCount';
import Container from '../Container';
import { CiMenuBurger } from 'react-icons/ci';
import { GoChevronDown } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import Link from 'next/link';

const noto = Noto_Serif_JP({ subsets: ['latin'], weight: ['600'] });

const Navbar = () => {
  return (
    <header className='sticky px-10 py-2 w-full bg-slate-50 z-30 shadow-sm'>
      <Container>
        <div className='flex items-center justify-between h-full w-full'>
          {/* =====<<< MENU BUTTON >>>========================================= */}
          <div className='text-lg cursor-pointer desktop:hidden'>
            <CiMenuBurger />
          </div>
          {/* =====<<< SEARCH ICON >>>========================================= */}
          <button className='absolute left-8 top-4 pl-4 cursor-pointer bg-transparent laptop:hidden'>
            <IoSearchOutline size={28} />
          </button>
          {/* =====<<< SHOP LOGO >>>=========================================== */}
          <div className='relative w-56 h-10'>
            <Link href='/'>
              <h1
                className={`${noto.className} absolute top-1.5 left-2.5 text-xl font-semibold text-center w-full z-20 laptop:text-lg`}
              >
                kesä perhonen
              </h1>
            </Link>
            <Image
              src='/butterfly_logo.gif'
              alt='butterfly logo'
              height={100}
              width={100}
              className='absolute top-0 left-8 w-full
            h-full'
            />
          </div>
          {/* =====<<< SEARCH BAR >>>========================================== */}
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

          {/* =====<<< SHOPPING CART >>>======================================= */}

          <CartCount />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
