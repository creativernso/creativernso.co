"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useFitText } from "@/lib/useFitText";
import type { Project } from "@/lib/content";

export default function ProjectDetail({
  p,
  next,
}: {
  p: Project;
  next: Project;
}) {
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
            <span>Back</span>
          </Link>
          <div className="font-mono text-[12px] text-muted-2">{p.date}</div>
        </div>

        {/* Hairline */}
        <div className="mt-6 h-px w-full bg-bone/15" />

        {/* Title + subtitle */}
        <h1 className="mt-8 font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.1] tracking-[-0.04em]">
          {p.label}
        </h1>
        <p className="mt-3 whitespace-nowrap text-[30px] font-light leading-relaxed text-muted-2 md:text-[32px]">
          {p.subtitle}
        </p>

        {/* Hero image */}
        <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-black/30 md:mt-12">
          <Image
            src={p.hero}
            alt={p.title}
            fill
            sizes="(min-width: 768px) 80vw, 95vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Overview */}
        <div className="mt-16 md:mt-20">
          <div ref={overviewRef}>
            <h2
              ref={overview.textRef}
              className="font-display text-bone whitespace-nowrap font-bold tracking-[-0.04em]"
              style={{
                fontSize: overview.fontSize
                  ? `${overview.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
              }}
            >
              The project overview
            </h2>
          </div>
        </div>
        <div className="mt-6 space-y-5 text-[20px] leading-relaxed text-muted-2 md:text-[24px]">
          {(p.overview ?? []).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Feature image */}
        {p.feature && (
          <div className="relative mt-16 aspect-[16/10] overflow-hidden bg-black/30 md:mt-20">
            <Image
              src={p.feature}
              alt={`${p.title} feature`}
              fill
              sizes="(min-width: 768px) 80vw, 95vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Gallery — one full-width image per row, like the hero */}
        <div className="mt-6 flex flex-col gap-4 md:mt-8 md:gap-6">
          {(p.gallery ?? []).map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-[16/10] overflow-hidden bg-black/30"
            >
              <Image
                src={src}
                alt={`${p.title} detail ${idx + 1}`}
                fill
                sizes="(min-width: 768px) 80vw, 95vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Next project card */}
        <div className="mt-20 overflow-hidden border border-bone/10 bg-black/30 backdrop-blur-md backdrop-saturate-100 p-5 md:mt-28 md:p-6">
          <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
            <Image
              src={next.hero}
              alt={`${next.title} preview`}
              fill
              sizes="(min-width: 768px) 75vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-1 md:mt-6 md:px-2">
            <div className="text-[13.5px] text-muted-2 md:text-[14px]">
              Brand Strategy &amp; UI/UX Website Design
            </div>
            <Link
              href={`/work/${next.slug}`}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 border border-bone/20 px-6 py-2.5 text-[13.5px] font-medium text-bone transition-colors hover:bg-bone hover:text-black"
            >
              <span>Next</span>
              <span
                aria-hidden
                className="transition-transform duration-500 ease-cinematic group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
