import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    // Vercel's Image Optimization has a monthly quota on unique source
    // images; this site (dozens of Sanity projects, ~10+ images each) blew
    // past it and every image — Sanity photos and local /public assets
    // alike — started 402ing site-wide. Serve images unoptimized so they
    // load directly instead of going through that pipeline. Sanity's own
    // CDN already resizes/serves its images efficiently, so the loss here
    // is mostly local /public assets not getting responsive variants.
    unoptimized: true,
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
