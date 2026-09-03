"use client";

import { motion } from"framer-motion";
import { useRef } from"react";
import { useFitText } from"@/lib/useFitText";
import { useTranslations } from"next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ThreeWorlds() {
 const t = useTranslations("worlds");
 const worlds = [
 { numeral:"I", title: t("world1Title"), body: t("world1Body") },
 { numeral:"II", title: t("world2Title"), body: t("world2Body") },
 { numeral:"III", title: t("world3Title"), body: t("world3Body") },
 ];
 const rectRef = useRef<HTMLDivElement>(null);
 const { textRef, fontSize } = useFitText<HTMLHeadingElement>(rectRef);

 return (
 <section
 data-theme="dark"
 className="relative py-10 text-bone md:py-14"
 >
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 {/* Title only */}
 <motion.h2
 ref={textRef}
 initial={{ opacity: 0, y: 64 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.25 }}
 transition={{ duration: 0.8, ease: EASE }}
 className="font-display text-bone font-bold leading-[1.1] tracking-[-0.04em] md:whitespace-nowrap"
 style={{
 fontSize: fontSize ? `${fontSize}px` :"clamp(36px, 6.5vw, 116px)",
 visibility: fontSize ?"visible":"hidden",
 }}
 >
 {t("title")}
 </motion.h2>

 {/* Three worlds, merged into one rectangle */}
 <div
 ref={rectRef}
 className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-8"
 style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.14)"}}
 >
 <div className="grid grid-cols-1 divide-y divide-bone/10 md:grid-cols-3 md:divide-x md:divide-y-0">
 {worlds.map((w, i) => (
 <motion.article
 key={w.numeral}
 initial={{ opacity: 0, y: 64 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.25 }}
 transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
 className="flex flex-col px-5 pb-5 pt-7 md:px-10 md:pb-8 md:pt-12"
 data-cursor="hover"
 >
 {/* Ghost numeral — top right, slight overflow */}
 <div className="pointer-events-none flex justify-end">
 <span
 aria-hidden
 className="select-none font-display text-[75px] font-bold leading-[0.85] text-bone/[0.07] md:text-[95px]"
 style={{
 marginTop:"-18px",
 marginRight:"-6px",
 }}
 >
 {String(i + 1).padStart(2,"0")}
 </span>
 </div>

 {/* Title + body */}
 <div className="mt-6 flex flex-col gap-5 md:mt-8">
 <h3 className="font-display text-bone text-[26px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[32px]">
 {w.title}
 </h3>
 <p className="text-[15px] font-light leading-[1.6] text-bone md:text-[17px] text-justify">
 {w.body}
 </p>
 </div>
 </motion.article>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
