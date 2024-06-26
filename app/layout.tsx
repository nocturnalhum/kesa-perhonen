export const dynamic = 'force-dynamic';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import CartProvider from '@/providers/CartProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kesä Perhonen',
  description:
    'The official home for Kesä Perhonen Online Shop for clothing, home décor, and lifestyle goods.',
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className={`${inter.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: { background: 'rgb(51 65 85)', color: '#fff' },
          }}
        />
        <CartProvider>
          <div className='relative flex flex-col min-h-screen'>
            <NavBar />
            <main className='flex-grow bg-slate-50'>
              {children}
              <SpeedInsights />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
