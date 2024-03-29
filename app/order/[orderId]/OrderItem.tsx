import Image from 'next/image';
import { CartProductType } from '@prisma/client';
import { truncateText } from '@/utils/truncateText';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/navigation';

interface OrderItemProps {
  item: CartProductType;
}
const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const router = useRouter();

  const discountPrice =
    item.selectedItem.itemDetail.price *
    (1 - item.selectedItem.itemDetail.discount / 100);

  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center capitalize'>
      <div
        onClick={() => router.push('/product/' + item.id)}
        className='col-span-2 justify-self-start flex gap-2 md:gap-4 cursor-pointer'
      >
        <div className='relative w-[70px] aspect-square'>
          <Image
            src={item.selectedItem?.image}
            alt={item.name}
            height={100}
            width={100}
            className='object-contain border border-slate-300'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='font-semibold'>{truncateText(item.name, 25)}</div>
          <div>{item.selectedItem.color}</div>
          <div className='uppercase text-xs font-semibold'>
            {item.selectedItem.itemDetail.size}
          </div>
        </div>
      </div>
      <div className='justify-self-center text-rose-800'>
        {formatPrice(
          discountPrice ? discountPrice : item.selectedItem.itemDetail.price
        )}
      </div>
      <div className='justify-self-center'>{item.quantity}</div>
      <div className='justify-self-end font-semibold'>
        {formatPrice(
          item.quantity * discountPrice || item.quantity * item.price
        )}
      </div>
    </div>
  );
};

export default OrderItem;
