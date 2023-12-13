export const products = [
  {
    id: '64a654593e91b8e73a351e9b',
    name: 'ribbed beanie',
    description:
      'Cotton material is used on the inside of the forehead area for less itchiness because of wool. You can easily wash it in your home washing machine.',
    price: 39.9,
    brand: 'muji',
    category: 'hats',
    inStock: 12,
    images: [
      {
        color: 'sand beige',
        colorCode: '#e2e1e1',
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/sand_700.jpg',
      },
      {
        color: 'grey',
        colorCode: '#7a7c7c',
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/grey_700.jpg',
      },
      {
        color: 'smokey green',
        colorCode: '#6b8e8a',
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/green_700.jpg',
      },
      {
        color: 'dark mustard',
        colorCode: '#c4841e',
        image:
          'https://kesa-perhonen.s3.ca-central-1.amazonaws.com/mustard_700.jpg',
      },
      {
        color: 'black',
        colorCode: '#000000',
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
    price: 99.9,
    brand: 'muji',
    category: 'sweater',
    inStock: 15,
    images: [
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
        id: '64a65a6158b470c6e06959ee',
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
  {
    id: '648437b38c44d52b9542e340',
    name: 'Apple iPhone 12, 64GB',
    description:
      'The product is refurbished, fully functional, and in excellent condition. Backed by the 90-day E~Shop Renewed Guarantee.\n- This pre-owned product has been professionally inspected, tested and cleaned by Amazon qualified vendors. It is not certified by Apple.\n- This product is in "Excellent condition". The screen and body show no signs of cosmetic damage visible from 12 inches away.\n- This product will have a battery that exceeds 80% capacity relative to new.\n- Accessories may not be original, but will be compatible and fully functional. Product may come in generic box.\n- Product will come with a SIM removal tool, a charger and a charging cable. Headphone and SIM card are not included.\n- This product is eligible for a replacement or refund within 90-day of receipt if it does not work as expected.\n- Refurbished phones are not guaranteed to be waterproof.',
    price: 40,
    brand: 'Apple',
    category: 'Phone',
    inStock: true,
    images: [
      {
        color: 'Black',
        colorCode: '#000000',
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-shop-vid.appspot.com/o/products%2Fiphone%2012%20black.png?alt=media&token=8fe19551-173a-4550-9d02-20afffc79b12',
      },
      {
        color: 'Blue',
        colorCode: ' #0000FF',
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-shop-vid.appspot.com/o/products%2Fiphone%2012%20blue.png?alt=media&token=ede757d2-b631-4451-b80c-123861f16c92',
      },
      {
        color: 'Red',
        colorCode: '#FF0000',
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-shop-vid.appspot.com/o/products%2Fiphone%2012%20red.png?alt=media&token=945e1ffb-953e-467a-8325-5a8fbbbf3153',
      },
    ],
    reviews: [
      {
        id: '6499b4887402b0efd394d8f3',
        userId: '6499b184b0e9a8c8709821d3',
        productId: '648437b38c44d52b9542e340',
        rating: 4,
        comment:
          'good enough. I like the camera and casing. the delivery was fast too.',
        createdDate: '2023-06-26T15:53:44.483Z',
        user: {
          id: '6499b184b0e9a8c8709821d3',
          name: 'Chaoo',
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
        comment: 'I really liked it!!',
        createdDate: '2023-06-26T14:30:40.998Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Charles',
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
    ],
  },
  {
    id: '64a4e9e77e7299078334019f',
    name: 'Logitech MX Master 2S Wireless Mouse – Use on Any Surface, Hyper-Fast Scrolling, Ergonomic Shape, Rechargeable, Control Upto 3 Apple Mac and Windows Computers, Graphite',
    description:
      'Cross computer control: Game changing capacity to navigate seamlessly on 3 computers, and copy paste text, images, and files from 1 to the other using Logitech flow\nDual connectivity: Use with upto 3 Windows or Mac computers via included Unifying receiver or Bluetooth Smart wireless technology. Gesture button- Yes',
    price: 70,
    brand: 'logitech',
    category: 'Accesories',
    inStock: true,
    images: [
      {
        color: 'Graphite',
        colorCode: ' #383838',
        image:
          'https://sketch-canvas-images.s3.ca-central-1.amazonaws.com/MX-Master-mouse.jpg',
      },
    ],
    reviews: [],
  },
  {
    id: '649d775128b6744f0f497040',
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker, after connecting to your phone via Bluetooth, you can directly use the smartwatches to answer or make calls, read messages, store contacts, view call history. The smartwatch can set up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: 'Nerunsa',
    category: 'Watch',
    inStock: true,
    images: [
      {
        color: 'Black',
        colorCode: '#000000',
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-shop-vid.appspot.com/o/products%2F1695192445608-watch-black.jpg?alt=media&token=4446b901-01ab-4152-8953-e36b22608755',
      },
      {
        color: 'Silver',
        colorCode: '#C0C0C0',
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-shop-vid.appspot.com/o/products%2F1695192448311-watch-silver.jpg?alt=media&token=a76bec63-f616-4647-9dd3-b3d23407ba4f',
      },
    ],
    reviews: [],
  },
];
