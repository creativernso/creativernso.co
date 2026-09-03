"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import BrandsMarquee from "@/components/sections/about/BrandsMarquee";
import Stats from "@/components/sections/about/Stats";
import ReadMoreText from "@/components/primitives/ReadMoreText";
import { useFitText } from "@/lib/useFitText";

const EASE = [0.16, 1, 0.3, 1] as const;

const brands = [
  "/brands/brand-07.png",
  "/brands/brand-08.png",
  "/brands/brand-09.png",
  "/brands/brand-10.png",
  "/brands/brand-11.png",
  "/brands/brand-12.png",
  "/brands/brand-13.png",
  "/brands/brand-14.png",
  "/brands/brand-15.png",
  "/brands/brand-16.png",
  "/brands/brand-17.png",
  "/brands/brand-18.png",
];

const tools = [
  "/tools/tool-07.png",
  "/tools/tool-08.png",
  "/tools/tool-09.png",
  "/tools/tool-10.png",
  "/tools/tool-11.png",
  "/tools/tool-12.png",
  "/tools/tool-13.png",
  "/tools/tool-14.png",
  "/tools/tool-15.png",
  "/tools/tool-16.png",
  "/tools/tool-17.png",
  "/tools/tool-18.png",
  "/tools/tool-19.png",
  "/tools/tool-20.png",
  "/tools/tool-21.png",
];

export default function AboutContent() {
  const t = useTranslations("about");
  const heroRef = useRef<HTMLDivElement>(null);
  const drivesRef = useRef<HTMLDivElement>(null);
  const beyondRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const hero = useFitText<HTMLHeadingElement>(heroRef);
  const drives = useFitText<HTMLHeadingElement>(drivesRef);
  const beyond = useFitText<HTMLHeadingElement>(beyondRef);
  const brandsTitle = useFitText<HTMLHeadingElement>(brandsRef);

  return (
    <section
      data-theme="dark"
      className="relative min-h-screen py-10 text-bone md:py-14"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Title */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h1
            ref={hero.textRef}
            className="mt-6 font-display text-bone whitespace-nowrap font-bold leading-[1.05] tracking-[-0.04em] md:mt-10"
            style={{
              fontSize: hero.fontSize ? `${hero.fontSize}px` : "clamp(36px, 5vw, 96px)",
              visibility: hero.fontSize ? "visible" : "hidden",
            }}
          >
            {t("heroTitle")}
          </h1>
        </motion.div>

        {/* Portrait + Parcours, wrapped in one bordered card */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-4 md:mt-10 md:p-6"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
        >
          <div className="relative aspect-[2400/1126] overflow-hidden bg-black">
            <Image
              src="/personal-intro.jpg"
              alt="Ernso Azor at his desk"
              fill
              sizes="(min-width: 1400px) 1232px, (min-width: 768px) 84vw, 88vw"
              quality={88}
              className="object-cover"
              priority
            />
          </div>

          <ReadMoreText
            paragraphs={[
              t("parcours.p1"),
              t("parcours.p2"),
              t("parcours.p3"),
              t("parcours.p4"),
            ]}
            readMoreLabel={t("readMore")}
            readLessLabel={t("readLess")}
            className="mt-6 space-y-5 text-[14px] leading-[1.6] text-muted-2 text-left [hyphens:auto] [text-wrap:pretty] md:[text-align:justify] md:mt-8 md:text-[19px] md:leading-[1.65]"
          />
        </motion.div>

        {/* Stats, animated counters */}
        <Stats />

        {/* What drives me. */}
        <div className="mt-24 md:mt-32">
          <motion.div
            ref={drivesRef}
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2
              ref={drives.textRef}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.04em]"
              style={{
                fontSize: drives.fontSize ? `${drives.fontSize}px` : "clamp(36px, 5vw, 96px)",
                visibility: drives.fontSize ? "visible" : "hidden",
              }}
            >
              {t("drivesTitle")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-4 md:mt-8 md:p-6"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
              <ReadMoreText
                paragraphs={[t("drives.p1"), t("drives.p2"), t("drives.p3")]}
                readMoreLabel={t("readMore")}
                readLessLabel={t("readLess")}
                className="flex flex-col justify-center space-y-5 text-[14px] leading-[1.6] text-muted-2 text-left [hyphens:auto] [text-wrap:pretty] md:[text-align:justify] md:text-[17px] md:leading-[1.65]"
              />

              <div className="relative aspect-square overflow-hidden bg-black">
                <Image
                  src="/about-portrait.jpg"
                  alt="Ernso Azor"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Beyond the work. */}
        <div className="mt-24 md:mt-32">
          <motion.div
            ref={beyondRef}
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2
              ref={beyond.textRef}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.04em]"
              style={{
                fontSize: beyond.fontSize ? `${beyond.fontSize}px` : "clamp(36px, 5vw, 96px)",
                visibility: beyond.fontSize ? "visible" : "hidden",
              }}
            >
              {t("beyondTitle")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-4 md:mt-8 md:p-6"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="relative aspect-[2400/1126] overflow-hidden bg-black">
              <Image
                src="/beyond-work.jpg"
                alt="Ernso Azor outside of work"
                fill
                sizes="(min-width: 1400px) 1232px, (min-width: 768px) 84vw, 88vw"
                quality={88}
                className="object-cover"
              />
            </div>

            <ReadMoreText
              paragraphs={[
                t("beyond.p1"),
                t("beyond.p2"),
                t("beyond.p3"),
                t("beyond.p4"),
                t("beyond.p5"),
              ]}
              readMoreLabel={t("readMore")}
              readLessLabel={t("readLess")}
              className="mt-6 space-y-5 text-[14px] leading-[1.6] text-muted-2 text-left [hyphens:auto] [text-wrap:pretty] md:[text-align:justify] md:mt-8 md:text-[19px] md:leading-[1.65]"
            />
          </motion.div>
        </div>

        {/* Ready to begin? CTA */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 px-5 py-7 md:mt-8 md:px-12 md:py-14"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[18px] font-bold leading-[1.4] text-bone md:text-[28px]">
                {t("ctaText")}
              </p>
            </div>
            <Link
              href="/initiate"
              data-cursor="hover"
              data-press
              className="group inline-flex items-center gap-2 bg-black/30 px-10 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-black md:text-[13px]"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.22)",
              }}
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

        {/* Brand wall, animated marquee */}
        <div className="mt-24 md:mt-32">
          <motion.div
            ref={brandsRef}
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2
              ref={brandsTitle.textRef}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.04em]"
              style={{
                fontSize: brandsTitle.fontSize
                  ? `${brandsTitle.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
                visibility: brandsTitle.fontSize ? "visible" : "hidden",
              }}
            >
              {t("brandsHeading")}
            </h2>
          </motion.div>
          <div className="mt-6 md:mt-8">
            <BrandsMarquee />
          </div>
        </div>

        {/* Tools */}
        <div className="mt-24 md:mt-32">
          <motion.h2
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.1] tracking-[-0.04em]"
          >
            {t("toolsHeading")}
          </motion.h2>
          <ul className="mt-8 grid grid-cols-5 gap-2.5 md:gap-3 md:[grid-template-columns:repeat(15,minmax(0,1fr))]">
            {tools.map((src, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 64 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: (i % 5) * 0.06, ease: EASE }}
                className="relative aspect-square border border-bone/10 bg-black/30 p-2 md:p-2.5"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 6vw, 18vw"
                    className="object-contain"
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
