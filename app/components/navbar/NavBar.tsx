import { Amatic_SC } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { CiMenuBurger } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import Container from '../Container';
import Categories from './Categories';
import SearchBar from './SearchBar';
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import { getCurrentUser } from '@/actions/getCurrentUser';

const amaticSC = Amatic_SC({
  subsets: ['latin'],
  weight: '700',
  preload: false,
});

const NavBar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <header className='sticky w-full bg-slate-50 pb-2 z-30 px-2'>
      <Container>
        <div className='flex flex-col duration-300'>
          <div className='flex justify-between py-2'>
            {/* ===================================================================================== */}
            {/* ==========<<< ELEMENT 0: For Mobile >>>============================================== */}
            {/* ===================================================================================== */}

            {/* =====<<< MOBILE: MENU BUTTON &  SEARCH ICON>>>========================== */}
            <div className='flex items-center'>
              <div className='flex items-center text-lg cursor-pointer lg:hidden'>
                <button className='cursor-pointer'>
                  <CiMenuBurger />
                </button>
                <button className='pl-4 cursor-pointer bg-transparent md:hidden'>
                  <IoSearchOutline size={24} className='cursor-pointer' />
                </button>
              </div>
            </div>

            {/* ===================================================================================== */}
            {/* ==========<<< ELEMENT 1 >>>========================================================== */}
            {/* ===================================================================================== */}

            {/* =====<<< SHOP LOGO >>>=========================================== */}
            <div className='flex items-center'>
              <div className='relative flex items-center justify-center w-36 h-10'>
                <Image
                  priority
                  src='/butterfly_logo.gif'
                  alt='butterfly logo'
                  height={50}
                  width={250}
                  className='absolute -top-1 left-7 h-10 -z-10'
                />
                <Link href='/'>
                  <h1
                    className={`${amaticSC.className} text-3xl text-center w-fit hover:text-slate-950 cursor-pointer`}
                  >
                    kesä perhonen
                  </h1>
                </Link>
              </div>
            </div>

            {/* ===================================================================================== */}
            {/* ==========<<< ELEMENT 2 >>>========================================================== */}
            {/* ===================================================================================== */}

            {/* =====<<< SEARCH BAR >>>========================================== */}
            <div className='hidden md:flex flex-grow'>
              <SearchBar />
            </div>

            {/* ===================================================================================== */}
            {/* ==========<<< ELEMENT 3 >>>========================================================== */}
            {/* ===================================================================================== */}

            {/* =====<<< SHOPPING CART >>>======================================= */}
            <div className='flex items-center justify-centerw-40'>
              <div className='flex items-center'>
                <Link href='/cart' className='cursor-pointer'>
                  <CartCount />
                </Link>
                <div className='ml-3'>
                  <UserMenu currentUser={currentUser} />
                </div>
              </div>
            </div>
          </div>
          {/* ===================================================================================== */}
          {/* ==========<<< ELEMENT 3 >>>========================================================== */}
          {/* ===================================================================================== */}

          {/* =====<<< SHOPPING CATEGORIES >>>================================== */}
          <Categories />
        </div>
      </Container>
    </header>
  );
};

export default NavBar;
