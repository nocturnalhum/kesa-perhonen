import { Noto_Serif_JP } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { CiMenuBurger } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import Container from '../Container';
import Categories from './Categories';
import SearchBar from './SearchBar';

const noto = Noto_Serif_JP({
  subsets: [],
  weight: ['600'],
});

const NavBar = async () => {
  return (
    <header className='sticky w-full bg-slate-50 z-30 shadow-sm'>
      <Container>
        <div className='flex flex-col pt-2'>
          <div className='flex items-center justify-between h-full w-full'>
            {/* =====<<< MENU BUTTON &  SEARCH ICON>>>========================== */}
            <div className='flex  items-center text-lg cursor-pointer lg:hidden'>
              <button className='cursor-pointer'>
                <CiMenuBurger />
              </button>
              <button className='pl-4 cursor-pointer bg-transparent md:hidden'>
                <IoSearchOutline size={24} className='cursor-pointer' />
              </button>
            </div>

            <div className='flex justify-center items-center w-full'>
              {/* =====<<< SHOP LOGO >>>=========================================== */}
              <div className='relative w-56 h-10'>
                <Link href='/'>
                  <h1
                    className={`${noto.className} absolute top-1.5 left-2.5 text-xl font-semibold text-center w-full z-20 hover:text-slate-950`}
                  >
                    kesä perhonen
                  </h1>
                </Link>
                <Image
                  priority
                  src='/butterfly_logo.gif'
                  alt='butterfly logo'
                  height={100}
                  width={100}
                  className='absolute top-0 left-8 w-full h-full'
                />
              </div>
              {/* =====<<< SEARCH BAR >>>========================================== */}
              <SearchBar />
            </div>

            {/* =====<<< SHOPPING CART >>>======================================= */}
            <div className='flex items-center'>
              <Link href='/cart' className='cursor-pointer'>
                CartCount
              </Link>
              <div className='ml-3'>UserMenu</div>
            </div>
          </div>
          {/* =====<<< SHOPPING CATEGORIES >>>================================== */}
          <Categories />
        </div>
      </Container>
    </header>
  );
};

export default NavBar;
