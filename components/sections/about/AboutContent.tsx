"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import BrandsMarquee from "@/components/sections/about/BrandsMarquee";
import Stats from "@/components/sections/about/Stats";
import { useFitText } from "@/lib/useFitText";

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
        <div ref={heroRef}>
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
        </div>

        {/* Portrait + Parcours, wrapped in one bordered card */}
        <div
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

          <div className="mt-6 space-y-5 text-[14px] leading-[1.6] text-muted-2 text-left [hyphens:auto] [text-wrap:pretty] md:[text-align:justify] md:mt-8 md:text-[19px] md:leading-[1.65]">
            <p>{t("parcours.p1")}</p>
            <p>{t("parcours.p2")}</p>
            <p>{t("parcours.p3")}</p>
            <p>{t("parcours.p4")}</p>
          </div>
        </div>

        {/* Stats, animated counters */}
        <Stats />

        {/* What drives me. */}
        <div className="mt-24 md:mt-32">
          <div ref={drivesRef}>
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
          </div>

          <div
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-4 md:mt-8 md:p-6"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col justify-center space-y-5 text-[14px] leading-[1.6] text-muted-2 text-left [hyphens:auto] [text-wrap:pretty] md:[text-align:justify] md:text-[17px] md:leading-[1.65]">
                <p>{t("drives.p1")}</p>
                <p>{t("drives.p2")}</p>
                <p>{t("drives.p3")}</p>
              </div>

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
          </div>
        </div>

        {/* Beyond the work. */}
        <div className="mt-24 md:mt-32">
          <div ref={beyondRef}>
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
          </div>

          <div
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

            <div className="mt-6 space-y-5 text-[14px] leading-[1.6] text-muted-2 text-left [hyphens:auto] [text-wrap:pretty] md:[text-align:justify] md:mt-8 md:text-[19px] md:leading-[1.65]">
              <p>{t("beyond.p1")}</p>
              <p>{t("beyond.p2")}</p>
              <p>{t("beyond.p3")}</p>
              <p>{t("beyond.p4")}</p>
              <p>{t("beyond.p5")}</p>
            </div>
          </div>
        </div>

        {/* Ready to begin? CTA */}
        <div
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
        </div>

        {/* Brand wall, animated marquee */}
        <div className="mt-24 md:mt-32">
          <div ref={brandsRef}>
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
          </div>
          <div className="mt-6 md:mt-8">
            <BrandsMarquee />
          </div>
        </div>

        {/* Tools */}
        <div className="mt-24 md:mt-32">
          <h2 className="font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.1] tracking-[-0.04em]">
            {t("toolsHeading")}
          </h2>
          <ul className="mt-8 grid grid-cols-5 gap-2.5 md:gap-3 md:[grid-template-columns:repeat(15,minmax(0,1fr))]">
            {tools.map((src, i) => (
              <li
                key={i}
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
