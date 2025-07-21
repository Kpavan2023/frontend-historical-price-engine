/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Optional: if you use <Image>, needed for static export
  },
};

module.exports = nextConfig;
