export const needOptions = [
  {
    key: "strategy",
    label: "Brand Strategy & Positioning",
    desc: "Naming, messaging, market positioning",
    low: 1500,
    high: 3000,
  },
  {
    key: "identity",
    label: "Visual Identity System",
    desc: "Logo, guidelines, full visual language",
    low: 2500,
    high: 5000,
  },
  {
    key: "website",
    label: "Website & Digital Presence",
    desc: "Design and build of your site",
    low: 3000,
    high: 6500,
  },
  {
    key: "support",
    label: "Ongoing Brand Support",
    desc: "Retainer-based direction and rollout",
    low: 800,
    high: 1500,
  },
] as const;

export type NeedKey = (typeof needOptions)[number]["key"];

export const timelineOptions = [
  {
    key: "flexible",
    label: "Flexible",
    desc: "No fixed deadline",
    multiplier: 0.9,
  },
  {
    key: "standard",
    label: "Standard",
    desc: "6 to 8 weeks",
    multiplier: 1,
  },
  {
    key: "accelerated",
    label: "Accelerated",
    desc: "3 to 4 weeks, priority track",
    multiplier: 1.25,
  },
] as const;

export type TimelineKey = (typeof timelineOptions)[number]["key"];

export function computeQuote(needs: NeedKey[], timeline: TimelineKey) {
  const selected = needOptions.filter((n) => needs.includes(n.key));
  const mult =
    timelineOptions.find((t) => t.key === timeline)?.multiplier ?? 1;

  const rawLow = selected.reduce((sum, n) => sum + n.low, 0) * mult;
  const rawHigh = selected.reduce((sum, n) => sum + n.high, 0) * mult;

  const round = (n: number) => Math.round(n / 100) * 100;

  return { low: round(rawLow), high: round(rawHigh) };
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
