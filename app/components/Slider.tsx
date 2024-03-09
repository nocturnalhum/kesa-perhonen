'use client';

import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Container from './Container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const Slider = () => {
  const [hideBanner, setHideBanner] = useState(false);
  const [hideText, setHideText] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHideText(false);
    }, 100);
  }, []);

  return (
    <Container>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className={`relative mb-4 select-none ${
          hideBanner ? 'hidden' : 'block'
        }`}
      >
        <CarouselContent>
          <CarouselItem className='relative rounded-3xl'>
            <h2 className='absolute w-full h-full font-bold flex flex-col items-end justify-center gap-2 pr-[25vw] sm:pr-[25vw] md:pr-[10vw]'>
              <span className='text-[4.5vw] sm:text-[4vw]  md:text-[3vw]  text-yellow-400'>
                Spring Sale
              </span>
              <span className='text-[3.5vw] sm:text-[3vw]  md:text-[2.5vw] text-white'>
                Up To 40% Off
              </span>
            </h2>
            <Image
              src='/bannerImages/Artboard_2.webp'
              alt='Spring Sale'
              height={600}
              width={1800}
              className='object-cover w-full h-[30dvh]'
              priority
            />
          </CarouselItem>
          <CarouselItem>
            <div>
              {!hideText && (
                <h2
                  className={`absolute w-full h-full font-medium flex flex-col items-start justify-center gap-3 pl-[10vw] sm:pl-[15vw] md:pl-[10vw]`}
                >
                  <div className='text-[4.5vw] sm:text-[4vw] md:text-[3vw] text-slate-400 '>
                    Stock Up
                  </div>
                  <span className='text-[3.5vw] sm:text-[3vw]  md:text-[2.5vw] text-slate-500'>
                    On School Supplies
                  </span>
                </h2>
              )}
              <Image
                src='/bannerImages/stationery_banner.webp'
                alt='Stationery'
                height={600}
                width={1800}
                className='object-cover w-full h-[30dvh]'
                priority
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            {!hideText && (
              <h2 className='absolute w-full h-full font-medium text-slate-400 flex flex-col items-center justify-center'>
                <span className='text-[4.5vw] sm:text-[4vw] md:text-[3vw]'>
                  Health
                </span>
                <span className='ttext-[3.5vw] sm:text-[3vw]  md:text-[2.5vw] font-medium text-slate-100 '>
                  &
                </span>
                <span className='text-[3.5vw] sm:text-[3vw]  md:text-[2.5vw]'>
                  Beauty
                </span>
              </h2>
            )}
            <Image
              src='/bannerImages/beauty_banner.webp'
              alt='Health & Beauty'
              height={600}
              width={1800}
              className='object-cover w-full h-[30dvh]'
              priority
            />
          </CarouselItem>
          <CarouselItem>
            {!hideText && (
              <h2 className='absolute w-full h-full font-medium text-5xl text-slate-400 flex flex-col items-start pl-36 justify-center gap-1'>
                <span className='text-[3.5vw] sm:text-[3vw]  md:text-[2.5vw]'>
                  Men&apos;s
                </span>
                <span className='text-[3.5vw] sm:text-[3vw]  md:text-[2.5vw] font-medium text-slate-100 '>
                  Apparel
                </span>
                <span className='text-[3.5vw] sm:text-[3vw]  md:text-[2.5vw] font-medium text-slate-100'>
                  New Arrivals
                </span>
              </h2>
            )}
            <Image
              src='/bannerImages/men_apparel.webp'
              alt='Men clothing'
              height={600}
              width={1800}
              className='object-cover w-full h-[30dvh]'
              priority
            />
          </CarouselItem>
          <CarouselItem>
            {!hideText && (
              <h2 className='absolute w-full h-full font-semibold text-slate-400 flex flex-col items-start pl-20 justify-center'>
                <span className='text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] text-slate-100'>
                  Women&apos;s
                </span>
                <span className='text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] text-fuchsia-400 '>
                  Apparel
                </span>
                <span className='text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] font-medium text-slate-100'>
                  New Arrivals
                </span>
              </h2>
            )}
            <Image
              src='/bannerImages/women_banner.webp'
              alt='Women clothing'
              height={600}
              width={1800}
              className='object-cover w-full h-[30dvh]'
              priority
            />
          </CarouselItem>
          <CarouselItem>
            {!hideText && (
              <h2 className='absolute w-full h-full font-semibold text-[7.5vw] sm:text-[7vw]  md:text-[6.5vw] lg:text-[5vw] text-slate-400 flex flex-col items-center justify-center'>
                <span className='text-pink-400'>Travel</span>
              </h2>
            )}
            <Image
              src='/bannerImages/travel_banner.webp'
              alt='Travel'
              height={600}
              width={1800}
              className='object-cover w-full h-[30dvh]'
              priority
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='left-2 sm:left-5 opacity-40' />
        <CarouselNext className='right-2 sm:right-5 opacity-40' />
        <div
          className='absolute text-white right-3 top-2 cursor-pointer rounded-full drop-shadow-xl opacity-80'
          onClick={() => setHideBanner(true)}
        >
          <IoCloseOutline size={30} />
        </div>
      </Carousel>
    </Container>
  );
};

export default Slider;
