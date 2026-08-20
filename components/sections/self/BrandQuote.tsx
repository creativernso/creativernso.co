"use client";

import Image from"next/image";
import { useEffect, useRef, useState } from"react";

const QUOTE =
"Branding is not decoration. It is not a logo, a colour, or a typeface. Branding is presence. It is perception. It is the story the world tells about you before you open your mouth, and my work is to make sure that story is true.";

type Phase ="idle"|"typing"|"erasing";

/**
 * Looping typewriter — types out the paragraph, holds for reading,
 * erases backwards, pauses, then repeats infinitely. Caret blinks at the
 * leading edge throughout.
 */
function TypingParagraph({
 text,
 charDelay = 45,
 eraseDelay = 15,
 holdMs = 4000,
 pauseMs = 700,
}: {
 text: string;
 charDelay?: number;
 eraseDelay?: number;
 holdMs?: number;
 pauseMs?: number;
}) {
 const ref = useRef<HTMLDivElement>(null);
 const [visibleChars, setVisibleChars] = useState(0);
 const [phase, setPhase] = useState<Phase>("idle");

 // Trigger first cycle when section enters viewport
 useEffect(() => {
 if (!ref.current || phase !=="idle") return;
 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setPhase("typing");
 observer.disconnect();
 }
 },
 { threshold: 0.3 }
 );
 observer.observe(ref.current);
 return () => observer.disconnect();
 }, [phase]);

 // Phase machine: typing → hold → erasing → pause → typing → ...
 useEffect(() => {
 if (phase ==="idle") return;

 if (phase ==="typing") {
 if (visibleChars < text.length) {
 const t = setTimeout(() => setVisibleChars((v) => v + 1), charDelay);
 return () => clearTimeout(t);
 }
 // Fully typed → hold then erase
 const t = setTimeout(() => setPhase("erasing"), holdMs);
 return () => clearTimeout(t);
 }

 if (phase ==="erasing") {
 if (visibleChars > 0) {
 const t = setTimeout(() => setVisibleChars((v) => v - 1), eraseDelay);
 return () => clearTimeout(t);
 }
 // Fully erased → brief pause then type again
 const t = setTimeout(() => setPhase("typing"), pauseMs);
 return () => clearTimeout(t);
 }
 }, [
 phase,
 visibleChars,
 text.length,
 charDelay,
 eraseDelay,
 holdMs,
 pauseMs,
 ]);

 return (
 <span ref={ref}>
 {text.slice(0, visibleChars)}
 {phase !=="idle"&& <span className="typing-caret"aria-hidden />}
 </span>
 );
}

export default function BrandQuote() {
 return (
 <section data-theme="dark"className="py-10 md:py-14">
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 {/* Wrapper provides space for the floating portrait */}
 <div className="relative pt-14 md:pt-16">
 {/* Floating portrait — overlaps the top edge of the box, same outline DNA as Hero frame */}
 <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
 <div
 className="relative h-24 w-24 overflow-hidden md:h-28 md:w-28"
 style={{
 boxShadow:
"0 0 0 3px rgba(255,255,255,0.08), 0 0 0 18px rgba(255,255,255,0.04)",
 }}
 >
 <Image
 src="/profil.png"
 alt="Ernso Azor"
 fill
 sizes="112px"
 className="object-cover"
 priority={false}
 />
 </div>
 </div>

 {/* Quote box */}
 <div
 className="relative overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 px-5 pb-8 pt-16 md:px-16 md:pb-16 md:pt-24"
 style={{ boxShadow:"inset 0 0 0 0.5px rgba(255,255,255,0.08)"}}
 >
 {/* Typewriter quote */}
 <p className="mx-auto max-w-3xl text-center font-display text-bone text-[clamp(18px,2vw,28px)] font-normal leading-[1.5] tracking-[-0.02em] md:[text-align:justify] md:">
 <TypingParagraph text={QUOTE} />
 </p>

 {/* Attribution */}
 <div className="mt-6 flex items-center justify-center gap-3 text-[13px] md:mt-8 md:text-[14px]">
 <span className="text-bone/70">Ernso Azor</span>
 <span aria-hidden className="text-bone/30">
 ·
 </span>
 <span className="text-bone/45">Graphic Designer / Brand Strategist</span>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
