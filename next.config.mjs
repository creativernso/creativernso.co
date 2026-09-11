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
    // images. Sanity content (dozens of projects, ~10+ images each) blew
    // past it on its own, so every Sanity-sourced <Image> passes its own
    // `unoptimized` prop to skip Vercel's pipeline entirely — Sanity's CDN
    // already resizes/serves those efficiently. That leaves this config's
    // default optimization in effect for the small, fixed set of local
    // /public assets (hero images, process photos, etc.), which is what
    // gets them resized/compressed per device instead of shipping the
    // full-size source to every viewport.
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
