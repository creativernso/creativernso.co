"use client";

import { motion } from"framer-motion";
import Image from"next/image";
import Link from"next/link";
import { useRef } from"react";
import { useFitText } from"@/lib/useFitText";
import type { Project } from"@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SelectedWork({ projects }: { projects: Project[] }) {
 const featured = projects.slice(0, 6);
 const gridRef = useRef<HTMLDivElement>(null);
 const { textRef, fontSize } = useFitText<HTMLHeadingElement>(gridRef);

 return (
 <section
 id="work"
 data-theme="dark"
 className="relative py-10 text-bone md:py-14"
 >
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 {/* Title — auto-scaled to match the width of the project grid below */}
 <motion.h2
 ref={textRef}
 initial={{ opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.4 }}
 transition={{ duration: 0.55, ease: EASE }}
 className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.04em]"
 style={{
 fontSize: fontSize ? `${fontSize}px` :"clamp(44px, 6vw, 120px)",
 }}
 >
 Selected work.
 </motion.h2>

 {/* Project cards grid */}
 <div
 ref={gridRef}
 className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-2 md:gap-8"
 >
 {featured.map((p, i) => (
 <motion.div
 key={p.slug}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.2 }}
 transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
 >
 <Link
 href={`/work/${p.slug}`}
 data-cursor="hover"
 className="group block"
 >
 <article
 className="overflow-hidden bg-black/30 p-3 backdrop-blur-md backdrop-saturate-100 md:p-4"
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
 className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
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
 style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.22)"}}
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
 </div>

 {/* Pill CTA with arrow */}
 <motion.div
 initial={{ opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.6 }}
 transition={{ duration: 0.6, ease: EASE }}
 className="mt-6 md:mt-8"
 >
 <Link
 href="/work"
 data-cursor="hover"
 data-press
 className="group inline-flex items-center gap-4 bg-black/30 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-md transition-colors hover:bg-bone hover:text-black md:text-[13px]"
 style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.22)"}}
 >
 <span>See all projects</span>
 <span
 aria-hidden
 className="inline-flex h-5 w-5 items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-1"
 >
 <svg
 width="20"
 height="12"
 viewBox="0 0 20 12"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 <path d="M1 6h18M13 1l6 5-6 5"/>
 </svg>
 </span>
 </Link>
 </motion.div>
 </div>
 </section>
 );
}
