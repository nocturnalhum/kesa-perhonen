import React, { useCallback, useEffect, useRef, useState } from 'react';
import { sizeOptions } from '@/utils/sizeOptions';
import { ItemType } from './AddProductForm';
import { RiCloseCircleFill } from 'react-icons/ri';
import {
  MdAttachMoney,
  MdOutlineDiscount,
  MdOutlineInventory,
} from 'react-icons/md';
import { CiImageOn } from 'react-icons/ci';
import { SizeType } from '@prisma/client';
import SelectImage from './SelectImage';
import Button from '@/app/components/forms/Button';
import DropdownInput from '@/app/components/forms/DropDownInput';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AddItemDetailsProps {
  itemId: string;
  handleRemoveItemDetails: (id: string) => void;
  handleItemUpdate: (item: ItemType) => void;
}

const defaultSizeDetails = {
  price: 0,
  inventory: 0,
  discount: 0,
  size: '',
};

const defaultItem = {
  itemId: '',
  sizes: [],
  color: '',
  image: null,
} as ItemType;

const AddItemDetails: React.FC<AddItemDetailsProps> = ({
  itemId,
  handleRemoveItemDetails,
  handleItemUpdate,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [sizeCategory, setSizeCategory] = useState(sizeOptions[0]);
  const [sizeDetails, setSizeDetails] = useState(defaultSizeDetails);
  const [item, setItem] = useState<ItemType>(defaultItem);
  const [sizeCategoryValue, setSizeCategoryValue] = useState(
    sizeCategory.value
  );
  const [error, setError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [discountError, setDiscountError] = useState(false);
  const [inventoryError, setInventoryError] = useState(false);

  const router = useRouter();
  const formRef = useRef(null) as any;

  useEffect(() => {
    if (
      sizeDetails.price &&
      sizeDetails.inventory &&
      (sizeDetails.discount || sizeDetails.discount === 0)
    ) {
      console.log('SETTING ITEM');
      const updatedSizes = item?.sizes?.map((size) =>
        size.size === sizeDetails.size ? sizeDetails : size
      );
      if (!updatedSizes?.some((size) => size.size === sizeDetails.size)) {
        updatedSizes?.push(sizeDetails);
      }
      setItem({
        ...item,
        sizes: updatedSizes as SizeType,
      });
    }
  }, [sizeDetails]);

  console.log('AddItem - Item', item);
  console.log('AddItem - sizeDetails', sizeDetails);

  // ==========================================================================
  // ========<<< Update FormState With Items >>>===============================
  // ==========================================================================
  useEffect(() => {
    if (item.sizes?.length && item.sizes?.length > 0 && item.color) {
      handleItemUpdate({ ...item, itemId });
    }
  }, [item, itemId, handleItemUpdate, error]);

  // ==========================================================================
  // ========<<< Handle Color Change >>>=======================================
  // ==========================================================================
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value.toLowerCase();
    setItem({ ...item, color: newColor });
  };
  // ==========================================================================
  // ========<<< Handle Price Change >>>=======================================
  // ==========================================================================
  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    const newPrice = Number(event.target.value);
    if (isNaN(newPrice) || newPrice < 0.01) {
      setError(true);
      toast.error('Price value incorrect');
      return;
    } else {
      setError(false);
      setSizeDetails({ ...sizeDetails, price: Number(newPrice), size: item });
    }
  };

  // ==========================================================================
  // ========<<< Handle Discount Change >>>====================================
  // ==========================================================================
  const handleDiscountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    const newDiscount = Number(event.target.value);
    if (isNaN(newDiscount) || !(newDiscount >= 0 && newDiscount <= 99)) {
      setError(true);
      toast.error('Discount value incorrect');
      return;
    } else {
      setError(false);
      setSizeDetails({
        ...sizeDetails,
        discount: Number(newDiscount),
        size: item,
      });
    }
  };

  // ==========================================================================
  // ========<<< Handle Inventory Change >>>===================================
  // ==========================================================================
  const handleInventoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    const newInventory = Number(event.target.value);
    if (isNaN(newInventory) || newInventory < 0) {
      setError(true);
      toast.error('Inventory value incorrect');
      return;
    } else {
      setError(false);
      setSizeDetails({
        ...sizeDetails,
        inventory: Number(newInventory),
        size: item,
      });
    }
  };

  // ==========================================================================
  // ========<<< Handle Add Image >>>========================================
  // ==========================================================================
  const handleAddImage = useCallback((value: File) => {
    setFile(value);
    setItem((prev) => ({ ...prev, image: value }));
  }, []);

  // ==========================================================================
  // ========<<< Handle Remove Image >>>========================================
  // ==========================================================================
  const handleRemoveImage = useCallback(() => {
    setFile(null);
    setItem({ ...item, image: null });
  }, [item]);

  // ==========================================================================
  // ========<<< Handle Size Selection >>>=====================================
  // ==========================================================================
  const handleSizeSelection = (event: any) => {
    const index = sizeOptions.findIndex(
      (option) => option.label === event.target.value
    );
    setSizeCategory(sizeOptions[index]);
    setSizeCategoryValue(sizeOptions[index].value);
  };

  // ==========================================================================
  // ==========================================================================
  return (
    <div className='relative w-full max-w-xl mx-auto min-h-full flex flex-col flex-wrap gap-2 bg-slate-100 border border-slate-400 rounded px-3 py-2'>
      {/* ==========<<< Delete Item Component >>>============================= */}
      <button onClick={() => handleRemoveItemDetails(itemId)}>
        <RiCloseCircleFill size={30} className='absolute right-2 top-2' />
      </button>
      {error && (
        <div className='absolute w-full text-start text-sm text-red-500'>
          *Error in Size Data
        </div>
      )}
      {/* ==========<<< Item Color Details >>>================================= */}
      <div className=''>
        <div className='flex items-center gap-1 mt-7 mb-2'>
          <div>Color:</div>
          <input
            name='color'
            type='text'
            className='h-9 w-48 border text-start pl-3 rounded'
            placeholder='Enter product color...'
            onBlur={handleColorChange}
          />
        </div>
      </div>
      {/* ==========<<< Image File Details >>>================================= */}
      <>
        {!file && (
          <div className='w-full text-center bg-white'>
            <SelectImage item={item} handleAddImage={handleAddImage} />
          </div>
        )}
        {file && (
          <div className='flex flex-row gap-2 text-sm col-span-2 items-center justify-between bg-white border border-slate-400 rounded p-1 px-1'>
            <div className='flex gap-1'>
              <CiImageOn size={20} />
              <p>{file?.name}</p>
            </div>
            <div className='w-[70px]'>
              <Button label='Cancel' small onClick={handleRemoveImage} />
            </div>
          </div>
        )}
      </>
      {/* ==========<<< Item Size Details >>>================================== */}
      <div ref={formRef} className='flex items-center gap-2 mt-4 font-semibold'>
        <div>Inventory for</div>
        <DropdownInput
          options={sizeOptions}
          selectedOption={sizeCategory.label}
          onOptionChange={handleSizeSelection}
        />
        <div className='hidden sm:block'>item</div>
      </div>
      <div className='text-sm mb-2'>
        Enter price, discount and inventory values for each size item
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 w-full bg-blue-300'>
        {sizeCategoryValue.split(',').map((item) => {
          return (
            <div key={item} className='flex items-center gap-1'>
              <div className='min-w-[60px] text-center font-medium border border-black bg-slate-50 text-black px-1 rounded'>
                {item.trim()}
              </div>
              <div className='flex items-center'>
                <MdAttachMoney
                  size={20}
                  className='bg-slate-700 text-white p-0.5 rounded-l-lg'
                />
                <input
                  type='text'
                  name='price'
                  className='w-14 border text-center'
                  placeholder='price'
                  onBlur={(e) => handlePriceChange(e, item.trim())}
                />
              </div>
              <div className='flex items-center'>
                <MdOutlineDiscount
                  size={20}
                  className='bg-slate-700 text-white p-0.5 rounded-l-lg'
                />
                <input
                  type='text'
                  name='discount'
                  className='w-10 border text-center'
                  placeholder='disc'
                  onBlur={(e) => handleDiscountChange(e, item.trim())}
                />
              </div>
              <div className='flex items-center'>
                <MdOutlineInventory
                  size={20}
                  className='bg-slate-700 text-white p-0.5 rounded-l-lg'
                />
                <input
                  type='text'
                  name='quantity'
                  className='w-10 border text-center'
                  placeholder='qty'
                  onBlur={(e) => handleInventoryChange(e, item.trim())}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddItemDetails;