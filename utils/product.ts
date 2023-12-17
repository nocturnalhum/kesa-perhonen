export const products = [
  {
    id: '64a4ebe300900d44bb50628a',
    name: "Men's Merino Wool Cable Pattern Crew Neck Sweater",
    description:
      "Keep warm in style with this men's Merino wool cable pattern crew neck sweater. This high-quality sweater features a warm knit with a traditional pattern knitted on for texture. Perfect for any cold weather day.",
    price: 99.9,
    brand: 'muji',
    category: 'sweater',
    inStock: 3,
    items: [
      {
        color: 'natural',
        colorCode: '#f7f3e3 ',
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/sweater_white_700.jpg',
      },
      {
        color: 'grey',
        colorCode: '#a3a2a0',
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/sweater_gray_700.jpg',
      },
      {
        color: 'black',
        colorCode: '#000000',
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/sweater_black_700.jpg',
      },
    ],
    reviews: [
      {
        id: '64a65a6158b470c6e06959ee',
        userId: '6475af156bad4917456e6e1e',
        productId: '64a4ebe300900d44bb50628a',
        rating: 5,
        title: 'Very good quality sweater love it',
        comment:
          'Beautiful fleece! Pls don’t mind the first comment. I was pleasantly surprise by the quality of the article definitely not worth the price!',
        createdDate: '2023-07-06T06:08:33.067Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Henri',
          email: 'example@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'ADMIN',
        },
      },
      {
        id: '64a65a6158b470c6e06958ee',
        userId: '6475af156bad4917456e6e12',
        productId: '64a4ebe300900d44bb50628a',
        rating: 2,
        title: 'Too big',
        comment:
          "I think this is not a small sized.. maybe it would be a labeling issue. It's too big so it's like a blanket than jacket",
        createdDate: '2023-07-06T06:08:33.067Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Jiwook K.',
          email: 'example@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'USER',
        },
      },
    ],
  },
];
