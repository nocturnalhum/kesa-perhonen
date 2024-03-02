import Link from 'next/link';
import Container from '../Container';
import Categories from './Categories';
import SearchBar from './SearchBar';
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import { getCurrentUser } from '@/actions/getCurrentUser';
import SearchButton from './SearchButton';
import MenuButton from './MenuButton';
import Logo from './Logo';

const NavBar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <header className='sticky w-full bg-slate-50 pb-2 z-30 p-2'>
      <Container>
        <div className='flex flex-col duration-300'>
          <div className='flex items-center justify-between'>
            {/* =====<<< MOBILE: MENU BUTTON &  SEARCH ICON>>>========================== */}
            <div className='relative flex items-center text-lg cursor-pointer gap-2 lg:hidden'>
              <MenuButton />
              <SearchButton />
            </div>

            {/* =====<<< SHOP LOGO >>>=========================================== */}
            <Logo />

            {/* =====<<< SEARCH BAR >>>========================================== */}
            <div className='hidden md:flex flex-grow'>
              <SearchBar />
            </div>

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

          {/* =====<<< SHOPPING CATEGORIES >>>================================== */}
          <Categories />
        </div>
      </Container>
    </header>
  );
};

export default NavBar;
