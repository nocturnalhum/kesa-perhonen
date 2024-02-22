import React, { useCallback } from 'react';
import { ItemType } from './AddProductForm';
import { useDropzone } from 'react-dropzone';
import { CiImageOn } from 'react-icons/ci';

interface SelecImageProps {
  item: ItemType;
  handleAddImage: (value: File) => void;
}
const SelectImage: React.FC<SelecImageProps> = ({ item, handleAddImage }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleAddImage(acceptedFiles[0]);
      }
    },
    [handleAddImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
  });

  return (
    <div
      {...getRootProps()}
      className='border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center hover:border-slate-500'
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop image files here ...</p>
      ) : (
        <div className='flex gap-1'>
          <CiImageOn size={20} />
          <p className='capitalize'>+ Add {item.color} Image</p>
        </div>
      )}
    </div>
  );
};

export default SelectImage;
