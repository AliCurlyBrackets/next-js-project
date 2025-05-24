/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/subfolder" : "",
  trailingSlash: true, // Recommended for cPanel deployment
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.baytalhikma2.org",
        pathname: "/api/v1/storages/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
