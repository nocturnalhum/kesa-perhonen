/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'kesa-perhonen.s3.ca-central-1.amazonaws.com',
      'firebasestorage.googleapis.com',
    ],
  },
};

module.exports = nextConfig;
