// One-off migration: recreates the 7 projects that used to live in
// lib/content.ts as Sanity documents, so the site isn't empty after the
// move to Sanity. Placeholder picsum.photos images are uploaded as real
// Sanity image assets — swap them for real project photography in Studio
// whenever ready.
//
// Usage:
//   SANITY_API_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=... NEXT_PUBLIC_SANITY_DATASET=production node scripts/seed-projects.mjs
// (or just `node scripts/seed-projects.mjs` once .env.local is filled in and you `node --env-file=.env.local`)

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN env vars.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const img = (seed, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/ernso-${seed}/${w}/${h}`

const rawProjects = [
  {
    slug: 'atlas-reserve', n: '01', order: 1, world: 'Institutional', sector: 'Sovereign Finance',
    title: 'Atlas Reserve', label: 'Brand identity Design',
    subtitle: 'Brand identity design for a private finance institution.',
    overview: [
      "Atlas Reserve approached us with a single, exacting requirement: a presence that reads as authority before a word is spoken in the lobby, the ledger, and the briefing deck alike. The work began where every Ernso project begins: with truth. Not what the institution wanted to claim, but what was already true beneath its own communications.",
      "We rebuilt the identity around a seal-like monogram, a quiet editorial typographic system, and a stationery program designed to outlive a generation of brand fashion. The new system is now in use across investor reports, internal governance documents, and the institution's physical environments.",
      "Every element earned its place. Nothing decorative. Nothing accidental. The brand now signals the level at which Atlas Reserve actually operates and the right kind of client recognises it on contact.",
    ],
    date: '24 · 09 · 24', year: '2024', tags: ['Identity', 'Strategy'],
    image: img('atlas-reserve-card', 1200, 1000), hero: img('atlas-reserve-hero', 1800, 1100),
    feature: img('atlas-reserve-feature', 1800, 1100),
    gallery: [1, 2, 3, 4, 5, 6].map((i) => img(`atlas-reserve-g${i}`, 900, 700)),
    closer: img('atlas-reserve-closer', 1800, 1100),
  },
  {
    slug: 'ines-marchant', n: '02', order: 2, world: 'Authority', sector: 'Surgical Practice',
    title: 'Dr. Ines Marchant', label: 'Personal Brand & Web',
    subtitle: 'Personal brand and practice identity for a vascular surgeon.',
    overview: [
      "Dr. Marchant is a vascular surgeon at the top of her field. Her clinical work is unimpeachable. Her presence outside the operating theatre was not. The brief was deceptively simple: build an identity that makes the room understand who she is before she introduces herself.",
      "We delivered a personal mark, a practice identity, a patient-facing site, and a conference system all designed to translate clinical precision into visual silence.",
      "The brand now arrives before the consultation does. Referrals from peer specialists doubled in the first six months.",
    ],
    date: '11 · 03 · 24', year: '2024', tags: ['Personal Brand', 'Web'],
    image: img('ines-marchant-card', 1200, 1000), hero: img('ines-marchant-hero', 1800, 1100),
    feature: img('ines-marchant-feature', 1800, 1100),
    gallery: [1, 2, 3, 4, 5, 6].map((i) => img(`ines-marchant-g${i}`, 900, 700)),
    closer: img('ines-marchant-closer', 1800, 1100),
  },
  {
    slug: 'maya-phase-ii', n: '03', order: 3, world: 'Creative', sector: 'Recording Artist',
    title: 'MAYA Phase II', label: 'Artist Identity & Era System',
    subtitle: 'Complete artist identity and visual world for the second era.',
    overview: [
      "MAYA's second era required more than a cover refresh. It required a visual world a system that could carry singles, full releases, stage direction, social presence and the artist's own physical environments without losing a single thread.",
      "We built the identity, the era system, the release architecture, and the stage palette as one coordinated body of work. Every surface speaks the same language; every release moves the world forward, never sideways.",
      "Phase II launched in March and entered the conversation immediately the visual system did the work the music deserved.",
    ],
    date: '02 · 04 · 25', year: '2025', tags: ['Artist Brand', 'Era System'],
    image: img('maya-phase-ii-card', 1200, 1000), hero: img('maya-phase-ii-hero', 1800, 1100),
    feature: img('maya-phase-ii-feature', 1800, 1100),
    gallery: [1, 2, 3, 4, 5, 6].map((i) => img(`maya-phase-ii-g${i}`, 900, 700)),
    closer: img('maya-phase-ii-closer', 1800, 1100),
  },
  {
    slug: 'meridien-health', n: '04', order: 4, world: 'Institutional', sector: 'Public Healthcare',
    title: 'Méridien Health', label: 'Identity & Wayfinding',
    subtitle: 'Rebrand of a regional healthcare network.',
    overview: [
      "Méridien Health is a regional network of twenty-three facilities. The previous identity had drifted across two decades of operational pressure and read as institutional fatigue rather than care.",
      "We delivered an identity system designed to perform in three contexts simultaneously: the corridor (signage, wayfinding), the chart (patient-facing communications), and the parliament (policy documents). One system, three registers, zero compromises.",
      "The system rolled out across all facilities in nine months. Internal satisfaction scores rose. Patient confidence followed.",
    ],
    date: '17 · 11 · 23', year: '2023', tags: ['Identity', 'Wayfinding'],
    image: img('meridien-health-card', 1200, 1000), hero: img('meridien-health-hero', 1800, 1100),
    feature: img('meridien-health-feature', 1800, 1100),
    gallery: [1, 2, 3, 4, 5, 6].map((i) => img(`meridien-health-g${i}`, 900, 700)),
    closer: img('meridien-health-closer', 1800, 1100),
  },
  {
    slug: 'okonkwo-partners', n: '05', order: 5, world: 'Authority', sector: 'Founder Brand',
    title: 'Okonkwo & Partners', label: 'Positioning & Identity',
    subtitle: 'Founder-led consultancy positioning and identity.',
    overview: [
      "Okonkwo & Partners is a founder-led strategy consultancy. The challenge: make a single point of view feel like a firm, without losing the credibility of the founder's name on the door.",
      "We rebuilt the positioning around the founder's actual conviction, then designed an identity, thought-leadership system, and proposal architecture that all speak with one voice.",
      "The firm now reads as a singular intelligence credible without performance, premium without exclusivity.",
    ],
    date: '06 · 07 · 24', year: '2024', tags: ['Positioning', 'Identity'],
    image: img('okonkwo-partners-card', 1200, 1000), hero: img('okonkwo-partners-hero', 1800, 1100),
    feature: img('okonkwo-partners-feature', 1800, 1100),
    gallery: [1, 2, 3, 4, 5, 6].map((i) => img(`okonkwo-partners-g${i}`, 900, 700)),
    closer: img('okonkwo-partners-closer', 1800, 1100),
  },
  {
    slug: 'hotel-des-voix', n: '06', order: 6, world: 'Creative', sector: 'Cultural Editorial',
    title: 'Hôtel des Voix', label: 'Naming & Editorial Identity',
    subtitle: 'Naming, identity and editorial direction for an independent magazine.',
    overview: [
      "Hôtel des Voix is an independent cultural magazine launching into a market saturated with disposable editorial. The mandate was clear: a masthead designed to outlive its first decade and the trends within it.",
      "We delivered the name, the wordmark, the typographic system, and the digital identity as a single coordinated act. Editorial direction principles ensure the publication's voice survives editor turnover.",
      "The first issue arrived in March. The second sold out in nine days.",
    ],
    date: '20 · 01 · 25', year: '2025', tags: ['Naming', 'Editorial'],
    image: img('hotel-des-voix-card', 1200, 1000), hero: img('hotel-des-voix-hero', 1800, 1100),
    feature: img('hotel-des-voix-feature', 1800, 1100),
    gallery: [1, 2, 3, 4, 5, 6].map((i) => img(`hotel-des-voix-g${i}`, 900, 700)),
    closer: img('hotel-des-voix-closer', 1800, 1100),
  },
  {
    slug: 'vela-coast', n: '07', order: 7, world: 'Institutional', sector: 'Hospitality',
    title: 'Vela Coast', label: 'Brand identity Design',
    subtitle: 'Identity system for a coastal hospitality group.',
    overview: [
      "Vela Coast operates a portfolio of intimate coastal properties. The previous identity was generic luxury a category cliché. The new brand needed to feel specific to its geography without trapping the brand in a single aesthetic.",
      "We designed the wordmark, the property sub-brands, a print system that runs from welcome notes to wine lists, and a digital identity that performs across booking funnels and editorial features alike.",
      "The system is in place across all four properties.",
    ],
    date: '08 · 02 · 25', year: '2025', tags: ['Identity', 'Hospitality'],
    image: img('vela-coast-card', 1200, 1000), hero: img('vela-coast-hero', 1800, 1100),
    feature: img('vela-coast-feature', 1800, 1100),
    gallery: [1, 2, 3, 4, 5, 6].map((i) => img(`vela-coast-g${i}`, 900, 700)),
    closer: img('vela-coast-closer', 1800, 1100),
  },
]

const assetCache = new Map()

async function uploadImage(url) {
  if (assetCache.has(url)) return assetCache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename: url.split('/').pop() || 'image.jpg',
  })
  assetCache.set(url, asset)
  return asset
}

const imageField = (asset) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: asset._id },
})

async function seedProject(p) {
  const [image, hero, feature, closer, ...gallery] = await Promise.all([
    uploadImage(p.image),
    uploadImage(p.hero),
    uploadImage(p.feature),
    uploadImage(p.closer),
    ...p.gallery.map(uploadImage),
  ])

  const doc = {
    _id: `project-${p.slug}`,
    _type: 'project',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    order: p.order,
    n: p.n,
    world: p.world,
    sector: p.sector,
    label: p.label,
    subtitle: p.subtitle,
    overview: p.overview,
    date: p.date,
    year: p.year,
    tags: p.tags,
    image: imageField(image),
    hero: imageField(hero),
    feature: imageField(feature),
    gallery: gallery.map(imageField),
    closer: imageField(closer),
  }

  await client.createOrReplace(doc)
  console.log(`Seeded ${p.slug}`)
}

async function main() {
  for (const p of rawProjects) {
    await seedProject(p)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
