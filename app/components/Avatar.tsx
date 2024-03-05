'use client';

import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
  alt?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  if (src) {
    return (
      <>
        <div className='flex items-center justify-center rounded-full'>
          <Image
            src={src}
            alt={alt ? alt : 'avatar'}
            height={30}
            width={30}
            className='rounded-full'
          />
        </div>
      </>
    );
  } else {
    if (alt) {
      return (
        <div className='flex items-center justify-center text-lg font-semibold text-gray-50 w-[32px] aspect-square bg-blue-400 rounded-full uppercase'>
          {alt[0]}
        </div>
      );
    } else {
      return <FaUserCircle size={32} className='text-gray-400 w-[32px]' />;
    }
  }
};

export default Avatar;
