import Link from 'next/link';

interface NullDataProps {
  title: string;
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-[50vh] text-xl laptop:text-2xl'>
      <p className='font-medium'>{title}</p>
      <Link
        href={'/login'}
        className='text-lg font-medium text-blue-500 underline'
      >
        Return
      </Link>
    </div>
  );
};

export default NullData;
