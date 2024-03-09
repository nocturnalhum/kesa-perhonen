'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface NullDataProps {
  title: string;
  goBack?: boolean;
}

/**
 * React functional component for rendering a component with null data.
 *
 * @param {NullDataProps} title - the title to be displayed
 * @return {JSX.Element} the rendered component
 */
const NullData: React.FC<NullDataProps> = ({ title, goBack }) => {
  const router = useRouter();
  const handleRoute = () => {
    if (goBack) {
      router.back();
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    if (!goBack) {
      setInterval(() => {
        router.push('/');
      }, 500);
    }
  });

  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-[50vh] text-xl md:text-2xl'>
      <p className='font-medium'>{title}</p>
      <button className='underline' onClick={handleRoute}>
        Go Back
      </button>
    </div>
  );
};

export default NullData;
