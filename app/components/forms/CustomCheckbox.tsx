'use client';

import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface CustomCheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div className='w-full flex flex-row items-center gap-2'>
      <input
        type='checkbox'
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=''
        className='cursor-pointer'
      />
      <label
        htmlFor={id}
        className='font-normal text-sm text-slate-500 cursor-pointer'
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
