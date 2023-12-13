import Link from 'next/link';
import Container from '../Container';
import FooterList from './FooterList';
import { MdFacebook } from 'react-icons/md';
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className='bg-slate-700 text-slate-200 text-sm'>
      <Container>
        <div className='flex flex-col laptop:flex-row justify-between pt-16 pb-8'>
          <FooterList>
            <h3 className='text-base font-bold'>Shop Categories</h3>
            <Link href='#'>Gifts</Link>
            <Link href='#'>Fashion</Link>
            <Link href='#'>Lifestyle</Link>
            <Link href='#'>{`Men's`}</Link>
            <Link href='#'>{`Women's`}</Link>
            <Link href='#'>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className='text-base font-bold'>Customer Service</h3>
            <Link href='#'>Contact Us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Returns & Exchanges</Link>
            <Link href='#'>FAQs</Link>
          </FooterList>
          <div className='w-full laptop:w-1/3 mb-6 laptop:mb-0'>
            <h3 className='text-base font-bold mb-2'>About Us</h3>
            <p className='mb-2'>
              At kesä perhonen, we are dedicated to providing timeless style and
              quality to our customers, with a wide selection of gifts,
              clothing, home goods, and accessories
            </p>
            <p>
              &copy; {new Date().getFullYear()} kesä perhonen. All rights
              reserved.
            </p>
          </div>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Follow Us</h3>
            <div className='flex gap-2'>
              <Link href='#'>
                <MdFacebook size={24} />
              </Link>
              <Link href='#'>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href='#'>
                <AiFillInstagram size={24} />
              </Link>
              <Link href='#'>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
