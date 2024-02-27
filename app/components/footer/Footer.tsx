'use client';

import Link from 'next/link';
import { MdFacebook } from 'react-icons/md';
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai';
import Container from '../Container';
import queryString from 'query-string';
import { categories } from '@/utils/categories';
import FooterList from './FooterList';
import { useRouter, useSearchParams } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  const params = useSearchParams();

  // ==========================================================================
  // =========<<< Category Handler >>>=========================================
  // ==========================================================================
  const handleClick = (label: string) => {
    if (label === 'All') {
      router.push('/');
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
        console.log('Category - Params', currentQuery);
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };
      const url = queryString.stringifyUrl(
        {
          url: '/',
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );
      router.push(url);
    }
  };

  return (
    <footer className='bg-slate-700 text-slate-200 text-sm'>
      <Container>
        <div className='flex flex-col lg:flex-row justify-evenly p-6 pt-10'>
          {/* =====<<< Shop Categories >>>===================================== */}
          <FooterList>
            <h3 className='text-base font-bold text-slate-50'>
              Shop Categories
            </h3>
            {categories.map((item) => {
              return (
                <button
                  onClick={() => handleClick(item.category)}
                  key={item.id}
                  className='capitalize'
                >
                  {item.category}
                </button>
              );
            })}
          </FooterList>
          {/* =====<<< Customer Service >>>==================================== */}
          <FooterList>
            <h3 className='text-base font-bold text-slate-50'>
              Customer Service
            </h3>
            <Link href='#'>Contact Us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Returns & Exchanges</Link>
            <Link href='#'>FAQs</Link>
          </FooterList>
          {/* =====<<< About Us >>>=========================================== */}
          <div className='w-full lg:w-1/3 mb-6 lg:mb-0'>
            <h3 className='text-base font-bold text-slate-50 mb-2'>About Us</h3>
            <p className='mb-2 text-justify md:max-w-[90%] lg:max-w-72 xl:max-w-[450px]'>
              At kesä perhonen, we are dedicated to providing timeless style and
              quality to our customers, with a wide selection of gifts,
              clothing, home goods, and accessories.
            </p>
            <p className='mt-8'>
              &copy; {new Date().getFullYear()} kesä perhonen. All rights
              reserved.
            </p>
          </div>
          {/* =====<<< Follow Us >>>=========================================== */}
          <FooterList>
            <h3 className='text-base font-bold text-slate-50 mb-2 lg:ml-6'>
              Follow Us
            </h3>
            <div className='flex gap-2 lg:ml-6'>
              <Link href='#'>
                <MdFacebook size={24} color='#4267B2' />
              </Link>
              <Link href='#'>
                <AiFillTwitterCircle size={24} color='#1DA1F2' />
              </Link>
              <Link href='#'>
                <AiFillInstagram size={24} />
              </Link>
              <Link href='#'>
                <AiFillYoutube size={24} color='#FF0000' />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
