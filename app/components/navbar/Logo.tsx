import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Amatic_SC } from 'next/font/google';

const amaticSC = Amatic_SC({
  subsets: ['latin'],
  weight: '700',
  preload: true,
});

const Logo = () => {
  return (
    <div className='flex items-center'>
      <div className='relative flex items-center justify-center w-36 h-10'>
        <Image
          priority
          src='/butterfly_logo.gif'
          alt='butterfly logo'
          height={50}
          width={250}
          className='absolute -top-1 left-7 h-10 -z-10'
        />
        <Link href='/'>
          <h1
            className={`${amaticSC.className} text-3xl text-center w-fit hover:text-slate-950 cursor-pointer`}
          >
            kesä perhonen
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
