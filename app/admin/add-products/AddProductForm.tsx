'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/forms/Input';
import toast from 'react-hot-toast';
import TextArea from '@/app/components/forms/TextArea';
import CustomCheckbox from '@/app/components/forms/CustomCheckbox';
import Button from '@/app/components/forms/Button';
import CategoryInput from '@/app/components/forms/CategoryInput';
import AddItemDetails from './AddItemDetails';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { categories } from '@/utils/categories';
import { FaCirclePlus } from 'react-icons/fa6';
import { SizeType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import firebaseApp from '@/libs/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import axios from 'axios';

export type ItemType = {
  itemId: string;
  color: string;
  image: File | null;
  sizes: SizeType[] | null;
};

export type UploadedItemType = {
  itemId: string;
  color: string;
  image: string;
  sizes: SizeType[] | null;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isProductCreated, setIsProductCreated] = useState(false);

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
    },
  });

  const router = useRouter();

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
  // ========<<< Handle Update Items >>>=======================================
  // ==========================================================================
  const handleItemUpdate = useCallback(
    (newItem: ItemType) => {
      const index = watch('items').findIndex(
        (item: ItemType) => item.itemId === newItem.itemId
      );
      let newItems;
      if (index === -1) {
        newItems = [...watch('items'), newItem];
      } else {
        newItems = [...watch('items')];
        newItems[index] = newItem;
      }
      setCustomValue('items', newItems);
    },
    [setCustomValue, watch]
  );

  // ==========================================================================
  // ========<<< Handle Category Selection >>>=================================
  // ==========================================================================
  const handleCategorySelection = (categories: string[]) => {
    setSelectedCategories(categories);
    setCustomValue('category', categories);
  };

  // ==========================================================================
  // ========<<< Handle Add Item Detail Component >>>==========================
  // ==========================================================================
  const handleAddItemDetails = () => {
    const newId = uuidv4();
    setProductDetails([
      ...productDetails,
      {
        itemId: newId,
        component: (
          <AddItemDetails
            itemId={newId}
            handleRemoveItemDetails={handleRemoveItemDetails}
            handleItemUpdate={handleItemUpdate}
          />
        ),
      },
    ]);
  };

  // ==========================================================================
  // ========<<< Handle Remove Item Details Component >>>======================
  // ==========================================================================
  const handleRemoveItemDetails = (itemId: string) => {
    setProductDetails((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  // ==========================================================================
  // ========<<< Product Details Components UseState >>>==========================
  // ==========================================================================
  const NEWID = uuidv4();

  const defaultProductDetails = useMemo(
    () => [
      {
        itemId: NEWID,
        component: (
          <AddItemDetails
            itemId={NEWID}
            handleRemoveItemDetails={handleRemoveItemDetails}
            handleItemUpdate={handleItemUpdate}
          />
        ),
      },
    ],
    [NEWID, handleItemUpdate]
  );

  const [productDetails, setProductDetails] = useState(defaultProductDetails);

  // ========================================================================
  // ========<<< OnSubmit Handler >>>========================================
  // ========================================================================
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedItemType[] = [];

    if (!data.category || data.category.length === 0) {
      setIsLoading(false);
      return toast.error('Category is not selected!');
    }
    if (!data.items || data.items.length === 0) {
      setIsLoading(false);
      return toast.error('Item details incomplete!');
    }

    const isAllDetailsValid = data.items.every((item: ItemType) => {
      if (!item.color || !item.image) {
        return false;
      }
      if (!item.sizes || item.sizes.length === 0) {
        return false;
      }
      return true;
    });

    // ========<<< Handle Image Image Uploads >>>==============================
    const handleImageUploads = async () => {
      toast('Uploading Product, please wait...');
      try {
        const storage = getStorage(firebaseApp);
        for (const item of data.items) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name;
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            const cleanupUploadTask = () => {
              uploadTask.cancel();
            };

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (error) => {
                  console.log('Error uploading image', error);
                  cleanupUploadTask();
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL: string) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log('File available at', downloadURL);
                      resolve();
                    })
                    .catch((error: ErrorCallback) => {
                      console.log('Error getting the download URL', error);
                      reject(error);
                    })
                    .finally(() => {
                      cleanupUploadTask();
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log('Error handling image uploads', error);
        return toast.error('Error handling image uploads');
      }
    };

    await handleImageUploads();
    const productData = {
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),
      items: uploadedImages,
    };

    // ========<<< save to MongoDB >>>=========================================
    axios
      .post('/api/product', productData)
      .then(() => {
        toast.success('Product created successfully!');
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error('Something went wrong in axios');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // ==========================================================================
  // ========<<< Clear Form After Product Submitted >>>========================
  // ==========================================================================

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setSelectedCategories([]);
      setProductDetails(defaultProductDetails);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset, defaultProductDetails]);

  // ==========================================================================
  // ==========================================================================

  return (
    <>
      <Heading title='Add a Product' center />
      {/* ==========<<< Name >>>================================================ */}
      <Input
        id='name'
        label='name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* ==========<<< Description >>>========================================== */}
      <TextArea
        id='description'
        label='description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* ==========<<< isNew >>>============================================== */}
      <CustomCheckbox
        id='isNew'
        label='Is New Arrival Product'
        disabled={isLoading}
        register={register}
      />
      {/* ==========<<< Category >>>=========================================== */}
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
      {/* ==========<<< Item Details >>>======================================= */}
      <div>
        <div className='font-bold'>
          Enter product item details and upload their images
        </div>
        <div className='text-sm'>
          You must complete all details and upload an image for each item
          otherwise item will be ignored.
        </div>
      </div>

      {productDetails.map((detail) => {
        return (
          <div key={detail.itemId} className='w-full'>
            {detail.component}
          </div>
        );
      })}
      {/* ==========<<< Add Item Details and Submit Buttons>>>================= */}
      <button
        onClick={handleAddItemDetails}
        className='flex items-center self-start gap-1 text-sm text-slate-500 '
      >
        <FaCirclePlus size={25} className='text-green-500' />
        Add Additional Item Card
      </button>
      <div className='w-56'>
        <Button
          label={isLoading ? 'Loading...' : 'Submit Product'}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </>
  );
};

export default AddProductForm;
