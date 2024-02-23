import { CiShoppingTag } from 'react-icons/ci';
import { GiPencil } from 'react-icons/gi';
import { LiaSocksSolid } from 'react-icons/lia';
import { MdOutlineBorderAll } from 'react-icons/md';
import { PiBowlFoodLight, PiSuitcaseRollingLight } from 'react-icons/pi';
import { PiDressLight, PiShirtFoldedLight } from 'react-icons/pi';
import { TfiHome } from 'react-icons/tfi';
import { WiStars } from 'react-icons/wi';

export const categories = [
  {
    id: 0,
    category: 'All',
    icon: MdOutlineBorderAll,
    link: '',
  },
  {
    id: 1,
    category: 'women',
    icon: PiDressLight,
    link: '',
  },
  {
    id: 2,
    category: 'men',
    icon: PiShirtFoldedLight,
    link: '',
  },

  {
    id: 3,
    category: 'accessories',
    icon: LiaSocksSolid,
    link: '',
  },
  {
    id: 4,
    category: 'Home',
    icon: TfiHome,
    link: '',
  },
  {
    id: 5,
    category: 'food',
    icon: PiBowlFoodLight,
    link: '',
  },
  {
    id: 6,
    category: 'stationery',
    icon: GiPencil,
    link: '',
  },
  {
    id: 7,
    category: 'travel',
    icon: PiSuitcaseRollingLight,
    link: '',
  },
  {
    id: 8,
    category: 'Beauty',
    icon: WiStars,
    link: '',
  },
  {
    id: 9,
    category: 'sale',
    icon: CiShoppingTag,
    link: '',
  },
];
