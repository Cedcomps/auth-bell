/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'business.bell.ca',
              port: '',
            //   pathname: '/account123/**',
            },
          ],
    },
  };
  
  module.exports = nextConfig;