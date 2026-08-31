"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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
  const heroRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const hero = useFitText<HTMLHeadingElement>(heroRef);
  const years = useFitText<HTMLHeadingElement>(yearsRef);
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
            Where it all began
          </h1>
        </div>

        {/* Stats, animated counters */}
        <Stats />

        {/* 8+ years across three worlds */}
        <div className="mt-24 md:mt-32">
          <div ref={yearsRef}>
            <h2
              ref={years.textRef}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.04em]"
              style={{
                fontSize: years.fontSize ? `${years.fontSize}px` : "clamp(36px, 5vw, 96px)",
                visibility: years.fontSize ? "visible" : "hidden",
              }}
            >
              8+ years across three worlds.
            </h2>
          </div>

          <div
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-6 md:mt-8 md:p-10"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {/* Text — left side, aligned to top of image */}
              <div className="flex flex-col justify-start text-[14px] leading-[1.6] text-muted-2 md:text-[17px] md:leading-[1.65] md:[text-align:justify]">
                <p>
                  The corporate world taught me rigor, systems thinking, and
                  the architecture of credibility. The professional world taught
                  me the intimacy of personal positioning and how deeply a brand
                  can shape someone&rsquo;s sense of authority. The creative world
                  taught me that emotion and identity are inseparable, and that
                  the most powerful brands are felt before they are seen.
                  Together, these three worlds built a practitioner who can walk
                  into any room: boardroom, consulting room, recording studio,
                  and find the truth that makes that brand irreplaceable.
                </p>
              </div>

              {/* Image — right side, horizontal */}
              <div className="relative aspect-[1627/1080] self-start overflow-hidden bg-black">
                <Image
                  src="/about-worlds.jpg"
                  alt="Working across three worlds"
                  fill
                  sizes="(min-width: 768px) 50vw, 90vw"
                  className="object-cover"
                />
              </div>
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
              <p className="text-[16px] leading-[1.5] text-bone md:text-[20px]">
                If what you&rsquo;ve read here resonates, you already know what
                the next step is.
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
              <span>Initiate</span>
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
              Brands I&rsquo;ve worked for
            </h2>
          </div>
          <div className="mt-6 md:mt-8">
            <BrandsMarquee />
          </div>
        </div>

        {/* Tools */}
        <div className="mt-24 md:mt-32">
          <h2 className="font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.1] tracking-[-0.04em]">
            Tools
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
