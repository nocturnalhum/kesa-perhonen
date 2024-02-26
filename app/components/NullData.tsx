'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NullDataProps {
  title: string;
}

/**
 * React functional component for rendering a component with null data.
 *
 * @param {NullDataProps} title - the title to be displayed
 * @return {JSX.Element} the rendered component
 */
const NullData: React.FC<NullDataProps> = ({ title }) => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-[50vh] text-xl md:text-2xl'>
      <p className='font-medium'>{title}</p>
      <button className='underline' onClick={() => router.back()}>
        Go Back
      </button>
    </div>
  );
};

export default NullData;
