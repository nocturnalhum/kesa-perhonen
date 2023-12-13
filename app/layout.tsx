import './globals.css';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/footer/Footer';
import Navbar from './components/nav/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kesä Perhonen',
  description:
    'The official site for Kesä Perhonen, Ltd. Shop for home décor, ...15% off your first order when you sign up to our newsletter.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/icon.ico' sizes='any' />
      </head>
      <body className={`${inter.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: { background: 'rgb(51 65 85)', color: '#fff' },
          }}
        />
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <main className='flex-grow bg-slate-50'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
