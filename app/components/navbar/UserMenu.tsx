'use client';

import { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { SafeUser } from '@/types';
import toast from 'react-hot-toast';
import { AiFillCaretDown } from 'react-icons/ai';

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className='relative z-30'>
        <div
          // className='h-[35px] aspect-square cursor-pointer'
          className='p-2 border border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
          onClick={toggleOpen}
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className='absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden top-12 right-0 text-sm flex flex-col cursor-pointer'>
            {currentUser ? (
              <div>
                <Link href='/orders'>
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                {currentUser.role === 'ADMIN' && (
                  <Link href='/admin'>
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                )}
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut({ callbackUrl: 'http://localhost:3000' });
                    toast.success('Logged Out');
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