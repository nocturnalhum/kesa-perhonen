'use client';

import { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { SafeUser } from '@/types';

interface UserMenuProps {
  currentUser: SafeUser | undefined | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  console.log('currentUser', currentUser);

  return (
    <>
      <div className='relative z-30'>
        <div
          className='h-auto aspect-square cursor-pointer'
          onClick={toggleOpen}
        >
          <Avatar src={currentUser?.image} />
        </div>
        {isOpen && (
          <div className='absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden top-12 right-0 text-sm flex flex-col cursor-pointer'>
            {currentUser ? (
              <div>
                <Link href='/orders'>
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link href='/admin'>
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div className=''>
                <Link href='/login'>
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href='/register'>
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
