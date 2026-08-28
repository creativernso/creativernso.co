"use client";

import Link from"next/link";
import { motion } from"framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ReadyToBeSeen() {
 return (
 <section data-theme="dark"className="pb-10 md:pb-14">
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 <motion.div
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.4 }}
 transition={{ duration: 0.6, ease: EASE }}
 className="relative overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 px-5 py-7 md:px-12 md:py-14"
 style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.14)"}}
 >
 <div className="flex flex-col items-start gap-6 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-8">
 <div className="max-w-xl">
 <h2 className="font-display text-bone text-[clamp(24px,3.6vw,48px)] font-bold leading-[1.15] tracking-[-0.03em]">
 Ready to be seen?
 </h2>
 <p className="mt-3 text-[14px] leading-[1.5] text-muted-2 md:mt-4 md:text-[18px]">
 Tell me about your vision. I&rsquo;ll tell you how to make it
 unmissable.
 </p>
 </div>
 <Link
 href="/initiate"
 data-cursor="hover"
 data-press
 className="inline-flex items-center gap-2 border border-bone/20 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-bone transition-colors hover:bg-bone hover:text-black md:px-9 md:py-4 md:text-[14px]"
 >
 Initiate
 </Link>
 </div>
 </motion.div>
 </div>
 </section>
 );
}
