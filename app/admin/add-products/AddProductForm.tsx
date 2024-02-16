'use client';

import Heading from '@/app/components/Heading';
import Input from '@/app/components/forms/Input';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import TextArea from '@/app/components/forms/TextArea';
import CustomCheckbox from '@/app/components/forms/CustomCheckbox';
import { categories } from '@/utils/categories';
import CategoryInput from '@/app/components/forms/CategoryInput';

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      category: [],
      isNew: false,
      items: [],
      productColors: '',
    },
  });

  console.log('Items:', watch('productColor'));

  // ==========================================================================
  // ========<<< Set Custom Value >>>==========================================
  // ==========================================================================
  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  // ==========================================================================
  // ========<<< Handle Category Selection >>>=================================
  // ==========================================================================
  const handleCategorySelection = (categories: string[]) => {
    setSelectedCategories(categories);
    setCustomValue('category', categories);
  };

  return (
    <>
      <Heading title='Add a Product' center />
      <Input
        id='name'
        label='name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id='description'
        label='description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id='isNew'
        label='Is New Arrival Product'
        disabled={isLoading}
        register={register}
      />
      <div className='w-full font-medium'>
        <div className='mb-2 font-semibold'>Select one or more Categories</div>
        <div className='grid grid-cols-2 md:grid-cols-3 max-h-[50vh] gap-3 overflow-y-auto'>
          {categories.map((item) => {
            if (item.category === 'All') {
              return null;
            }
            return (
              <div key={item.id}>
                <CategoryInput
                  onClick={handleCategorySelection}
                  selectedCategories={selectedCategories}
                  category={item.category}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-full flex flex-col flex-wrap gap-4'>
        <div>
          <div className='font-bold'>Enter Color and upload their images</div>
          <div className='text-sm'>
            You must upload an image for each color otherwise color selection
            will be ignored.
          </div>
          {/* Create Color Input with dropdown color selector */}
          <div className='w-full'>
            <Input
              id='productColor'
              label='Product Color'
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
