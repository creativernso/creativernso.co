import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    // Trimmed from Next's default 8-bucket set — the site's content column
    // never exceeds ~1400px, so larger buckets just added more distinct
    // cold-cache variants for Vercel's image optimizer to generate.
    deviceSizes: [640, 828, 1080, 1200, 1400, 1920, 2560],
    imageSizes: [16, 32, 64, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "mir-s3-cdn-cf.behance.net" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default withNextIntl(nextConfig);
