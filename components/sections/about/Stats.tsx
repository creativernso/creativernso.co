"use client";

import { useEffect, useRef, useState } from"react";
import { motion, useInView, animate } from"framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

type Stat = {
 target: number;
 suffix?: string;
 labelKey: "experience" | "brandsRevealed" | "worldsServed";
};

const stats: Stat[] = [
 { target: 8, suffix:"+", labelKey:"experience"},
 { target: 80, suffix:"+", labelKey:"brandsRevealed"},
 { target: 3, labelKey:"worldsServed"},
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
 const controls = animate(0, target, {
 duration: 2.4,
 delay,
 ease: [0.16, 1, 0.3, 1],
 onUpdate: (v) => setValue(v),
 });
 return () => controls.stop();
 }, [start, target, delay]);

 return (
 <span className="tabular-nums">
 {Math.round(value)}
 {suffix}
 </span>
 );
}

export default function Stats() {
 const t = useTranslations("about.stats");
 const ref = useRef<HTMLDivElement>(null);
 const inView = useInView(ref, { once: true, amount: 0.35 });

 return (
 <div
 ref={ref}
 className="mt-8 grid grid-cols-3 gap-x-0 gap-y-3 md:mt-10"
 >
 {stats.map((s, i) => {
 const numberDelay = 0.2 + i * 0.18;
 const labelDelay = numberDelay + 2.3;

 return (
 <motion.div
 key={s.labelKey}
 className="relative text-center"
 initial={{ opacity: 0, y: 64 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{
 duration: 0.8,
 delay: 0.1 + i * 0.12,
 ease: EASE,
 }}
 >
 {/* Vertical divider (skip on the first column) */}
 {i > 0 && (
 <motion.span
 aria-hidden
 className="absolute left-0 top-2 bottom-6 w-px bg-bone/10"
 initial={{ scaleY: 0, originY: 0.5 }}
 animate={inView ? { scaleY: 1 } : {}}
 transition={{
 duration: 0.8,
 delay: 0.2 + i * 0.12,
 ease: EASE,
 }}
 style={{ transformOrigin:"center"}}
 />
 )}
 {/* Soft gold glow behind the number, breathes subtly */}
 <motion.div
 aria-hidden
 className="pointer-events-none absolute inset-x-1/4 top-2 -z-10 h-3/4 blur-3xl"
 initial={{ opacity: 0 }}
 animate={
 inView
 ? { opacity: [0, 0.35, 0.18, 0.28, 0.18] }
 : { opacity: 0 }
 }
 transition={{
 duration: 6,
 delay: numberDelay,
 ease:"easeInOut",
 repeat: Infinity,
 repeatType:"mirror",
 }}
 style={{
 background:
"radial-gradient(circle, rgba(230,169,91,0.35) 0%, rgba(230,169,91,0) 70%)",
 }}
 />

 {/* The animated number */}
 <motion.div
 className="relative font-display text-bone text-[clamp(80px,22vw,160px)] font-normal leading-[1] tracking-[-0.05em]"
 initial={{ scale: 0.94 }}
 animate={inView ? { scale: [0.94, 1.02, 1] } : {}}
 transition={{
 duration: 2.6,
 delay: numberDelay,
 ease: EASE,
 times: [0, 0.85, 1],
 }}
 >
 <Counter
 target={s.target}
 suffix={s.suffix}
 start={inView}
 delay={numberDelay}
 />
 </motion.div>

 {/* Label, fades in after the number settles */}
 <motion.div
 initial={{ opacity: 0, y: 8 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{
 duration: 1,
 delay: labelDelay,
 ease: EASE,
 }}
 className="mt-1.5 whitespace-nowrap font-mono text-[5px] uppercase tracking-[0.08em] text-muted-2 md:mt-2 md:text-[11px] md:tracking-[0.45em]"
 >
 {t(s.labelKey)}
 </motion.div>
 </motion.div>
 );
 })}
 </div>
 );
}
