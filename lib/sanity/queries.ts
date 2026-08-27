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
  "image": image.asset->url + "?w=1300&q=82&auto=format",
  "hero": hero.asset->url + "?w=2600&q=82&auto=format",
  "feature": feature.asset->url + "?w=2600&q=82&auto=format",
  "gallery": gallery[]{ "url": asset->url + "?w=2600&q=82&auto=format" }.url,
  "closer": closer.asset->url + "?w=2000&q=82&auto=format",
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
