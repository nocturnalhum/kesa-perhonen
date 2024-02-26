import Image from 'next/image';
import React from 'react';

const Notfound = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center h-full min-h-[60vh] mt-10 gap-5'>
        <Image
          priority
          src='/404_image.png'
          alt='empty coat hanger'
          height={150}
          width={300}
          className='h-auto w-[80%] max-w-[350px] md:max-w-[500px] lg:max-w-[600px] opacity-50'
        />
        <div className='flex w-full justify-center text-3xl text-neutral-500 font-semibold'>
          404: Page Not Found
        </div>
      </div>
    </>
  );
};

export default Notfound;
