import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    NEXT_PUBLIC_CLOUDINARY_APIKEY: process.env.NEXT_PUBLIC_CLOUDINARY_APIKEY,
  },
};

export default nextConfig;
