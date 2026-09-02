"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ChoiceStep({
  onSelect,
}: {
  onSelect: (choice: "call" | "questionnaire") => void;
}) {
  const t = useTranslations("initiate.choice");

  const cards = [
    { key: "call" as const, title: t("call.title"), subtitle: t("call.subtitle") },
    {
      key: "questionnaire" as const,
      title: t("questionnaire.title"),
      subtitle: t("questionnaire.subtitle"),
    },
  ];

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-display text-bone text-[clamp(24px,3.6vw,40px)] font-bold leading-[1.15] tracking-[-0.03em]"
      >
        {t("title")}
      </motion.h2>

      <div
        className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-8"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
      >
        <div className="grid grid-cols-1 border-l border-t border-bone/10 sm:grid-cols-2">
          {cards.map((c, i) => (
            <motion.button
              key={c.key}
              type="button"
              onClick={() => onSelect(c.key)}
              data-cursor="hover"
              data-press
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: EASE }}
              className="group flex flex-col items-start border-b border-r border-bone/10 px-6 pb-8 pt-8 text-left transition-colors hover:bg-bone/[0.03] md:px-10 md:pb-10 md:pt-10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-bone/15 font-display text-[16px] font-bold text-bone transition-colors group-hover:border-bone">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-bone text-[24px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[30px]">
                {c.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-2 md:text-[16px]">
                {c.subtitle}
              </p>
              <span
                aria-hidden
                className="mt-6 text-[18px] text-bone/50 transition-transform duration-300 ease-cinematic group-hover:translate-x-0.5 group-hover:text-bone"
              >
                ↗
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
