import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Разрешаем изображения из S3/Blob и внешних источников каталога.
    remotePatterns: [
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "**.storage.yandexcloud.net" },
    ],
  },
};

export default nextConfig;
