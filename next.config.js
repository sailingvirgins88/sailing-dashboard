// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Remove the appDir option as it's no longer needed in Next.js 14
    },
    typescript: {
      ignoreBuildErrors: false,
    }
  };
  
  module.exports = nextConfig;