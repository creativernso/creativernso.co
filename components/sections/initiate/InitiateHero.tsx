"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useFitText } from "@/lib/useFitText";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function InitiateHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const pageTitle = useFitText<HTMLHeadingElement>(heroRef);

  return (
    <>
      {/* Hero image */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative aspect-[2400/1126] overflow-hidden border border-bone/20 bg-black/30"
      >
        <Image
          src="/personal-intro.jpg"
          alt="Ernso Azor"
          fill
          sizes="(min-width: 1400px) 1304px, (min-width: 768px) 90vw, 95vw"
          quality={88}
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
        className="mt-8 md:mt-12"
      >
        <h1
          ref={pageTitle.textRef}
          className="font-display text-bone font-bold leading-[1.05] tracking-[-0.04em]"
          style={{
            fontSize: pageTitle.fontSize
              ? `${pageTitle.fontSize}px`
              : "clamp(36px, 5vw, 96px)",
            visibility: pageTitle.fontSize ? "visible" : "hidden",
          }}
        >
          {title}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-2 md:text-[18px]">
          {subtitle}
        </p>
      </motion.header>
    </>
  );
}
