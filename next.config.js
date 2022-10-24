/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["en.gravatar.com"],
  },
};

module.exports = nextConfig;
