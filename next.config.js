/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;