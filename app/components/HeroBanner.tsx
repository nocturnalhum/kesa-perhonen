'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import Container from './Container';

export default function HeroBanner() {
  const [hideBanner, setHideBanner] = useState(false);
  return (
    <Container>
      <div
        className={`relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 w-full ${
          hideBanner ? 'hidden' : 'block'
        }`}
      >
        <div className='flex flex-col mx-auto gap-2 lg:flex-row items-center justify-evenly'>
          <div className='relative w-full max-h-screen'>
            <Image
              priority
              src='https://kesa-perhonen.s3.ca-central-1.amazonaws.com/Clear_Care_Series.jpg'
              alt='Banner winter accessories'
              height={600}
              width={800}
              className='object-cover w-full max-h-[80dvh]'
            />
            <div className='absolute flex flex-col items-center justify-center w-full max-h-[80vh] inset-0 h-full lg:mb-0 text-center'>
              <h1 className='text-4xl lg:text-6xl font-bold text-white mb-4'>
                Winter Sale
              </h1>
              <p className='text-lg lg:text-xl text-white mb-2'>
                Enjoy discounts on selected items
              </p>
              <p className='text-2xl lg:text-5xl text-yellow-400 font-bold uppercase'>
                get 20% off
              </p>
            </div>
            <div
              className='absolute text-white right-3 top-2 cursor-pointer rounded-full drop-shadow-xl'
              onClick={() => setHideBanner(true)}
            >
              <IoCloseCircleSharp size={36} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
