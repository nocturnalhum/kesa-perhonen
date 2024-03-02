'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { truncateText } from '@/utils/truncateText';
import { Rating } from '@mui/material';
import { formatPrice } from '@/utils/formatPrice';
import { Product } from '@prisma/client';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, items, reviews } = product;
  const router = useRouter();

  // Calculate product rating
  const productRating =
    reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      className='col-span-1 cursor-pointer border border-slate-300 bg-slate-100 rounded-sm p-2 hover:scale-105 duration-300 text-center text-sm drop-shadow-md'
    >
      <div className='flex flex-col items-center w-full'>
        <div className='relative w-full aspect-square overflow-hidden'>
          {product.isNew && (
            <div className='absolute flex items-center justify-center gap-1 -rotate-45 text-sm font-extrabold tracking-wider -left-9 top-2 text-rose-50 bg-rose-800 h-5 w-28'>
              New!
            </div>
          )}
          {items[0].sizes[0].discount > 0 && (
            <div className='absolute flex items-center justify-center w-16 h-5 bottom-0 left-0 text-xs font-bold  text-white bg-rose-800'>
              {items[0].sizes[0].discount}% Off
            </div>
          )}
          <Image
            src={items[0].image}
            alt={name}
            height={600}
            width={600}
            className='w-full h-full object-contain'
          />
        </div>
        <div className='mt-4 h-10'>{truncateText(name, 25)}</div>
        <div>
          <Rating value={productRating} precision={0.5} readOnly />
        </div>
        <div>{reviews.length} reviews</div>
        <div
          className={`font-semibold ${
            items[0].sizes[0]?.discount > 0 && 'text-rose-800'
          }`}
        >
          {formatPrice(
            items[0].sizes[0].price * (1 - items[0].sizes[0].discount / 100)
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
