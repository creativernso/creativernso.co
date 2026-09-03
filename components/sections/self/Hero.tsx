"use client";

import { Link } from"@/i18n/navigation";
import Image from"next/image";
import heroDesktop from"@/public/hero-desktop.jpg";
import heroMobile from"@/public/hero-mobile.jpg";
import { motion } from"framer-motion";
import { useEffect, useState } from"react";
import { useTranslations } from"next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

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
 const t = useTranslations("hero");
 const line1 = t("line1");
 const rotatingPhrases = [
 t("phrase1"),
 t("phrase2"),
 t("phrase3"),
 t("phrase4"),
 ];
 // Subtitle + button appear ONCE on first load
 const subtitleStart = 0.6;
 const buttonStart = subtitleStart + 0.3;

 return (
 <section
 id="top"
 data-theme="dark"
 className="relative -mt-[100px] h-[100svh] w-full py-4 md:-mt-[120px] md:py-10"
 >
 <div className="mx-auto h-full max-w-[1400px] px-6 md:px-0">
 <div className="relative h-full w-full overflow-hidden bg-black">
 {/* ============== DESKTOP ============== */}
 <div className="relative hidden h-full w-full md:block">
 <Image
 src={heroDesktop}
 alt="Ernso Azor"
 fill
 sizes="100vw"
 priority
 placeholder="blur"
 className="object-cover"
 />

 {/* Text overlay — vertically centered (shifted down), left-aligned */}
 <div className="absolute inset-0 flex translate-y-12 items-center px-6 md:translate-y-16 md:px-12">
 <div className="max-w-[720px] lg:max-w-[1000px] xl:max-w-[1200px]">
 <h1 className="font-display text-bone text-[clamp(30px,4vw,76px)] font-bold leading-[1.05] tracking-[-0.04em]">
 <span className="block">{line1}</span>
 <span className="block font-bold text-bone/30">
 <RotatingTypewriter
 phrases={rotatingPhrases}
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
 href="/initiate"
 data-cursor="hover"
 data-press
 className="group inline-flex items-center gap-3 bg-black/30 px-9 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-black"
 style={{
 boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.22)",
 }}
 >
 <span>{t("cta")}</span>
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
 <div className="relative h-full w-full md:hidden">
 <Image
 src={heroMobile}
 alt="Ernso Azor"
 fill
 sizes="100vw"
 priority
 placeholder="blur"
 className="object-cover"
 />

 {/* Text overlay — anchored toward the top of the image, below the nav */}
 <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-[calc(100px+9vh)] text-center">
 <h1 className="font-display text-bone text-[25px] font-bold leading-[1.1] tracking-[-0.04em]">
 <span className="block">{line1}</span>
 <span className="block font-bold text-bone/30">
 <RotatingTypewriter
 phrases={rotatingPhrases}
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
 href="/initiate"
 data-cursor="hover"
 data-press
 className="group inline-flex items-center gap-3 bg-black/30 px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-black"
 style={{
 boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.22)",
 }}
 >
 <span>{t("cta")}</span>
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

 {/* Outline overlay — painted on top of the image, always visible */}
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 z-10"
 style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.14)"}}
 />
 </div>
 </div>
 </section>
 );
}
