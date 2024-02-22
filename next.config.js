/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      });
    }

    return config;
  },

  images: {
    domains: [
      'lh3.googleusercontent.com',
      'kesa-perhonen.s3.ca-central-1.amazonaws.com',
      'firebasestorage.googleapis.com',
    ],
  },
};

module.exports = nextConfig;
