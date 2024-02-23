'use client';

import axios from 'axios';
import firebaseApp from '@/libs/firebase';
import toast from 'react-hot-toast';
import Heading from '@/app/components/Heading';
import { Product, SizeType } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from '@/utils/formatPrice';
import { MdCached, MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { useCallback } from 'react';
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
  let expandProducts: any[] = [];

  if (products) {
    products.map((product: any) => {
      product.items.forEach((item: ItemType) => {
        item.sizes?.forEach((size: SizeType) => {
          expandProducts.push({
            id:
              product.id.slice(20, product.id.length) +
              item.itemId.slice(21, item.itemId.length) +
              size.size,
            name: product.name,
            size: size.size,
            color: item.color,
            price: size.price,
            discount: size.discount,
            inventory: size.inventory,
            image: item.image,
            isNew: product.isNew,
            sizesLength: item.sizes?.length,
          });
        });
      });
    });
  }

  console.log('expandProducts', expandProducts);
  let rows: any = [];

  if (expandProducts) {
    rows = expandProducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price * (1 - product.discount / 100)),
        color: product.color,
        size: product.size,
        inventory: product.inventory,
        discount: product.discount,
        image: product.image,
        isNew: product.isNew,
        sizesLength: product.sizesLength,
      };
    });
  }
  // console.log('Rows', rows);

  let columns: any = [];

  return (
    <div>
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
  );
};

export default ManageProductsClient;
