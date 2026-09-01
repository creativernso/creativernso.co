export const worlds = [
  {
    numeral: "I",
    tag: "Institutional",
    title: "Corporations & Organizations",
    body: "For institutions that operate at scale and need a brand presence as strong as the work they do. Strategic identity systems that command credibility in boardrooms, with partners, and in public, before a single word is spoken.",
    sectors: ["Finance", "Healthcare", "Education", "Agriculture", "Public institution"],
  },
  {
    numeral: "II",
    tag: "Authority",
    title: "Professionals & Experts",
    body: "For driven professionals who have built real expertise and now need the world to see it clearly. A personal brand that positions them at the level they actually operate, not the one their current presence suggests.",
    sectors: ["Doctors", "Engineers", "Founders", "Consultants", "Executive"],
  },
  {
    numeral: "III",
    tag: "Creative",
    title: "Artists, Creators & Public Figures",
    body: "For artists, influencers, and public figures who move audiences but haven't yet built the brand architecture to match their talent. Full brand identity, social positioning, and a system that makes their presence as powerful as their work.",
    sectors: ["Artist", "Influence", "Content creators", "Performers", "Public figures"],
  },
] as const;

export type Project = {
  slug: string;
  n: string;
  world: "Institutional" | "Authority" | "Creative";
  sector: string;
  title: string;
  label: string;
  subtitle: string;
  overview: string[];
  date: string;
  tags: string[];
  year: string;
  image: string;
  hero: string;
  feature: string;
  gallery: string[];
  closer: string;
};

type ProjectTranslation = {
  title?: string;
  label?: string;
  subtitle?: string;
  overview?: string[];
  tags?: string[];
};

// Raw shape returned by Sanity, before locale resolution — see
// sanity/schemaTypes/project.ts and lib/sanity/queries.ts.
export type RawProject = Project & {
  i18n?: {
    pt?: ProjectTranslation;
    es?: ProjectTranslation;
  };
};

// Resolves a raw Sanity project into the shape components expect, applying
// the translation for `locale` (falling back to the English base fields for
// any translated field that's empty or missing).
export function localizeProject(p: RawProject, locale: string): Project {
  const { i18n, ...base } = p;
  const t =
    locale === "pt" || locale === "es" ? i18n?.[locale] : undefined;
  if (!t) return base;
  return {
    ...base,
    title: t.title || base.title,
    label: t.label || base.label,
    subtitle: t.subtitle || base.subtitle,
    overview: t.overview?.length ? t.overview : base.overview,
    tags: t.tags?.length ? t.tags : base.tags,
  };
}

// Project data now lives in Sanity (see sanity/schemaTypes/project.ts and
// lib/sanity/queries.ts) and is fetched at request/build time. The `Project`
// type above is kept as the shared shape consumed by WorkFilter, SelectedWork
// and the work pages, whichever the data source.

export const pillars = [
  {
    numeral: "I",
    name: "Revelation",
    desc: "Brands are uncovered, not invented. Whether a bank, a surgeon, or an artist the act of excavation is the same.",
  },
  {
    numeral: "II",
    name: "Elevation",
    desc: "Every client rises from where they are to a higher level of perception. Boardroom to authority. Studio to icon.",
  },
  {
    numeral: "III",
    name: "Precision",
    desc: "Deliberate. Nothing accidental. Every element earns its place.",
  },
  {
    numeral: "IV",
    name: "Certainty",
    desc: "Not persuasion conviction. The CEO, the doctor and the artist all feel it the same way: they know before they ask.",
  },
] as const;

export const reveal = [
  { letter: "R", name: "Root" },
  { letter: "E", name: "Excavate" },
  { letter: "V", name: "Voice" },
  { letter: "E", name: "Express" },
  { letter: "A", name: "Align" },
  { letter: "L", name: "Launch" },
] as const;

export const services = [
  {
    n: "01",
    name: "Brand Strategy",
    body: "Positioning, audience architecture, naming, voice the strategic foundation under everything that follows.",
    items: ["Positioning", "Naming", "Voice", "Narrative"],
  },
  {
    n: "02",
    name: "Identity Design",
    body: "Marks, typographic systems, colour, motion identity the visual surface of the truth uncovered.",
    items: ["Marks", "Typography", "Colour", "Motion"],
  },
  {
    n: "03",
    name: "Social Architecture",
    body: "Profile systems, content pillars, editorial calendars presence designed across platforms with one philosophy.",
    items: ["Profile Systems", "Pillars", "Calendars", "Voice"],
  },
  {
    n: "04",
    name: "Brand Experience",
    body: "Digital presence, print, environmental, launch direction every surface a brand actually meets the world on.",
    items: ["Web", "Print", "Environmental", "Launch"],
  },
] as const;
