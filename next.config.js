/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  reactStrictMode: true,
  images: {
    domains: ['s2.loli.net', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
