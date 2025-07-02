import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images : {
    formats : ["image/avif" , "image/webp"],
    remotePatterns : [
      {
        protocol: 'https',
        hostname : 'cdn.pixabay.com',
        pathname : '/**'
      }
    ]
  }
};

export default nextConfig;
