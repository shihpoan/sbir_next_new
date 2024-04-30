/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["sbirdatas.s3.ap-northeast-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
