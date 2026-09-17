// Sanity's CDN transforms images on the fly via URL params (official Image
// URL API: https://www.sanity.io/docs/image-urls). The GROQ queries resolve
// image fields straight to the raw asset URL (full original resolution —
// some uploads are 30MB+), so every <Image unoptimized> call must append
// these params itself to get a browser-appropriate, compressed version.
export function sanityImageUrl(url: string, width: number, quality = 80) {
  if (!url) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&q=${quality}&auto=format&fit=max`;
}
