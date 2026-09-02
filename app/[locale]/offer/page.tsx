"use client";

import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useFitText } from "@/lib/useFitText";

export const dynamic = "force-static";

const EASE = [0.16, 1, 0.3, 1] as const;

type DisciplineGroup = { n: string; name: string; items: string[] };
type ProcessStep = { n: string; label: string; name: string; desc: string };

export default function OfferPage() {
  const t = useTranslations("offer");
  const disciplineGroups = t.raw("disciplineGroups") as DisciplineGroup[];
  const processSteps = t.raw("processSteps") as ProcessStep[];

  const disciplinesRectRef = useRef<HTMLDivElement>(null);
  const disciplinesTitle = useFitText<HTMLHeadingElement>(disciplinesRectRef);

  const processRectRef = useRef<HTMLDivElement>(null);
  const processTitle = useFitText<HTMLHeadingElement>(processRectRef);

  return (
    <section
      data-theme="dark"
      className="relative min-h-screen py-10 text-bone md:py-14"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header — "What I bring to the table." */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="meta flex items-center gap-3 text-gold"
        >
          {t("eyebrow")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          className="mt-4 font-display text-[clamp(36px,5vw,96px)] font-bold leading-[1.05] tracking-[-0.04em]"
        >
          <span className="text-bone">{t("titleLead")}</span>
          <span className="text-bone/35">{t("titleRest")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-2 md:text-[18px]"
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* "The Disciplines" */}
        <div className="mt-24 md:mt-32">
          <div>
            <motion.h2
              ref={disciplinesTitle.textRef}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.03em]"
              style={{
                fontSize: disciplinesTitle.fontSize
                  ? `${disciplinesTitle.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
                visibility: disciplinesTitle.fontSize ? "visible" : "hidden",
              }}
            >
              {t("disciplinesTitle")}
            </motion.h2>
            <p className="mt-3 max-w-2xl text-[15px] text-muted-2 md:text-[18px]">
              {t("disciplinesIntro")}
            </p>
          </div>

          {/* Discipline groups — merged rectangle, one row per group */}
          <div
            ref={disciplinesRectRef}
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-8"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="divide-y divide-bone/10">
              {disciplineGroups.map((g, i) => (
                <motion.div
                  key={g.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="flex flex-col gap-4 px-6 py-7 transition-colors hover:bg-bone/[0.03] sm:flex-row sm:gap-8 md:px-10 md:py-9"
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-4 sm:w-[200px] sm:shrink-0 sm:flex-col sm:items-start sm:gap-3 md:w-[240px]">
                    <span
                      aria-hidden
                      className="flex h-14 w-14 shrink-0 items-center justify-center border border-bone/15 font-display text-[22px] font-bold text-bone md:h-16 md:w-16 md:text-[26px]"
                    >
                      {g.n}
                    </span>
                    <span className="font-display text-[22px] font-bold text-bone md:text-[24px]">
                      {g.name}
                    </span>
                  </div>

                  <ul className="flex flex-1 flex-wrap content-start gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="px-3 py-1.5 text-[12px] font-medium text-bone/85 md:px-3.5 md:text-[13px]"
                        style={{ boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.08)" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* "How we work together." */}
        <div className="mt-24 md:mt-32">
          <div>
            <motion.h2
              ref={processTitle.textRef}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.03em]"
              style={{
                fontSize: processTitle.fontSize
                  ? `${processTitle.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
                visibility: processTitle.fontSize ? "visible" : "hidden",
              }}
            >
              {t("processTitle")}
            </motion.h2>
            <p className="mt-3 max-w-2xl text-[15px] text-muted-2 md:text-[18px]">
              {t("processIntro")}
            </p>
          </div>

          {/* Process steps — merged rectangle, one row per step */}
          <div
            ref={processRectRef}
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-8"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="divide-y divide-bone/10">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="flex flex-col gap-4 px-6 py-7 transition-colors hover:bg-bone/[0.03] sm:flex-row sm:gap-8 md:px-10 md:py-9"
                  data-cursor="hover"
                >
                  <span
                    aria-hidden
                    className="flex h-14 w-14 shrink-0 items-center justify-center border border-bone/15 font-display text-[22px] font-bold text-bone md:h-16 md:w-16 md:text-[26px]"
                  >
                    {step.n}
                  </span>

                  <div className="flex-1">
                    <div className="meta text-gold">{step.label}</div>
                    <h3 className="mt-2 font-display text-bone text-[22px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[28px]">
                      {step.name}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-muted-2 md:text-[16px]">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA — Ready to begin? */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16 bg-black/40 px-6 py-8 backdrop-blur-md md:mt-24 md:px-12 md:py-14"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-[clamp(22px,2.6vw,34px)] font-bold leading-[1.1] tracking-[-0.03em] text-bone">
                {t("ctaHeading")}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-2 md:whitespace-nowrap md:text-[14.5px]">
                {t("ctaSubtext")}
              </p>
            </div>

            <Link
              href="/initiate"
              data-cursor="hover"
              data-press
              className="group inline-flex items-center gap-3 px-7 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.32em] text-bone transition-colors hover:bg-bone hover:text-black md:text-[13px] md:tracking-[0.4em]"
              style={{ boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.18)" }}
            >
              <span>{t("cta")}</span>
              <span
                aria-hidden
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
