'use client';

import axios from 'axios';
import firebaseApp from '@/libs/firebase';
import toast from 'react-hot-toast';
import Heading from '@/app/components/Heading';
import { Product, SizeType } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from '@/utils/formatPrice';
import { MdCached, MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { ItemType } from '../add-products/AddProductForm';
import ActionBtn from '@/app/components/ActionBtn';

interface ManageProductsClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);

  let expandProducts: any[] = [];

  if (products) {
    expandProducts.push(
      ...products.reduce((acc, product) => {
        return acc.concat(
          product.items.reduce((acc: any, item: ItemType) => {
            return acc.concat(
              item.sizes?.map((size) => ({
                id: `${product.id}+${item.itemId}+${size.size}`,
                name: product.name,
                category: product.category,
                isNew: product.isNew,
                color: item.color,
                image: item.image,
                size: size.size,
                price: size.price,
                discount: size.discount,
                inventory: size.inventory,
              })) || []
            ); // Handle missing sizes gracefully
          }, [])
        );
      }, [])
    );
  }

  // console.log('expandProducts', expandProducts);
  let rows: any = [];

  if (expandProducts) {
    rows = expandProducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        category: product.category,
        price: formatPrice(product.price * (1 - product.discount / 100)),
        color: product.color,
        size: product.size,
        inventory: product.inventory,
        discount: product.discount,
        image: product.image,
        isNew: product.isNew,
      };
    });
  }
  // console.log('Rows', rows);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className='capitalize'>
            {params.value[0]} - {params.value[1]} - {params.value[2]}
          </div>
        );
      },
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'color',
      headerName: 'Color',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <div className='capitalize'>{params.value}</div>;
      },
      flex: 1,
    },
    {
      field: 'size',
      headerName: 'Size',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <div className='uppercase'>{params.value}</div>;
      },
      width: 80,
    },
    {
      field: 'isNew',
      headerName: 'New',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <div>{params.value ? 'Yes' : 'No'}</div>;
      },
      width: 80,
    },
    {
      field: 'price',
      headerName: 'Price',
      renderCell: (params) => {
        return (
          <div className='font-semibold text-slate-800'>{params.value}</div>
        );
      },
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'inventory',
      headerName: 'Inventory',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value > 10
                ? 'text-green-500'
                : params.value === 0
                ? 'text-red-500'
                : 'text-amber-400'
            } font-semibold`}
          >
            {params.value === 0 ? 'Out of Stock' : params.value}
          </div>
        );
      },
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className='flex justify-between w-full'>
            <ActionBtn
              onClick={() => {
                router.push(`/product/${params.row.id.split('+')[0]}`);
              }}
              icon={MdRemoveRedEye}
            />
            <ActionBtn
              onClick={() => handleToggleIsNew(params.row.id, params.row.isNew)}
              icon={MdCached}
            />
            <ActionBtn
              onClick={() => handleDelete(params.row.id, params.row.size)}
              icon={MdDelete}
            />
          </div>
        );
      },
      width: 175,
    },
  ];

  // ============================================================================
  // =====<<< Handle Toggle Is New >>>===========================================
  // ============================================================================
  const handleToggleIsNew = (id: string, isNew: boolean) => {
    const productArray = id.split('+');
    const productId = productArray[0];
    axios
      .put('/api/product', {
        productId,
        isNew: !isNew,
      })
      .then((res) => {
        toast.success('Product status changed', {
          id: 'statusChangeSuccess',
        });
        router.refresh();
      })
      .catch((error: any) => {
        toast.error('Oops! Product status change error!', {
          id: 'statusChangeError',
        });
        console.log('Error', error);
      });
  };

  // ============================================================================
  // =====<<< Handle Delete Product >>>==========================================
  // ============================================================================
  const handleDelete = (id: string, size: string) => {
    toast('Deleting product. please wait', {
      id: 'deleteProduct',
      duration: 1000,
    });
    const splitId = id.split('+');
    const productId = splitId[0];
    const itemId = splitId[1];
    const imageProduct = products.find((product) => product.id === productId);

    if (!imageProduct) {
      toast.error('Product not found', {
        id: 'deleteProductNotFoundError',
      });
      return;
    }
    const imageItem = imageProduct?.items.find(
      (item: ItemType) => item.itemId === itemId
    );

    // Function to delete image when no longer needed
    const handleImageDelete = async () => {
      try {
        if (imageItem?.image) {
          const imageRef = ref(storage, imageItem.image);
          await deleteObject(imageRef);
          console.log('Image deleted', imageItem.image);
        }
      } catch (error) {
        return console.log('Error Deleting Images', error);
      }
    };

    axios
      .delete('/api/product', {
        data: {
          productId,
          itemId,
          size,
        },
      })
      .then((res) => {
        toast.success('Product deleted', {
          id: 'deleteProductSuccess',
        });
        const { deleteImage } = res.data;
        if (deleteImage) {
          handleImageDelete();
        }
        router.refresh();
      })
      .catch((error: any) => {
        toast.error('Error! Failed to delete product', {
          id: 'deleteProductError',
        });
        console.log('Error', error.message);
      });
  };

  // ============================================================================
  // ============================================================================

  return (
    <div className='max-w-[1150px] mx-auto text-xl'>
      <div className='mt-8 mb-4'>
        <Heading title='Manage Products' center />
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
