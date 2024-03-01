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
        className={`relative mb-4 w-full ${hideBanner ? 'hidden' : 'block'}`}
      >
        <div className='flex flex-col mx-auto gap-2 lg:flex-row items-center justify-evenly'>
          <div className='relative w-full max-h-screen'>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/kesa-perhonen.appspot.com/o/products%2FClear_Care_Series.jpg?alt=media&token=269a33a7-b891-4098-8afc-b3bbe1b6e712'
              alt='Banner Spring accessories'
              height={600}
              width={800}
              priority
              className='object-cover w-full max-h-[40dvh]'
            />
            <div className='absolute flex flex-col items-center justify-center w-full max-h-[80vh] inset-0 h-full lg:mb-0 text-center'>
              <h1 className='text-4xl lg:text-6xl font-bold text-white mb-4'>
                Spring Sale
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
