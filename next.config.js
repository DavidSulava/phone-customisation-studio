/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'davidsulava.github.io'],
  },
  reactStrictMode: true,
  output: 'export', // Enables static HTML export
  basePath: isProd ?'/phone-customisation-studio' : '', // Important for GitHub Pages subdirectories
  assetPrefix: isProd ?'/phone-customisation-studio' : '',
};

module.exports = nextConfig;
