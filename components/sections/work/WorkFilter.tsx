"use client";

import { useState } from"react";
import { motion, AnimatePresence, LayoutGroup } from"framer-motion";
import Image from"next/image";
import Link from"next/link";
import type { Project } from"@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const filters = [
 { key:"All", label:"All works"},
 { key:"Institutional", label:"institutional"},
 { key:"Authority", label:"Individual"},
 { key:"Creative", label:"Creative & Public"},
] as const;

type Key = (typeof filters)[number]["key"];

export default function WorkFilter({
 projects,
}: {
 projects: readonly Project[];
}) {
 const [active, setActive] = useState<Key>("All");
 const filtered =
 active ==="All"? [...projects] : projects.filter((p) => p.world === active);

 return (
 <>
 {/* Filter tabs */}
 <LayoutGroup>
 <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-14 md:gap-10">
 {filters.map((f) => {
 const isActive = f.key === active;
 return (
 <button
 key={f.key}
 onClick={() => setActive(f.key)}
 data-cursor="hover"
 className={`relative isolate text-[13px] transition-colors md:text-[20px] ${
 isActive ?"text-bone":"text-bone/65 hover:text-bone"
 }`}
 >
 {isActive && (
 <motion.span
 layoutId="work-tab-ring"
 className="absolute inset-0 -z-10 border border-bone/20"
 transition={{ duration: 0.55, ease: EASE }}
 />
 )}
 <span
 className={`relative block ${
 isActive ?"px-3 py-1.5 md:px-6 md:py-3":"py-1.5 md:py-3"
 }`}
 >
 {f.label}
 </span>
 </button>
 );
 })}
 </div>
 </LayoutGroup>

 {/* Grid — sticky cards stack as user scrolls */}
 <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 md:mt-8 md:grid-cols-2 md:gap-x-8 md:gap-y-8">
 <AnimatePresence mode="popLayout"initial={false}>
 {filtered.map((p, i) => (
 <motion.div
 key={p.slug}
 layout
 initial={{ opacity: 0, y: 24 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -12 }}
 transition={{ duration: 0.7, ease: EASE }}
 className="sticky"
 style={{ top: `calc(96px + ${i * 14}px)` }}
 >
 <Link
 href={`/work/${p.slug}`}
 data-cursor="hover"
 className="group block"
 >
 <article
 className="overflow-hidden bg-black/70 p-3 backdrop-blur-2xl md:p-4"
 style={{
 boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.14)",
 }}
 >
 {/* Image — inset inside the outer container */}
 <div className="relative aspect-[5/4] overflow-hidden bg-black">
 <Image
 src={p.image}
 alt={p.title}
 fill
 sizes="(min-width: 1400px) 620px, (min-width: 768px) 45vw, 90vw"
 quality={92}
 className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.04]"
 />
 </div>

 {/* Title + tag pills row — same line on all viewports */}
 <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2 pb-1 md:mt-5">
 <h3 className="font-display text-[16px] font-bold leading-tight text-bone md:text-[20px]">
 {p.title}
 </h3>
 <ul className="flex flex-wrap items-center gap-1.5 md:gap-2">
 {(p.tags ?? []).map((tag) => (
 <li
 key={tag}
 className="px-2.5 py-1 text-[10px] font-medium text-bone/85 md:px-3.5 md:py-1.5 md:text-[12px]"
 style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.14)"}}
 >
 {tag}
 </li>
 ))}
 </ul>
 </div>
 </article>
 </Link>
 </motion.div>
 ))}
 </AnimatePresence>
 </div>

 {filtered.length === 0 && (
 <div className="mt-12 border border-bone/15 bg-black/30 backdrop-blur-md backdrop-saturate-100 p-10 text-center">
 <p className="text-[14px] text-muted-2">
 Nothing in this world yet check back soon, or browse other
 categories.
 </p>
 </div>
 )}
 </>
 );
}
