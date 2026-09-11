import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { routing } from "@/i18n/routing";

const baseUrl = "https://creativernso.co";

const staticPaths = [
  "",
  "/offer",
  "/about",
  "/work",
  "/initiate",
  "/services",
  "/privacy",
  "/terms",
];

// localePrefix is "as-needed": the default locale has no prefix in the URL,
// the others are prefixed with /pt or /es.
function localizedUrl(locale: string, path: string) {
  if (locale === routing.defaultLocale) return `${baseUrl}${path || "/"}`;
  return `${baseUrl}/${locale}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch<{ slug: string }[]>(
    `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`
  );
  const projectPaths = projects.map((p) => `/work/${p.slug}`);
  const paths = [...staticPaths, ...projectPaths];

  return paths.map((path) => ({
    url: localizedUrl(routing.defaultLocale, path),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, path)])
      ),
    },
  }));
}
