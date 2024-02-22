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
        <div className='flex items-center justify-center rounded-full'>
          <Image
            src={src}
            alt='Avatar'
            height={30}
            width={30}
            className='rounded-full'
          />
        </div>
      </>
    );
  }
  return <FaUserCircle size={32} className='text-gray-400 w-[40px]' />;
};

export default Avatar;
