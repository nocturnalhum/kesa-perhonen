import Image from 'next/image';
import React from 'react';

export default function HeroBanner() {
  return (
    <div className='relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8'>
      <div className='flex flex-col mx-auto px-8 py-12 gap-2 laptop:flex-row items-center justify-evenly'>
        <div className='mb-8  laptop:mb-0 text-center'>
          <h1 className='text-4xl laptop:text-6xl font-bold text-white mb-4'>
            Winter Sale
          </h1>
          <p className='text-lg laptop:text-xl text-white mb-2'>
            Enjoy discounts on selected items
          </p>
          <p className='text-2xl laptop:text-5xl text-yellow-400 font-bold uppercase'>
            get 50% off
          </p>
        </div>
        <div className='relative w-1/3 aspect-video'>
          <Image
            src='https://kesa-perhonen.s3.ca-central-1.amazonaws.com/banner-image1.jpg'
            alt='Banner winter accessories'
            height={600}
            width={800}
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
}
