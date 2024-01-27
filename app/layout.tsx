import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './components/navbar/NavBar';

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
      <body className={inter.className}>
        <NavBar />

        {children}
      </body>
    </html>
  );
}
