import type { NextConfig } from "next"

const backendUrl = new URL(
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
)

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Demo catalogue imagery (Unsplash licence) — remove once real shoots are uploaded
      { protocol: "https", hostname: "images.unsplash.com" },
      // Files uploaded through the Medusa admin (local file provider in development)
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port,
      },
      // Object storage / CDN for production uploads (configure S3_FILE_URL host here)
      ...(process.env.NEXT_PUBLIC_MEDIA_HOST
        ? [{ protocol: "https" as const, hostname: process.env.NEXT_PUBLIC_MEDIA_HOST }]
        : []),
    ],
  },
}

export default nextConfig
