"use client";

import { motion } from"framer-motion";
import { worlds } from"@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ThreeWorlds() {
 return (
 <section
 data-theme="dark"
 className="relative py-10 text-bone md:py-14"
 >
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 {/* Title only */}
 <motion.h2
 initial={{ opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.4 }}
 transition={{ duration: 0.55, ease: EASE }}
 className="font-display text-bone text-[clamp(36px,4.6vw,60px)] font-normal leading-[1.1] tracking-[-0.04em]"
 >
 The worlds I operate in.
 </motion.h2>

 {/* Three cards */}
 <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
 {worlds.map((w, i) => (
 <motion.article
 key={w.numeral}
 initial={{ opacity: 0, y: 28 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.3 }}
 transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
 className="sticky flex flex-col overflow-hidden bg-black/30 px-5 py-7 backdrop-blur-md backdrop-saturate-100 md:static md:min-h-[520px] md:px-10 md:py-12"
 style={{
 top: `calc(96px + ${i * 14}px)`,
 boxShadow:"inset 0 0 0 0.5px rgba(255,255,255,0.08)",
 }}
 data-cursor="hover"
 >
 {/* Ghost numeral — top right, slight overflow */}
 <div className="pointer-events-none flex justify-end">
 <span
 aria-hidden
 className="select-none font-display text-[150px] font-normal leading-[0.85] text-bone/[0.07] md:text-[190px]"
 style={{
 marginTop:"-18px",
 marginRight:"-6px",
 }}
 >
 {String(i + 1).padStart(2,"0")}
 </span>
 </div>

 {/* Title + body */}
 <div className="mt-6 flex flex-col gap-5 md:mt-8">
 <h3 className="font-display text-bone text-[26px] font-normal leading-[1.2] tracking-[-0.02em] md:text-[32px]">
 {w.title}
 </h3>
 <p className="text-[15px] leading-[1.6] text-muted-2 md:text-[17px] text-justify">
 {w.body}
 </p>
 </div>

 {/* Sectors — tight against the body text */}
 <ul className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[9.5px] uppercase leading-[1.8] tracking-[0.06em] text-muted-2 md:mt-6 md:gap-x-2 md:text-[11px] md:tracking-[0.12em]">
 {w.sectors.map((s, si) => (
 <li key={s} className="flex items-center gap-x-1.5 md:gap-x-2">
 <span className="whitespace-nowrap">{s}</span>
 {si < w.sectors.length - 1 && (
 <span aria-hidden className="text-bone/25">|</span>
 )}
 </li>
 ))}
 </ul>
 </motion.article>
 ))}
 </div>
 </div>
 </section>
 );
}
