'use client';

import moment from 'moment';
import { Rating } from '@mui/material';
import Heading from '@/app/components/Heading';
import Avatar from '@/app/components/Avatar';

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if (product.reviews.length === 0) return null;
  return (
    <div>
      <Heading title='Product Review' />
      <div className='text-sm mt-2'>
        {product?.reviews &&
          product?.reviews.map((review: any) => {
            return (
              <div key={review.id} className='max-w-xs'>
                <div className='flex gap-2 items-center'>
                  <Avatar src={review.user.image} />
                  <div className='font-semibold'>{review?.user.name}</div>
                  <div className='font-light'>
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className='flex flex-col mt-2 gap-2'>
                  <div className='flex flex-col gap-1 capitalize'>
                    <div className='font-bold'>{review.title}</div>
                    <Rating value={review.rating} readOnly />
                  </div>
                  <div className='ml-2 text-justify'>{review.comment}</div>
                  <hr className='my-4' />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
