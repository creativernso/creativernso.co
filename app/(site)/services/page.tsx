"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useFitText } from "@/lib/useFitText";

export const dynamic = "force-static";

const EASE = [0.16, 1, 0.3, 1] as const;

const beliefs = [
  {
    n: "I",
    title: "Branding is revelation",
    body: "A brand is never invented. It is uncovered. The most powerful identities feel inevitable like they could only belong to that person, that institution, that artist. My job is to make that truth visible.",
  },
  {
    n: "II",
    title: "Uniqueness is the strategy",
    body: "In a world of imitation, the most dangerous thing a brand can do is look like someone else. What makes you different whether you're a CEO or a creator is not a risk. It is your greatest asset.",
  },
  {
    n: "III",
    title: "Perception is power",
    body: "How the world sees you determines what comes to you. For a corporation, it shapes deals. For an expert, it shapes authority. For an artist, it shapes reach. Managing perception is not vanity it is strategy.",
  },
  {
    n: "IV",
    title: "Design is a philosophy",
    body: "Every color, typeface, and spatial decision communicates something. There are no neutral choices. Everything means something which means everything must be intentional, from a boardroom annual report to an Instagram grid.",
  },
  {
    n: "V",
    title: "Alignment is the goal",
    body: "A brand works when what you say, what you show, and what you do all point in the same direction whether on a company website or a creator's social presence. Misalignment is the most expensive mistake a brand can make.",
  },
  {
    n: "VI",
    title: "The REVEAL Framework",
    body: "Root → Excavate → Voice → Express → Align → Launch. A proprietary six-stage methodology that works across all three worlds: finding and revealing the authentic identity that was always there, waiting to be seen.",
  },
] as const;

const revealRows = [
  { letter: "R", name: "Root", desc: "Who you truly are before anything else" },
  { letter: "E", name: "Excavate", desc: "The uniqueness that already exists" },
  { letter: "V", name: "Voice", desc: "The language through which the brand speaks" },
  { letter: "E", name: "Express", desc: "Strategy translated into visible identity" },
  { letter: "A", name: "Align", desc: "Consistent across every touchpoint" },
  { letter: "L", name: "Launch", desc: "Unmissable from the very first moment" },
] as const;

export default function BeliefPage() {
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
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-[clamp(36px,5vw,96px)] font-bold leading-[1.05] tracking-[-0.04em]"
        >
          <span className="text-bone">What </span>
          <span className="text-bone/35">I believe.</span>
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
                <span className="block text-bone">Everyone is a brand.</span>
                <span className="block text-bone">
                  Most just don&rsquo;t know
                </span>
                <span className="block text-bone/40">how to show it.</span>
              </p>
              <p className="mt-5 text-[12px] text-bone/65 md:mt-7 md:text-[14px]">
                Ernso Azor &nbsp;·&nbsp; Graphic Designer / Brand Strategist
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
              <span className="font-semibold text-bone">Ernso Azor</span>
              <span className="px-1.5 text-bone/45">·</span>
              <span className="text-bone/75">
                Graphic Designer / Brand Strategist
              </span>
            </p>

            <p className="mt-3 font-display text-[26px] font-bold leading-[1.08] tracking-[-0.03em]">
              <span className="block text-bone">Everyone is a brand.</span>
              <span className="block text-bone">
                Most just don&rsquo;t know
              </span>
              <span className="block text-bone/35">how to show it.</span>
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
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.03em]"
              style={{
                fontSize: beliefsTitle.fontSize
                  ? `${beliefsTitle.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
                visibility: beliefsTitle.fontSize ? "visible" : "hidden",
              }}
            >
              The beliefs that never change.
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: EASE }}
                  className="flex flex-col border-b border-r border-bone/10 px-6 pb-7 pt-7 md:px-10 md:pb-9 md:pt-9"
                  data-cursor="hover"
                >
                  <span
                    aria-hidden
                    className="select-none font-display text-[15px] font-bold tracking-[0.1em] text-bone"
                  >
                    {b.n}
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
          <div>
            <motion.h2
              ref={revealTitle.textRef}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.03em]"
              style={{
                fontSize: revealTitle.fontSize
                  ? `${revealTitle.fontSize}px`
                  : "clamp(36px, 5vw, 96px)",
                visibility: revealTitle.fontSize ? "visible" : "hidden",
              }}
            >
              The REVEAL Framework.
            </motion.h2>
            <p className="mt-3 text-[15px] text-muted-2 md:text-[18px]">
              A six-stage methodology, applied in order, every time.
            </p>
          </div>

          {/* REVEAL rows — merged rectangle, one row per stage */}
          <div
            ref={revealRectRef}
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-8"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="divide-y divide-bone/10">
              {revealRows.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="group flex flex-col gap-3 px-6 py-6 transition-colors hover:bg-bone/[0.03] sm:flex-row sm:items-center sm:gap-6 md:px-10 md:py-7"
                  data-cursor="hover"
                >
                  {/* Letter badge */}
                  <div className="flex items-center gap-4 sm:contents">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center border border-bone/15 font-display text-[18px] font-bold text-bone md:h-12 md:w-12 md:text-[20px]"
                    >
                      {r.letter}
                    </span>

                    {/* Name — shown next to the badge on mobile, own column on desktop */}
                    <span className="font-display text-[18px] font-bold text-bone sm:hidden">
                      {r.name}
                    </span>
                  </div>

                  <span className="hidden font-display text-[19px] font-bold text-bone sm:block sm:w-[140px] md:w-[170px] md:text-[22px]">
                    {r.name}
                  </span>

                  {/* Description */}
                  <span className="text-[15px] leading-relaxed text-muted-2 sm:flex-1 md:text-[17px]">
                    {r.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline under REVEAL */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 md:mt-14"
        >
          <p className="font-display text-[clamp(18px,1.8vw,24px)] font-normal leading-tight tracking-[-0.02em] text-bone">
            One process. Three worlds. One direction:
          </p>
          <p className="mt-1 font-display text-[clamp(18px,1.8vw,24px)] font-normal leading-tight tracking-[-0.02em] text-bone/35">
            from obscurity to unmistakable
          </p>
        </motion.div>

        {/* CTA — Let's build something */}
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
                Let&rsquo;s build something
              </h3>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-2 md:text-[14.5px]">
                If what you&rsquo;ve read here
                <br className="hidden md:block" />
                aligns with how you see your brand
              </p>
            </div>

            <Link
              href="/#contact"
              data-cursor="hover"
              data-press
              className="group inline-flex items-center gap-3 px-7 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.32em] text-bone transition-colors hover:bg-bone hover:text-black md:text-[13px] md:tracking-[0.4em]"
              style={{ boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.18)" }}
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
        </motion.div>
      </div>
    </section>
  );
}
