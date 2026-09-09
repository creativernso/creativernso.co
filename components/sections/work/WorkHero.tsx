"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WorkHero({ title }: { title: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <h1 className="font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.05] tracking-[-0.04em]">
        {title}
      </h1>
    </motion.header>
  );
}
