'use client';

import Image from 'next/image';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <>
        <div className='relative flex items-center justify-center group'>
          <div className=''>
            <Image
              src={src}
              alt='Avatar'
              className='rounded-full h-10 w-10'
              height={30}
              width={30}
            />
          </div>
          <div className='absolute bg-gradient-to-br from-slate-400 via-slate-200 to-slate-100 -bottom-0.5 -left-0.5 h-11 w-11 group-hover:animate-spin rounded-full -z-10' />
        </div>
      </>
    );
  }
  return <FaUserCircle size={32} className='text-gray-400' />;
};

export default Avatar;
