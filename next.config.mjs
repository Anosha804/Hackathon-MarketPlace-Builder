/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["cdn.sanity.io"],
    },
    webpack: (config) => {
      config.cache = false; // Disable Webpack cache
      return config;
    },
  };
  
  export default nextConfig;