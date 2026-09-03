"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useFitText } from "@/lib/useFitText";
import type { Project } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProjectDetail({
  p,
  next,
}: {
  p: Project;
  next: Project;
}) {
  const t = useTranslations("workDetail");
  const overviewRef = useRef<HTMLDivElement>(null);
  const overview = useFitText<HTMLHeadingElement>(overviewRef);

  return (
    <section
      data-theme="dark"
      className="relative min-h-screen bg-ink py-10 text-bone md:py-14"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Top row Back + date */}
        <div className="flex items-center justify-between">
          <Link
            href="/work"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 text-[14px] text-bone transition-colors hover:text-gold-ember"
          >
            <span
              aria-hidden
              className="transition-transform duration-500 ease-cinematic group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span>{t("back")}</span>
          </Link>
          <div className="text-[14px] text-bone">
            {p.date.replace(/\s*[·.]\s*/g, "/")}
          </div>
        </div>

        {/* Hairline */}
        <div className="mt-3 h-px w-full bg-bone/15" />

        {/* Title + subtitle */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-8 font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.1] tracking-[-0.04em]"
        >
          {p.label}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          className="mt-3 text-[18px] font-light leading-relaxed text-muted-2 md:whitespace-nowrap md:text-[32px]"
        >
          {p.subtitle}
        </motion.p>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative mt-10 aspect-[1400/714] overflow-hidden bg-black/30 md:mt-12"
        >
          <Image
            src={p.hero}
            alt={p.title}
            fill
            sizes="(min-width: 1400px) 1304px, (min-width: 768px) 80vw, 95vw"
            quality={92}
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Overview */}
        <div className="mt-10 md:mt-12">
          <motion.div
            ref={overviewRef}
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2
              ref={overview.textRef}
              className="font-display text-bone whitespace-nowrap font-bold tracking-[-0.04em]"
              style={{
                fontSize: overview.fontSize
                  ? `${overview.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
                visibility: overview.fontSize ? "visible" : "hidden",
              }}
            >
              {t("overviewHeading")}
            </h2>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-4 space-y-5 text-[14px] leading-relaxed text-muted-2 md:text-[20px] md:[hyphens:auto] md:[text-align:justify] md:[text-wrap:pretty]"
        >
          {(p.overview ?? []).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        {/* Feature image */}
        {p.feature && (
          <motion.div
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mt-16 aspect-[1400/714] overflow-hidden bg-black/30 md:mt-20"
          >
            <Image
              src={p.feature}
              alt={`${p.title} feature`}
              fill
              sizes="(min-width: 1400px) 1304px, (min-width: 768px) 80vw, 95vw"
            quality={92}
              className="object-cover"
            />
          </motion.div>
        )}

        {/* Gallery — one full-width image per row, like the hero */}
        <div className="mt-6 flex flex-col gap-4 md:mt-8 md:gap-6">
          {(p.gallery ?? []).map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 64 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative aspect-[1400/714] overflow-hidden bg-black/30"
            >
              <Image
                src={src}
                alt={`${p.title} detail ${idx + 1}`}
                fill
                sizes="(min-width: 1400px) 1304px, (min-width: 768px) 80vw, 95vw"
            quality={92}
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Next project card */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-20 overflow-hidden border border-bone/10 bg-black/30 backdrop-blur-md backdrop-saturate-100 p-5 md:mt-28 md:p-6">
          <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
            <Image
              src={next.hero}
              alt={`${next.title} preview`}
              fill
              sizes="(min-width: 1400px) 1220px, (min-width: 768px) 75vw, 90vw"
              quality={92}
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-1 md:mt-6 md:px-2">
            <div className="text-[13.5px] text-muted-2 md:text-[14px]">
              {next.label}
            </div>
            <Link
              href={`/work/${next.slug}`}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 border border-bone/20 px-6 py-2.5 text-[13.5px] font-medium text-bone transition-colors hover:bg-bone hover:text-black"
            >
              <span>{t("next")}</span>
              <span
                aria-hidden
                className="transition-transform duration-500 ease-cinematic group-hover:translate-x-0.5"
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
