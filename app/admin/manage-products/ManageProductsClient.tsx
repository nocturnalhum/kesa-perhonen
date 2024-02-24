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

  console.log('expandProducts', expandProducts);
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
      flex: 2,
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
      renderCell: (params) => {
        return <div className='capitalize'>{params.value}</div>;
      },
      flex: 1,
    },
    {
      field: 'size',
      headerName: 'Size',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className='flex justify-center w-full uppercase'>
            {params.value}
          </div>
        );
      },
      flex: 1,
    },
    {
      field: 'isNew',
      headerName: 'Is New',
      renderCell: (params) => {
        return <div>{params.value ? 'Yes' : 'No'}</div>;
      },
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      renderCell: (params) => {
        return (
          <div className='font-semibold text-slate-800'>{params.value}</div>
        );
      },
      flex: 1,
    },
    {
      field: 'inventory',
      headerName: 'Inventory',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value > 10
                ? 'text-green-500'
                : params.value === 0
                ? 'text-red-500'
                : 'text-amber-400'
            } font-semibold w-full flex items-center justify-center`}
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
      renderCell: (params) => {
        return (
          <div className='flex justify-between gap-4 w-full'>
            <ActionBtn
              onClick={() =>
                router.push(`/admin/manage-products/${params.row.id}`)
              }
              icon={MdRemoveRedEye}
            />
            <ActionBtn
              onClick={() => handleToggleIsNew(params.row.id, params.row.isNew)}
              icon={MdCached}
            />
            <ActionBtn
              onClick={() =>
                router.push(`/admin/manage-products/${params.row.id}`)
              }
              icon={MdDelete}
            />
          </div>
        );
      },
      width: 200,
    },
  ];

  const handleToggleIsNew = useCallback(
    (id: string, isNew: boolean) => {
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
    },
    [router]
  );
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
