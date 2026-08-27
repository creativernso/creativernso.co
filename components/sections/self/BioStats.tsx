"use client";

import { motion, useInView } from"framer-motion";
import { useRef } from"react";
import Image from"next/image";
import Link from"next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BioStats() {
 const ref = useRef<HTMLDivElement>(null);
 const inView = useInView(ref, { once: true, amount: 0.25 });

 return (
 <section data-theme="dark"className="py-10 md:py-14">
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 <div
 ref={ref}
 className="relative overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-5 md:p-10"
 style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.14)"}}
 >
 <div className="md:grid md:grid-cols-12 md:gap-x-8">
 {/* Portrait — fills row height on desktop, aspect on mobile */}
 <div className="mb-8 md:col-span-5 md:mb-0">
 <div className="relative aspect-square overflow-hidden bg-black md:aspect-auto md:h-full">
 <Image
 src="/about-portrait.jpg"
 alt="Ernso Azor"
 fill
 sizes="(min-width: 768px) 40vw, 90vw"
 className="object-cover"
 />
 </div>
 </div>

 {/* Bio + stats + cta */}
 <div className="md:col-span-7">
 <h2 className="font-display text-bone text-[clamp(30px,4vw,52px)] font-bold leading-[1.1] tracking-[-0.04em]">
 I didn&rsquo;t choose branding.
 <br />
 Branding chose me.
 </h2>

 <div className="mt-8 space-y-5 text-[16px] leading-[1.65] text-muted-2 md:text-[19px] md:[text-align:justify]">
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
