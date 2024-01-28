export const products = [
  {
    id: '64a654593e91b8e73a351e9b',
    name: 'ribbed beanie',
    description:
      'Cotton material is used on the inside of the forehead area for less itchiness because of wool. You can easily wash it in your home washing machine.',
    category: ['men', 'women', 'accessories'],
    isNew: true,
    items: [
      {
        color: 'sand beige',
        colorCode: '#e2e1e1',
        sizes: [
          {
            size: ['os', 'os', 'one-size'],
            price: 19.9,
            discount: 10,
            inventory: 10,
          },
        ],

        image: 'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/sand.jpg',
      },
      {
        color: 'gray',
        colorCode: '#7a7c7c',
        sizes: [
          {
            size: ['os', 'os', 'one-size'],
            price: 19.9,
            discount: 10,
            inventory: 0,
          },
        ],

        image: 'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/gray.jpg',
      },
      {
        color: 'smokey green',
        colorCode: '#6b8e8a',
        sizes: [
          {
            size: ['os', 'os', 'one-size'],
            price: 19.9,
            discount: 10,
            inventory: 12,
          },
        ],

        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/smoky_green.jpg',
      },
      {
        color: 'dark mustard',
        colorCode: '#c4841e',
        sizes: [
          {
            size: ['os', 'os', 'one-size'],
            price: 19.9,
            discount: 10,
            inventory: 5,
          },
        ],

        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/dark_mustard.jpg',
      },
      {
        color: 'black',
        colorCode: '#000000',
        sizes: [
          {
            size: ['os', 'os', 'one-size'],
            price: 19.9,
            discount: 10,
            inventory: 2,
          },
        ],

        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/black_700.jpg',
      },
    ],
    reviews: [],
  },
  {
    id: '64a4ebe300900d44bb50628a',
    name: "Men's Merino Wool Cable Pattern Crew Neck Sweater",
    description:
      "Keep warm in style with this men's Merino wool cable pattern crew neck sweater. This high-quality sweater features a warm knit with a traditional pattern knitted on for texture. Perfect for any cold weather day.",
    category: ['men'],
    isNew: true,
    items: [
      {
        color: 'natural',
        colorCode: '#f7f3e3',
        sizes: [
          {
            size: ['xs', 'xs', 'extra-small'],
            price: 99.9,
            discount: 0,
            inventory: 2,
          },
          {
            size: ['s', 's', 'small'],
            price: 99.9,
            discount: 0,
            inventory: 21,
          },
          {
            size: ['m', 'm', 'medium'],
            price: 99.9,
            discount: 0,
            inventory: 12,
          },
          { size: ['l', 'l', 'large'], price: 99.9, discount: 0, inventory: 2 },
          {
            size: ['xl', 'xl', 'extra-large'],
            price: 99.9,
            discount: 0,
            inventory: 22,
          },
        ],
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/sweater_white_700.jpg',
      },
      {
        color: 'gray',
        colorCode: '#a3a2a0',
        sizes: [
          {
            size: ['xs', 'xs', 'extra-small'],
            price: 99.9,
            discount: 0,
            inventory: 2,
          },
          {
            size: ['s', 's', 'small'],
            price: 99.9,
            discount: 0,
            inventory: 21,
          },
          {
            size: ['m', 'm', 'medium'],
            price: 99.9,
            discount: 0,
            inventory: 12,
          },
          { size: ['l', 'l', 'large'], price: 99.9, discount: 0, inventory: 2 },
          {
            size: ['xl', 'xl', 'extra-large'],
            price: 99.9,
            discount: 0,
            inventory: 22,
          },
        ],
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/sweater_gray.jpg',
      },
      {
        color: 'black',
        colorCode: '#000000',
        sizes: [
          {
            size: ['xs', 'xs', 'extra-small'],
            price: 99.9,
            discount: 0,
            inventory: 2,
          },
          {
            size: ['s', 's', 'small'],
            price: 99.9,
            discount: 0,
            inventory: 21,
          },
          {
            size: ['m', 'm', 'medium'],
            price: 99.9,
            discount: 0,
            inventory: 12,
          },
          { size: ['l', 'l', 'large'], price: 99.9, discount: 0, inventory: 2 },
          {
            size: ['xl', 'xl', 'extra-large'],
            price: 99.9,
            discount: 0,
            inventory: 22,
          },
        ],
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/sweater_black.jpg',
      },
    ],
    reviews: [
      {
        id: '64a65a6158b470c6e06959fe',
        userId: '6475af156bad4917456e6e1e',
        productId: '64a4ebe300900d44bb50628a',
        rating: 5,
        title: 'Very good quality sweater love it',
        comment: `Beautiful sweater! Pls don't mind the first comment. I was pleasantly surprise by the quality of the article definitely worth the price!`,
        createdDate: '2023-07-06T06:08:33.067Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Henri',
          email: 'example@gmail.com',
          emailVerified: null,
          image: '',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'ADMIN',
        },
      },
      {
        id: '64a65a6158b470c6e06959ee',
        userId: '6475af156bad4917456e6e12',
        productId: '64a4ebe300900d44bb50628a',
        rating: 2,
        title: 'Too big',
        comment:
          "I think this is not a small sized.. maybe it would be a labeling issue. It's too big so it's like a blanket than sweater",
        createdDate: '2023-07-06T06:08:33.067Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Jiwook K.',
          email: 'example@gmail.com',
          emailVerified: null,
          image: '',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'USER',
        },
      },
    ],
  },
  {
    id: '648437b38c44d52b9542e340',
    name: "Women's High Gauge Wool Socks ",
    description:
      'Warm and soft socks made from pill-resistant wool yarn. Shrink-resistant and machine-washable.',
    category: ['women'],
    isNew: true,
    items: [
      {
        color: 'Gray',
        colorCode: '#a3a2a0',
        sizes: [
          {
            size: ['s', '21-23cm', '21-23cm (US W5-7 M3-5)'],
            price: 12.9,
            discount: 20,
            inventory: 2,
          },
          {
            size: ['m', '23-25cm', '23-25cm (US W7-9 M5-7.5)'],
            price: 12.9,
            discount: 20,
            inventory: 6,
          },
          {
            size: ['l', '25-27cm', '25-27cm (US W9-11 M7.5-10)'],
            price: 12.9,
            discount: 20,
            inventory: 5,
          },
        ],
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/cardigan_gray.jpg',
      },
      {
        color: 'Blue',
        colorCode: '#243c6d',
        sizes: [
          {
            size: ['s', '21-23cm', '21-23cm (US W5-7 M3-5)'],
            price: 12.9,
            discount: 20,
            inventory: 2,
          },
          {
            size: ['m', '23-25cm', '23-25cm (US W7-9 M5-7.5)'],
            price: 12.9,
            discount: 20,
            inventory: 6,
          },
          {
            size: ['l', '25-27cm', '25-27cm (US W9-11 M7.5-10)'],
            price: 12.9,
            discount: 20,
            inventory: 5,
          },
        ],
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/cardigan_blue.jpg',
      },
      {
        color: 'Red',
        colorCode: '#900C3F',
        sizes: [
          {
            size: ['s', '21-23cm', '21-23cm (US W5-7 M3-5)'],
            price: 12.9,
            discount: 20,
            inventory: 21,
          },
          {
            size: ['m', '23-25cm', '23-25cm (US W7-9 M5-7.5)'],
            price: 12.9,
            discount: 20,
            inventory: 16,
          },
          {
            size: ['l', '25-27cm', '25-27cm (US W9-11 M7.5-10)'],
            price: 12.9,
            discount: 20,
            inventory: 15,
          },
        ],
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/cardigan_red.jpg',
      },
    ],
    reviews: [
      {
        id: '6499b4887402b0efd394d8f3',
        userId: '6499b184b0e9a8c8709821d3',
        productId: '648437b38c44d52b9542e340',
        rating: 1,
        title: 'Very disappointing experience!!',
        comment:
          'I saw this style in the store, and I thought it was very lovely and cute. The material was very soft too. So I eventually placed an order online. I purchased two different colours. However, after one wash of the grey cardigan, the material became so wrinkly, and I had to iron it fully in order to wear it. I have never worn cardigans that would turn so wrinkly after washing. It is also not normal wrinkles, it looks like fish scales spreading all over the place, which is why you must iron it before wearing it out!!! And yet the writtings on the tag claim that this is a non-stretchy and non-linting fabric. It lints very bad to be honest. I decided to return the beige colour the following week. The grey one I have already washed so I can not return that anymore. Overall, I have been very disappointed with this purchase. A waste of money!!!',
        createdDate: '2023-06-26T15:53:44.483Z',
        user: {
          id: '6499b184b0e9a8c8709821d3',
          name: 'Huilin Z.',
          email: 'example1@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c',
          hashedPassword: null,
          createdAt: '2023-06-26T15:40:52.558Z',
          updatedAt: '2023-06-26T15:40:52.558Z',
          role: 'USER',
        },
      },
      {
        id: '6499a110efe4e4de451c7edc',
        userId: '6475af156bad4917456e6e1e',
        productId: '648437b38c44d52b9542e340',
        rating: 5,
        title: 'Very good',
        comment: 'Very good',
        createdDate: '2023-06-26T14:30:40.998Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Susan D.',
          email: 'example@gmail.com',
          emailVerified: null,
          image: '',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'ADMIN',
        },
      },
    ],
  },
  {
    id: '64a4e9e77e7299078334019f',
    name: 'Banko Ware Earthenware Pot 1600mL',
    description:
      'This 1600ml Japanese-style ceramic pot is ideal for serving 2-3 people. Perfect for making hot soup, rice, or having a family hot pot.',
    category: ['home decor'],
    isNew: true,
    items: [
      {
        color: 'natural',
        colorCode: ' #ffffff',
        sizes: [
          { size: 's', price: 29.9, discount: 0, inventory: 21 },
          { size: 'm', price: 39.9, discount: 0, inventory: 12 },
          { size: 'l', price: 59.9, discount: 0, inventory: 2 },
        ],
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/nabe_pot.jpg',
      },
    ],
    reviews: [],
  },
  {
    id: '649d775128b6744f0f497040',
    name: "Women's Kapok Blend Double Gauze Long Sleeve Dress",
    description:
      'An easy-to-wear dress that is light and comfortable, perfect for spring.\n\nThe soft gauze material is made from a blend of organic cotton and kapok, an environmentally friendly plant grown without pesticides. By using a fabric that mixes kapok with cotton, it is softer and lighter than conventional 100% cotton.\n\n[What is Kapok]\nThe fibre harvested from kapok nuts is a material with minimal environmental impact that can be cultivated with little fertilizer and water without pesticides. Because the fibre inside is hollow, it is light and contains a lot of air.',
    category: ['Women'],
    isNew: true,
    items: [
      {
        color: 'Black',
        colorCode: '#000000',
        sizes: [
          {
            size: ['xs', 'xs', 'extra-small'],
            price: 79.9,
            discount: 0,
            inventory: 2,
          },
          {
            size: ['s', 's', 'small'],
            price: 79.9,
            discount: 0,
            inventory: 21,
          },
          {
            size: ['m', 'm', 'medium'],
            price: 79.9,
            discount: 0,
            inventory: 12,
          },
          {
            size: ['l', 'l', 'large'],
            price: 79.9,
            discount: 0,
            inventory: 12,
          },
          {
            size: ['xl', 'xl', 'extra-large'],
            price: 79.9,
            discount: 0,
            inventory: 22,
          },
        ],

        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/dress_black.jpg',
      },
      {
        color: 'Green',
        colorCode: '#689282',
        sizes: [
          {
            size: ['xs', 'xs', 'extra-small'],
            price: 79.9,
            discount: 0,
            inventory: 12,
          },
          {
            size: ['s', 's', 'small'],
            price: 79.9,
            discount: 0,
            inventory: 21,
          },
          {
            size: ['m', 'm', 'medium'],
            price: 79.9,
            discount: 0,
            inventory: 12,
          },
          { size: ['l', 'l', 'large'], price: 79.9, discount: 0, inventory: 2 },
          {
            size: ['xl', 'xl', 'extra-large'],
            price: 79.9,
            discount: 0,
            inventory: 22,
          },
        ],

        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/dress_green.jpg',
      },
    ],
    reviews: [],
  },
];
