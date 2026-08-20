"use client";

import Marquee from"@/components/primitives/Marquee";

const items = [
"Revealing what was always there",
"One philosophy",
"Three worlds",
"No average",
"Brand strategy",
"Identity design",
"@creativernso",
];

export default function HeroMarquee() {
 return (
 <div
 data-theme="dark"
 className="relative overflow-hidden bg-ink py-5 text-bone"
 >
 <Marquee
 duration={42}
 text={items.map((i) => `${i} · `).join("")}
 className="font-display text-[clamp(22px,3vw,36px)] font-medium tracking-tight text-bone/95"
 />
 </div>
 );
}
