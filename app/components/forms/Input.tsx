'use client';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  errors: FieldErrors;
  validate?: (value: string) => boolean | string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  onKeyDown,
  errors,
  validate,
}) => {
  return (
    <div className='relative w-full'>
      <input
        type={type}
        placeholder=''
        autoComplete='off'
        id={id}
        disabled={disabled}
        {...register(id, { required, validate })}
        onKeyDown={onKeyDown}
        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? 'border-rose-200' : 'border-slate-300'
        } ${errors[id] ? ' focus:border-rose-400' : ' focus:border-slate-300'}`}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text capitalize text-base text-slate-400 duration-300 transform -translate-y-3 top-5 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
      >
        {label}
        {required && <span className='text-rose-400 pl-0.5'>*</span>}
      </label>
      {errors[id] && (
        <div className='absolute right-4 text-xs text-rose-400'>
          {type === 'password' &&
          errors?.confirmPassword?.message === 'passwords do not match'
            ? `*${errors?.confirmPassword?.message}`
            : '*required'}
        </div>
      )}
    </div>
  );
};

export default Input;
