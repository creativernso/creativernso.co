"use client";

import Link from"next/link";
import Image from"next/image";
import heroDesktop from"@/public/hero-desktop.png";
import heroMobile from"@/public/hero-mobile.png";
import { motion } from"framer-motion";
import { useEffect, useState } from"react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Phrases that rotate after"I don't build brands."
const ROTATING_PHRASES = [
"I reveal them.",
"I uncover them.",
"I position them.",
"I elevate them.",
];
const CYCLE_MS = 8500; // per phrase: type → hold → erase (slower, more cinematic)

/**
 * Rotating typewriter — types a phrase, holds, erases, then types the next one.
 * Uses React state + CSS keyframe (one-shot animation), with key={idx} forcing
 * a remount on each phrase change so the animation restarts fresh.
 */
function RotatingTypewriter({
 phrases,
 cycleMs = 5000,
 startDelay = 0,
}: {
 phrases: readonly string[];
 cycleMs?: number;
 startDelay?: number;
}) {
 const [idx, setIdx] = useState(0);

 useEffect(() => {
 const timer = setInterval(() => {
 setIdx((i) => (i + 1) % phrases.length);
 }, cycleMs);
 return () => clearInterval(timer);
 }, [phrases.length, cycleMs]);

 return (
 <span
 key={idx}
 className="typewriter-wrapper"
 style={{
 animationDelay: `${startDelay}s`,
 animationDuration: `${cycleMs}ms`,
 }}
 >
 <span className="typewriter-text">{phrases[idx]}</span>
 <span className="typewriter-caret"aria-hidden />
 </span>
 );
}

export default function Hero() {
 // Line 1 is static — line 2 rotates through ROTATING_PHRASES
 const line1 ="I don’t build brands.";
 // Subtitle + button appear ONCE on first load
 const subtitleStart = 0.6;
 const buttonStart = subtitleStart + 0.3;

 return (
 <section id="top"data-theme="dark"className="relative">
 {/* Outer wrapper — same width as Nav + page content (1400px) */}
 <div className="mx-auto max-w-[1400px] px-6 pb-4 pt-4 md:px-12 md:pb-6 md:pt-6">
 {/* The rectangle frame */}
 <div className="relative overflow-hidden">
 {/* ============== DESKTOP ============== */}
 <div className="relative hidden w-full md:block">
 <div className="hero-image-entrance relative h-full w-full">
 <div className="hero-image-breath relative h-full w-full">
 <Image
 src={heroDesktop}
 alt="Ernso Azor"
 sizes="100vw"
 priority
 placeholder="blur"
 className="h-auto w-full"
 />
 </div>
 </div>

 {/* Text overlay — anchored toward the bottom-left of the frame */}
 <div className="absolute inset-0 mx-auto flex max-w-[1400px] items-end px-6 pb-[6%] md:px-12">
 <div className="max-w-[720px]">
 <h1 className="font-display text-bone text-[clamp(40px,4.8vw,72px)] font-normal leading-[1.05] tracking-[-0.04em]">
 <span className="block">{line1}</span>
 <span className="block font-bold text-bone/30">
 <RotatingTypewriter
 phrases={ROTATING_PHRASES}
 cycleMs={CYCLE_MS}
 />
 </span>
 </h1>

 <motion.div
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: buttonStart, ease: EASE }}
 className="mt-8"
 >
 <Link
 href="/#contact"
 data-cursor="hover"
 data-press
 className="group inline-flex items-center gap-3 bg-black/30 px-9 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-black"
 style={{
 boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)",
 }}
 >
 <span>Initiate</span>
 <span
 aria-hidden
 className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
 >
 ↗
 </span>
 </Link>
 </motion.div>
 </div>
 </div>
 </div>

 {/* ============== MOBILE ============== */}
 <div className="relative w-full md:hidden">
 <div className="hero-image-entrance relative h-full w-full">
 <div className="hero-image-breath relative h-full w-full">
 <Image
 src={heroMobile}
 alt="Ernso Azor"
 sizes="100vw"
 priority
 placeholder="blur"
 className="h-auto w-full"
 />
 </div>
 </div>

 {/* Text overlay — anchored toward the top of the image, below the nav */}
 <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-[calc(100px+5vh)] text-center">
 <h1 className="font-display text-bone text-[30px] font-normal leading-[1.1] tracking-[-0.04em]">
 <span className="block">{line1}</span>
 <span className="block font-bold text-bone/30">
 <RotatingTypewriter
 phrases={ROTATING_PHRASES}
 cycleMs={CYCLE_MS}
 />
 </span>
 </h1>

 <motion.div
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: buttonStart, ease: EASE }}
 className="mt-5"
 >
 <Link
 href="/#contact"
 data-cursor="hover"
 data-press
 className="group inline-flex items-center gap-3 bg-black/30 px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-black"
 style={{
 boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)",
 }}
 >
 <span>Initiate</span>
 <span
 aria-hidden
 className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
 >
 ↗
 </span>
 </Link>
 </motion.div>
 </div>
 </div>

 {/* Outline overlay — matches the INITIATE button's border-bone/20 intensity */}
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 border border-bone/20"
 />
 </div>
 </div>
 </section>
 );
}
