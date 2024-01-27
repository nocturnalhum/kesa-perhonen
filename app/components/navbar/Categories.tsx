'use client';

import { categories } from '@/utils/categories';
import Container from '../Container';
import Category from './Category';
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  const pathname = usePathname();
  const isMainPage = pathname === '/';
  if (!isMainPage) return null;

  return (
    <div className='bg-slate-50 hidden lg:block'>
      <Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
          {categories.map((item) => (
            <Category
              key={item.id}
              label={item.category}
              icon={item.icon}
              selected={
                category === item.category ||
                (category === null && item.category === 'All')
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
