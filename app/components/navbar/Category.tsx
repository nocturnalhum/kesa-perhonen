import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import queryString from 'query-string';

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  // ==========================================================================
  // =========<<< Category Handler >>>=========================================
  // ==========================================================================
  const handleCategory = () => {
    if (label === 'All') {
      router.push('/');
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        // ...currentQuery,
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
    <div
      onClick={handleCategory}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-[1.5px] hover:text-slate-800 transition cursor-pointer duration-300 ${
        selected
          ? 'border-b-slate-800 text-slate-800 border-b-[1.5px]'
          : 'border-transparent text-slate-500'
      }`}
    >
      <Icon size={20} />
      <div className='font-medium text-sm capitalize hover:scale-110 duration-300'>
        {label}
      </div>
    </div>
  );
};

export default Category;
