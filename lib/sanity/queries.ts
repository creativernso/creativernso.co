import { groq } from 'next-sanity'

// Projected to match the existing `Project` shape used across the site
// (WorkFilter, SelectedWork, work pages) — image fields resolve straight
// to CDN URL strings so no component code has to change.
const projectFields = groq`
  "slug": slug.current,
  n,
  world,
  sector,
  title,
  label,
  subtitle,
  overview,
  date,
  tags,
  year,
  "image": image.asset->url,
  "hero": hero.asset->url,
  "feature": feature.asset->url,
  "gallery": gallery[].asset->url,
  "closer": closer.asset->url,
`

export const projectsQuery = groq`
  *[_type == "project"] | order(coalesce(order, 999) asc) {
    ${projectFields}
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`
