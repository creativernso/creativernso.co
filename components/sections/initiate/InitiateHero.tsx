"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function InitiateHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      {/* Hero image with title overlaid */}
      <motion.div
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

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-6 md:px-12 md:pb-12">
          <h1 className="font-display text-bone max-w-[720px] text-[clamp(28px,4.4vw,64px)] font-bold leading-[1.05] tracking-[-0.04em]">
            {title}
          </h1>
        </div>
      </motion.div>

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
        className="mt-8 md:mt-12"
      >
        <p className="text-[17px] leading-relaxed text-muted-2 md:text-[22px]">
          {subtitle}
        </p>
      </motion.header>
    </>
  );
}
