"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useFitText } from "@/lib/useFitText";

export const dynamic = "force-static";

const EASE = [0.16, 1, 0.3, 1] as const;

type Belief = { n: string; title: string; body: string };
type RevealRow = { letter: string; name: string; desc: string };

export default function BeliefPage() {
  const t = useTranslations("services");
  const beliefs = t.raw("beliefs") as Belief[];
  const revealRows = t.raw("revealRows") as RevealRow[];
  const beliefsRectRef = useRef<HTMLDivElement>(null);
  const beliefsTitle = useFitText<HTMLHeadingElement>(beliefsRectRef);

  const revealRectRef = useRef<HTMLDivElement>(null);
  const revealTitle = useFitText<HTMLHeadingElement>(revealRectRef);

  return (
    <section
      data-theme="dark"
      className="relative min-h-screen py-10 text-bone md:py-14"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header — "What I believe." */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-[clamp(36px,5vw,96px)] font-bold leading-[1.05] tracking-[-0.04em]"
        >
          <span className="text-bone">{t("titleLead")}</span>
          <span className="text-bone/35">{t("titleRest")}</span>
        </motion.h1>

        {/* ============== DESKTOP — image background + overlaid quote ============== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative mt-8 hidden overflow-hidden md:mt-10 md:block"
        >
          <div className="relative w-full">
            <Image
              src="/img-blf.jpg"
              alt="Ernso Azor portrait"
              width={2400}
              height={1200}
              sizes="100vw"
              priority
              className="h-auto w-full select-none"
            />
          </div>

          <div className="absolute inset-0 mx-auto flex max-w-[1400px] items-center justify-end px-6 md:pl-16 md:pr-28 lg:pr-36 xl:pr-44">
            <div className="max-w-[640px] md:max-w-[720px]">
              <p className="font-display text-[clamp(28px,3.4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em]">
                <span className="block text-bone">{t("heroQuoteLine1")}</span>
                <span className="block text-bone">
                  {t("heroQuoteLine2")}
                </span>
                <span className="block text-bone/40">{t("heroQuoteLine3")}</span>
              </p>
              <p className="mt-5 text-[12px] text-bone/65 md:mt-7 md:text-[14px]">
                {t("imageCaptionName")} &nbsp;·&nbsp; {t("imageCaptionRole")}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 border border-bone/15"
          />
        </motion.div>

        {/* ============== MOBILE — portrait fills frame, text overlaid at top ============== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative mt-8 overflow-hidden md:hidden"
        >
          <div className="relative w-full">
            <Image
              src="/Mobil_beleif.jpg"
              alt="Ernso Azor portrait"
              width={1200}
              height={1778}
              sizes="100vw"
              priority
              className="h-auto w-full select-none"
            />
          </div>

          <div className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-[14%] text-center">
            <p className="text-[10px] leading-snug text-bone/85">
              <span className="font-semibold text-bone">{t("imageCaptionName")}</span>
              <span className="px-1.5 text-bone/45">·</span>
              <span className="text-bone/75">
                {t("imageCaptionRole")}
              </span>
            </p>

            <p className="mt-3 font-display text-[26px] font-bold leading-[1.08] tracking-[-0.03em]">
              <span className="block text-bone">{t("heroQuoteLine1")}</span>
              <span className="block text-bone">
                {t("heroQuoteLine2")}
              </span>
              <span className="block text-bone/35">{t("heroQuoteLine3")}</span>
            </p>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 border border-bone/15"
          />
        </motion.div>

        {/* "The beliefs that never change." */}
        <div className="mt-24 md:mt-32">
          <div>
            <motion.h2
              ref={beliefsTitle.textRef}
              initial={{ opacity: 0, y: 64 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.03em]"
              style={{
                fontSize: beliefsTitle.fontSize
                  ? `${beliefsTitle.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
                visibility: beliefsTitle.fontSize ? "visible" : "hidden",
              }}
            >
              {t("beliefsTitle")}
            </motion.h2>
          </div>

          {/* Beliefs — merged rectangle, 2-col grid on tablet+, ghost numeral per card */}
          <div
            ref={beliefsRectRef}
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-8"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="grid grid-cols-1 border-l border-t border-bone/10 sm:grid-cols-2">
              {beliefs.map((b, i) => (
                <motion.article
                  key={b.n}
                  initial={{ opacity: 0, y: 64 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: EASE }}
                  className="flex flex-col border-b border-r border-bone/10 px-6 pb-7 pt-7 md:px-10 md:pb-9 md:pt-9"
                  data-cursor="hover"
                >
                  <span
                    aria-hidden
                    className="select-none font-display text-[15px] font-bold tracking-[0.1em] text-bone"
                  >
                    {b.n}-
                  </span>
                  <h3 className="mt-3 font-display text-bone text-[22px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[26px]">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted-2 md:text-[16px]">
                    {b.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* The REVEAL Framework. title */}
        <div className="mt-24 md:mt-32">
          <div ref={revealRectRef}>
            <motion.h2
              ref={revealTitle.textRef}
              initial={{ opacity: 0, y: 64 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.03em]"
              style={{
                fontSize: revealTitle.fontSize
                  ? `${revealTitle.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
                visibility: revealTitle.fontSize ? "visible" : "hidden",
              }}
            >
              {t("revealTitle")}
            </motion.h2>
          </div>

          {/* Image + REVEAL rows — two-column layout */}
          <div className="mt-8 md:mt-10 md:grid md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-12 lg:gap-16">
            {/* Left — framework visual */}
            <motion.div
              initial={{ opacity: 0, y: 64 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="relative aspect-square overflow-hidden border border-bone/15 bg-black/30">
                <Image
                  src="/hero-portrait.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted-2 md:text-[12px]">
                {t("revealSubtitle")}
              </p>
            </motion.div>

            {/* Right — REVEAL rows */}
            <div className="mt-10 divide-y divide-bone/10 md:mt-0">
              {revealRows.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 64 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
                  className="group flex flex-col gap-1.5 py-3.5 first:pt-0 last:pb-0 sm:min-h-[64px] sm:flex-row sm:items-center sm:gap-6 md:min-h-[72px] md:gap-8 md:py-2"
                  data-cursor="hover"
                >
                  {/* Letter + mobile-only eyebrow */}
                  <div className="flex items-baseline gap-4 sm:contents">
                    <span className="shrink-0 font-display text-[26px] font-bold leading-none text-bone sm:w-14 md:w-20 md:text-[34px]">
                      {r.letter}.
                    </span>
                    <span className="text-[14px] font-semibold uppercase tracking-[0.1em] text-muted-2 sm:hidden">
                      {r.name}
                    </span>
                  </div>

                  {/* Eyebrow — desktop own column */}
                  <span className="hidden shrink-0 text-[14px] font-semibold uppercase tracking-[0.08em] text-muted-2 sm:block sm:w-[130px] md:w-[160px] md:text-[16px]">
                    {r.name}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-[15px] font-normal leading-[1.5] text-bone sm:flex-1 md:text-[18px]">
                    {r.desc}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline under REVEAL */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10 md:mt-14"
        >
          <p className="font-display text-[clamp(14px,1.8vw,24px)] font-normal leading-tight tracking-[-0.02em] text-bone md:whitespace-nowrap">
            <span>{t("taglineLead")}</span>
            <span className="text-bone/35">{t("taglineRest")}</span>
          </p>
        </motion.div>

        {/* CTA — Let's build something */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
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
                ↗
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
