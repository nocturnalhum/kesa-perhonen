'use client';

import { Rating } from '@mui/material';

interface ProductDetailsProps {
  product: any;
}

const Horizontal = () => {
  return <hr className='w-[30%] my-2' />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const productRating =
    product.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews?.length;

  return (
    <div className='grid grid-cols-1 tablet:grid-cols-2 gap-12'>
      <div>Images</div>
      <div className='flex flex-col gap-1 text-slate-600 text-sm'>
        <h2 className='text-3xl font-medium to-sky-700'>{product.name}</h2>
        <div className='flex items-center gap-2'>
          <Rating value={productRating} precision={0.5} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className='text-justify'>{product.description}</div>
        <Horizontal />
        <div>
          <span className='font-semibold uppercase'>category:</span>
          {product.category}
        </div>
        <div>
          <span className='font-semibold uppercase'>brand:</span>
          {product.brand}
        </div>
        <div
          className={`capitalize ${
            product.inStock ? 'text-teal-400' : 'text-rose-400'
          }`}
        >
          {product.inStock ? 'in stock' : 'out of stock'}
        </div>
        <Horizontal />
      </div>
    </div>
  );
};

export default ProductDetails;
