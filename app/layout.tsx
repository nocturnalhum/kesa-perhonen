import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kesä Perhonen',
  description:
    'The official home for Kesä Perhonen Online Shop for clothing, home décor, and lifestyle goods.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/x-icon' href='favicon.ico' />
      </head>
      <body className={`${inter.className} text-slate-700`}>
        <div className='flex flex-col min-h-screen'>
          <NavBar />
          <main className='flex-grow bg-slate-50'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
