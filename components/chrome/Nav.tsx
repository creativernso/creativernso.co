"use client";

import Link from"next/link";
import { useEffect, useState } from"react";
import { AnimatePresence, motion } from"framer-motion";

const items = [
 { label:"Self", href:"/"},
 { label:"Story", href:"/about"},
 { label:"Belief", href:"/services"},
 { label:"Creations", href:"/work"},
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
 const [open, setOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 32);
 onScroll();
 window.addEventListener("scroll", onScroll, { passive: true });
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 return (
 <>
 <header className="fixed inset-x-0 top-0 z-50 flex h-[100px] items-center md:h-[120px]">
 <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between px-12 md:px-24">
 {/* Pill background — fades in on scroll, aligned with the Hero frame edges */}
 <span
 aria-hidden
 className={`pointer-events-none absolute inset-x-6 -inset-y-3 bg-black/30 backdrop-blur-lg transition-opacity duration-[900ms] md:inset-x-12 md:-inset-y-4 ${
 scrolled ?"opacity-100":"opacity-0"
 }`}
 style={{
 boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)",
 transitionTimingFunction:"cubic-bezier(0.22, 1, 0.36, 1)",
 }}
 />

 <Link
 href="/"
 scroll={false}
 data-cursor="hover"
 className="relative z-10 font-display text-[18px] font-semibold tracking-tight text-bone md:text-[19px]"
 >
 Ernso Azor
 </Link>

 <nav className="relative z-10 hidden items-center gap-8 md:flex">
 {items.map((item) => (
 <Link
 key={item.label}
 href={item.href}
 scroll={false}
 data-cursor="hover"
 className="text-[12px] font-medium uppercase tracking-[0.18em] text-bone/85 transition-colors hover:text-bone"
 >
 {item.label}
 </Link>
 ))}
 <Link
 href="/#contact"
 data-cursor="hover"
 data-press
 className="group inline-flex items-center gap-2 border border-bone/20 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-bone transition-colors hover:bg-bone hover:text-black"
 >
 <span>Initiate</span>
 <span
 aria-hidden
 className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
 >
 ↗
 </span>
 </Link>
 </nav>

 <button
 aria-label="Toggle menu"
 onClick={() => setOpen((v) => !v)}
 className="relative z-10 flex h-9 w-9 flex-col items-end justify-center gap-1.5 text-bone md:hidden"
 data-cursor="hover"
 >
 <span
 className={`h-px w-6 bg-current transition-transform duration-300 ease-in-out ${
 open ?"translate-y-[3px] rotate-45":""
 }`}
 />
 <span
 className={`h-px w-4 bg-current transition-all duration-300 ease-in-out ${
 open ?"-translate-y-[3px] -rotate-45 w-6":""
 }`}
 />
 </button>
 </div>
 </header>

 <AnimatePresence>
 {open && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.25, ease:"easeOut"}}
 className="fixed inset-0 z-40 flex flex-col bg-black px-6 pt-24 text-bone md:hidden"
 >
 <nav className="flex flex-col gap-6">
 {[...items, { label:"Initiate", href:"/#contact"}].map(
 (item, i) => (
 <motion.div
 key={item.label}
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.35,
 delay: 0.05 + i * 0.04,
 ease: [0.16, 1, 0.3, 1],
 }}
 >
 <Link
 href={item.href}
 onClick={() => setOpen(false)}
 className="block font-display text-5xl font-semibold tracking-tight"
 >
 {item.label}
 </Link>
 </motion.div>
 )
 )}
 </nav>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
}
