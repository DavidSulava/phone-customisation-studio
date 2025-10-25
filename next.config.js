/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'davidsulava.github.io/public'],
  },
  reactStrictMode: true,
  output: 'export', // Enables static HTML export
  basePath: '/phone-customisation-studio', // Important for GitHub Pages subdirectories
};

module.exports = nextConfig;
