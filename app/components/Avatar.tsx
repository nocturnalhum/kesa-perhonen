'use client';

import Image from 'next/image';
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
            height={50}
            width={50}
            className='rounded-full'
          />
        </div>
      </>
    );
  }
  return <FaUserCircle size={32} className='text-gray-400 w-[40px]' />;
};

export default Avatar;
