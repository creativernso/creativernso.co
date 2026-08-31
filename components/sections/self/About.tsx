"use client";

import { motion } from"framer-motion";
import { Link } from"@/i18n/navigation";
import { reveal, pillars } from"@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
 return (
 <section
 id="about"
 data-theme="dark"
 className="relative bg-ink py-10 text-bone md:py-14"
 >
 <div className="mx-auto max-w-[1600px] px-6 md:px-12">
 <div className="grid grid-cols-12 gap-6">
 <motion.div
 initial={{ opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.3 }}
 transition={{ duration: 0.55, ease: EASE }}
 className="col-span-12 md:col-span-5"
 >
 <div className="meta text-muted-2">about me</div>
 <h2 className="display mt-4 text-bone text-[clamp(34px,5.2vw,68px)]">
 Not a CV a thread.
 </h2>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.3 }}
 transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
 className="col-span-12 md:col-span-7"
 >
 <p className="text-[17px] leading-relaxed text-muted-2 md:text-[18px]">
 I&rsquo;ve spent the last eight years moving between three worlds,
 corporate institutions, expert professionals, and public-facing
 creators. Not as three careers. As a single inquiry:{""}
 <span className="text-bone">
 how does an entity come to be recognised at the level it actually
 operates?
 </span>{""}
 The instinct came first. The discipline followed. The method
 emerged from the pattern and the pattern was always there.
 </p>

 <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
 {pillars.map((p) => (
 <div key={p.numeral}>
 <div className="meta text-gold">{p.numeral}</div>
 <div className="mt-1 text-[14px] font-semibold text-bone">{p.name}</div>
 </div>
 ))}
 </div>
 </motion.div>
 </div>

 {/* REVEAL Framework strip */}
 <motion.div
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.3 }}
 transition={{ duration: 0.65, ease: EASE }}
 className="mt-20 overflow-hidden border border-bone/10 bg-black/30"
 >
 <div className="grid grid-cols-12 items-center gap-4 px-6 py-8 md:px-10">
 <div className="col-span-12 md:col-span-3">
 <div className="meta text-gold">methodology</div>
 <div className="mt-1 text-[18px] font-semibold text-bone">The REVEAL Framework</div>
 </div>
 <ol className="col-span-12 grid grid-cols-3 gap-3 md:col-span-9 md:grid-cols-6 md:gap-2">
 {reveal.map((s, i) => (
 <li
 key={i}
 className="group flex items-center gap-3 border border-bone/10 px-3 py-3 transition-colors hover:border-gold/50"
 >
 <span className="font-display text-2xl font-bold text-gold">
 {s.letter}
 </span>
 <div>
 <div className="meta text-muted-2">
 {String(i + 1).padStart(2,"0")}
 </div>
 <div className="text-[13px] font-medium text-bone">{s.name}</div>
 </div>
 </li>
 ))}
 </ol>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.5 }}
 transition={{ duration: 0.6, ease: EASE }}
 className="mt-16 flex justify-center"
 >
 <Link
 href="/initiate"
 data-cursor="hover"
 className="group inline-flex items-center gap-2 border border-bone/15 bg-bone/[0.03] px-6 py-3.5 text-[13.5px] font-semibold text-bone transition-colors hover:border-bone/40"
 >
 <span>Know more about me</span>
 <span
 aria-hidden
 className="text-gold transition-transform duration-200 ease-out group-hover:translate-x-0.5"
 >
 →
 </span>
 </Link>
 </motion.div>
 </div>
 </section>
 );
}
