"use client";

import { motion, useInView, animate } from"framer-motion";
import { useEffect, useRef, useState } from"react";
import Image from"next/image";
import Link from"next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
 { target: 8, suffix:"+", label:"Experience"},
 { target: 50, suffix:"+", label:"Brands revealed"},
 { target: 3, label:"Worlds served"},
];

function Counter({
 target,
 suffix,
 start,
 delay,
}: {
 target: number;
 suffix?: string;
 start: boolean;
 delay: number;
}) {
 const [value, setValue] = useState(0);
 useEffect(() => {
 if (!start) return;
 const c = animate(0, target, {
 duration: 2.2,
 delay,
 ease: EASE,
 onUpdate: (v) => setValue(v),
 });
 return () => c.stop();
 }, [start, target, delay]);
 return (
 <span className="tabular-nums">
 {Math.round(value)}
 {suffix}
 </span>
 );
}

export default function BioStats() {
 const ref = useRef<HTMLDivElement>(null);
 const inView = useInView(ref, { once: true, amount: 0.25 });

 return (
 <section data-theme="dark">
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 <div
 ref={ref}
 className="relative overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-5 md:p-10"
 style={{ boxShadow:"inset 0 0 0 0.5px rgba(255,255,255,0.08)"}}
 >
 <div className="grid grid-cols-12 gap-x-8 gap-y-10">
 {/* Portrait — fills row height on desktop, aspect on mobile */}
 <div className="col-span-12 md:col-span-5">
 <div className="relative aspect-square overflow-hidden bg-black md:aspect-auto md:h-full">
 <Image
 src="/about-portrait.png"
 alt="Ernso Azor"
 fill
 sizes="(min-width: 768px) 40vw, 90vw"
 className="object-cover"
 />
 </div>
 </div>

 {/* Bio + stats + cta */}
 <div className="col-span-12 md:col-span-7">
 <h2 className="font-display text-bone text-[clamp(30px,4vw,52px)] font-normal leading-[1.1] tracking-[-0.04em]">
 I didn&rsquo;t choose branding.
 <br />
 Branding chose me.
 </h2>

 <div className="mt-8 max-w-2xl space-y-5 text-[16px] leading-[1.65] text-muted-2 md:text-[19px] md:[text-align:justify] md:">
 <p>
 It started long before I knew what design was. I was the one who
 noticed everything the way a logo felt wrong, the way a colour
 lifted a mood, the way certain names stayed in your mind while
 others disappeared.
 </p>
 <p>
 I was paying attention to identity before I had language for it.
 Over 8+ years, across three very different worlds, from
 corporate boardrooms to artists' studios, I have done the same
 thing every time: find the truth that was always there, and
 make it impossible to ignore.
 </p>
 </div>

 {/* Stats row */}
 <div className="mt-10 grid grid-cols-3 gap-3 border-t border-bone/10 pt-8 md:gap-6">
 {stats.map((s, i) => (
 <div key={s.label}>
 <div className="font-display text-bone text-[clamp(36px,4.2vw,58px)] font-normal leading-[1] tracking-[-0.04em]">
 <Counter
 target={s.target}
 suffix={s.suffix}
 start={inView}
 delay={0.3 + i * 0.15}
 />
 </div>
 <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-2 md:text-[12px]">
 {s.label}
 </div>
 </div>
 ))}
 </div>

 {/* CTA */}
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
 className="mt-10"
 >
 <Link
 href="/about"
 data-cursor="hover"
 data-press
 className="flex w-full items-center justify-center gap-2 border border-bone/20 px-6 py-5 text-[13px] font-medium uppercase tracking-[0.22em] text-bone transition-colors hover:bg-bone hover:text-black md:text-[14px]"
 >
 Read my story
 </Link>
 </motion.div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
