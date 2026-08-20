"use client";

import { motion } from"framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BigQuestion() {
 return (
 <section
 data-theme="dark"
 className="relative overflow-hidden pb-20 text-bone md:pb-28"
 >
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.3 }}
 transition={{ duration: 0.6, ease: EASE }}
 className="relative grid grid-cols-12 items-center gap-6"
 >
 {/* Big repeated headline — sized so paragraph 1 = 2 lines, paragraph 2 = 1 line */}
 <div className="col-span-12 md:col-span-10">
 <p className="font-display text-[clamp(17px,2.4vw,28px)] font-normal uppercase leading-[1.25] tracking-[0.02em] text-bone">
 Whether you run a corporation, build expertise, or move audiences
 the question is always the same:
 </p>
 <p className="mt-3 font-display text-[clamp(17px,2.4vw,28px)] font-normal uppercase leading-[1.25] tracking-[0.02em] text-bone/30">
 Does the world see you the way you actually are?
 </p>
 </div>

 {/* Massive ghost question mark */}
 <div
 aria-hidden
 className="col-span-12 flex items-end justify-end md:col-span-2"
 >
 <span className="font-display text-[150px] font-normal leading-[0.85] text-bone/[0.08] md:text-[200px]">
 ?
 </span>
 </div>
 </motion.div>
 </div>
 </section>
 );
}
