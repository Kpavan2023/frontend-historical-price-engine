/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.vue$/,
      use: ['vue-loader'],
    });
    return config;
  },
};

export default nextConfig;