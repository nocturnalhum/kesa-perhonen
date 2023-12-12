/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'sketch-canvas-images.s3.ca-central-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
