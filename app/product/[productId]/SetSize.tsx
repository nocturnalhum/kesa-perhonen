'use client';

import {
  CartProductType,
  ItemType,
  SelectedItemType,
  SizeType,
} from '@/app/product/[productId]/ProductDetails';

interface SetSizeProps {
  items: ItemType[];
  cartProduct: CartProductType;
  handleSizeSelect: (value: SizeType) => void;
}

const SetSize: React.FC<SetSizeProps> = ({
  items,
  cartProduct,
  handleSizeSelect,
}) => {
  const selectedItem = items.find(
    (item) => item.color === cartProduct.selectedItem.color
  );

  return (
    <div className='flex flex-col'>
      <span className='font-bold uppercase'>
        size:
        <span className='font-normal uppercase ml-2'>
          {cartProduct.selectedItem.itemDetail.size[1]}
        </span>
      </span>
      <div className='flex gap-3 items-center mt-2 ml-2'>
        {selectedItem?.sizes.map((sizeDetail) => {
          return (
            <div
              onClick={() => handleSizeSelect(sizeDetail)}
              key={sizeDetail.size[0]}
              className={`flex justify-center items-center h-9 aspect-square border rounded-full p-3  text-xs uppercase select-none ${
                sizeDetail.size[1].length > 3 ? 'w-24 rounded-md' : 'w-9'
              }
              ${
                cartProduct.selectedItem.itemDetail.size[0] ===
                sizeDetail.size[0]
                  ? 'border-[1.5px] border-slate-500'
                  : ''
              }`}
            >
              {sizeDetail.size[1]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetSize;

/**
 * Notes: CartProduct:
 * id * name * description * category[] * quantity * selectedItem
 *    selectedItem: color: 'Black' * colorCode * image * sizes[]
 *        sizes: discount * inventory * price * size[]
 *            size: [ "xs", "xs", "extra-small" ]
 */

/**
 * Notes: SetSize-items:
 * Object1 { color: 'Natural' * colorCode * image * sizes[5]}
 *    sizes: price * discount * inventory * size[3]
 *        size: [ "xs", "xs", "extra-small" ]
 * Object2 *
 * Object3 *
 */

/**
 * Notes: SetSize-cartProduct: Same as above
 * id * name * description * category[] * quantity * selectedItem
 *    selectedItem: color: 'Black' * colorCode * image * sizes[]
 *        sizes: discount * inventory * price * size[]
 *            size: [ "xs", "xs", "extra-small" ]
 */

/**
 * Notes: Product:
 * id * name * description * category[] * isNew * items * reviews[]
 *    items[3]: color: 'Black' * colorCode * image * sizes[5]
 *        sizes[0]: discount * inventory * price * size[3]
 *            size: [ "xs", "xs", "extra-small" ]
 */

// export type ProductType = {
//   id: string;
//   name: string;
//   description: string;
//   category: string[];
//   isNew: boolean;
//   items: ItemType[];
// }

// export type ItemType = {
//   color: string;
//   colorCode: string;
//   image: string;
//   sizes: SizeType[];
// }

// export type SizeType = {
//   size: string[];
//   price: number;
//   discount: number;
//   inventory: number;
// };
