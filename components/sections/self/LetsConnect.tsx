"use client";

import { motion } from"framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const links = [
 { label:"Email", value:"hello@ernsoazor.com", href:"mailto:hello@ernsoazor.com", icon:"✉"},
 { label:"Instagram", value:"@creativernso", href:"https://instagram.com/creativernso", icon:"◐"},
 { label:"LinkedIn", value:"Ernso Azor", href:"https://linkedin.com", icon:"in"},
 { label:"Behance", value:"Portfolio", href:"https://behance.net", icon:"Be"},
];

export default function LetsConnect() {
 return (
 <section
 id="contact"
 data-theme="dark"
 className="relative overflow-hidden bg-ink py-10 text-bone md:py-14"
 >
 <div className="mx-auto max-w-[1600px] px-6 md:px-12">
 <div className="grid grid-cols-12 gap-6">
 <motion.div
 initial={{ opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.4 }}
 transition={{ duration: 0.55, ease: EASE }}
 className="col-span-12 md:col-span-7"
 >
 <div className="meta text-muted-2">let&rsquo;s connect</div>
 <h2 className="display mt-4 text-bone text-[clamp(40px,7vw,108px)]">
 Have a brand worth revealing?
 </h2>
 <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted-2">
 Institutional, professional, or creative I reply to every inquiry
 within 48 hours. Tell me what world you arrive from.
 </p>
 <div className="mt-8 flex flex-wrap gap-3">
 <a
 href="mailto:hello@ernsoazor.com"
 data-cursor="hover"
 className="group inline-flex items-center gap-2 bg-bone px-6 py-3.5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-gold"
 >
 <span>Start the conversation</span>
 <span
 aria-hidden
 className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
 >
 →
 </span>
 </a>
 <a
 href="/work"
 data-cursor="hover"
 className="group inline-flex items-center gap-2 border border-bone/15 px-6 py-3.5 text-[13.5px] font-semibold text-bone transition-colors hover:border-bone/40"
 >
 <span>Browse work</span>
 <span aria-hidden className="text-gold">↗</span>
 </a>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.4 }}
 transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
 className="col-span-12 md:col-span-5"
 >
 <ul className="grid grid-cols-1 gap-3">
 {links.map((l) => (
 <li key={l.label}>
 <a
 href={l.href}
 target={l.href.startsWith("http") ?"_blank": undefined}
 rel="noreferrer"
 data-cursor="hover"
 className="group flex items-center justify-between gap-4 border border-bone/10 bg-black/30 backdrop-blur-md backdrop-saturate-100 px-5 py-4 transition-colors hover:border-gold/50"
 >
 <div className="flex items-center gap-4">
 <span className="inline-flex h-9 w-9 items-center justify-center border border-bone/15 text-[12px] font-semibold text-bone transition-colors group-hover:border-gold group-hover:text-gold">
 {l.icon}
 </span>
 <div>
 <div className="meta text-muted-2">{l.label}</div>
 <div className="text-[14px] font-medium text-bone">{l.value}</div>
 </div>
 </div>
 <span aria-hidden className="text-muted transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-gold">
 →
 </span>
 </a>
 </li>
 ))}
 </ul>
 </motion.div>
 </div>
 </div>
 </section>
 );
}
