/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      's2.loli.net',
      'lh3.googleusercontent.com',
      'tiktok-qbijm2dug-easianyu.vercel.app',
      'tiktok-app-eosin.vercel.app',
      'tiktok-eji6j9wj9-easianyu.vercel.app',
    ],
  },
};

module.exports = nextConfig;
