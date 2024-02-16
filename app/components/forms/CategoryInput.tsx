'use client';

import { IconType } from 'react-icons';

interface CategoryInputProps {
  selectedCategories: string[];
  category: string;
  icon: IconType;
  onClick: (value: string[]) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selectedCategories,
  category,
  icon: Icon,
  onClick,
}) => {
  const isSelected = selectedCategories.includes(category);

  // ==========================================================================
  // ========<<< Handle Category Selection >>>=================================
  // ==========================================================================
  const handleClick = () => {
    if (isSelected) {
      // If already selected, remove from the array
      const updatedCategories = selectedCategories.filter(
        (selected) => selected !== category
      );
      onClick(updatedCategories);
    } else {
      // If not selected, add to the array
      const updatedCategories = [...selectedCategories, category];
      onClick(updatedCategories);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 capitalize hover:border-slate-400 transition cursor-pointer select-none hover:scale-95 ${
        isSelected
          ? 'border-slate-500 hover:border-slate-600 bg-slate-200/50'
          : 'border-slate-200'
      }`}
    >
      <Icon size={25} />
      <div className='font-light text-sm'>{category}</div>
    </div>
  );
};

export default CategoryInput;
