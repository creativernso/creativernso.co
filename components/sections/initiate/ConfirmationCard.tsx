"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ConfirmationCard({
  headline,
  subtext,
  signature,
}: {
  headline: string;
  subtext: string;
  signature?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 px-6 py-14 text-center md:px-12 md:py-20"
      style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
    >
      <div className="font-display text-bone text-[clamp(28px,4.5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em]">
        {headline}
      </div>
      <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted-2 md:text-[17px]">
        {subtext}
      </p>
      {signature && (
        <p className="mt-8 font-display text-[16px] font-bold text-bone">
          {signature}
        </p>
      )}
    </motion.div>
  );
}
