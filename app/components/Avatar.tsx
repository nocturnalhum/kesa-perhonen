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
        <div className='flex items-center justify-center rounded-full border border-slate-400'>
          <Image
            src={src}
            alt='Avatar'
            className='rounded-full'
            height={50}
            width={50}
          />
        </div>
      </>
    );
  }
  return <FaUserCircle size={32} className='text-gray-400' />;
};

export default Avatar;
