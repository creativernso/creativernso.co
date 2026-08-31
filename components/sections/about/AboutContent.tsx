"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
            How I got here.
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

          <div className="mt-6 space-y-5 text-[14px] leading-[1.6] text-muted-2 [hyphens:auto] [text-align:justify] [text-wrap:pretty] md:mt-8 md:text-[19px] md:leading-[1.65]">
            <p>
              It started long before I had a word for any of it. As a child, I
              was the one who noticed things nobody else seemed to register:
              the way a logo felt subtly wrong even when I couldn&rsquo;t say
              why, the way a single colour could change the entire mood of a
              room, the way some names lodged themselves in your memory
              forever while others vanished the moment you looked away. I
              wasn&rsquo;t studying identity. I was simply unable to stop
              seeing it, in everything, all the time. That kind of attention
              doesn&rsquo;t feel like a gift when you&rsquo;re young. It feels
              like noise. It took years to understand it was actually a
              compass.
            </p>
            <p>
              That compass finally found its language in 2018, in
              Port-au-Prince, Haiti, at one of the country&rsquo;s leading
              technical schools, where I enrolled to train as a computer
              science technician, not a designer. Graphic design entered my
              life almost as an afterthought, a single module tucked inside a
              much larger technical curriculum. But the moment I touched it,
              everything the child in me had been noticing for years suddenly
              had somewhere to go. I wasn&rsquo;t learning a new skill. I was
              finally being handed the vocabulary for something I&rsquo;d
              already been doing instinctively my whole life.
            </p>
            <p>
              The real turning point came fast, faster than I was ready for.
              In my second year, still a student with more theory than
              experience, a company trusted me to build its entire visual
              identity from nothing. I remember the weight of that moment more
              than the details of the brief: the realization that someone was
              staking their business, their name, their credibility, on my
              judgment. I said yes anyway. That project became the proof
              I&rsquo;ve carried ever since: precision isn&rsquo;t just a
              technical habit, it&rsquo;s a form of respect. The same rigor
              that makes a system run without failure is the exact rigor that
              makes a brand impossible to look away from.
            </p>
            <p>
              Today, that dual foundation, an engineer&rsquo;s obsession with
              structure and a designer&rsquo;s instinct for what moves people,
              shows up in every project I touch, whether the client is a
              corporation, a founder, or an artist. Strategy always comes
              before style. Nothing is decorative unless it&rsquo;s also
              deliberate. And every identity I build still starts exactly
              where it started for me at nineteen: with the discipline to
              notice what&rsquo;s actually true, and the craft to make sure no
              one can ignore it again.
            </p>
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
              What drives me.
            </h2>
          </div>

          <div
            className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-4 md:mt-8 md:p-6"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col justify-center space-y-5 text-[14px] leading-[1.6] text-muted-2 [hyphens:auto] [text-align:justify] [text-wrap:pretty] md:text-[17px] md:leading-[1.65]">
                <p>
                  I don&rsquo;t do this for the applause. I do it because most
                  people, and most brands, are walking around with their real
                  value hidden in plain sight, and that feels like a waste I
                  can&rsquo;t ignore.
                </p>
                <p>
                  Every project starts the same way: not with a mood board,
                  but with a question. What is actually true here, that
                  hasn&rsquo;t been said yet? Corporation, professional, or
                  artist, it doesn&rsquo;t matter. The moment someone stops
                  managing how they&rsquo;re perceived and starts building
                  from what&rsquo;s real, everything changes: how
                  they&rsquo;re trusted, how they&rsquo;re remembered, how
                  they&rsquo;re paid.
                </p>
                <p>
                  That&rsquo;s the job. Not to make things look good. To make
                  the truth impossible to miss.
                </p>
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
              Beyond the work.
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

            <div className="mt-6 space-y-5 text-[14px] leading-[1.6] text-muted-2 [hyphens:auto] [text-align:justify] [text-wrap:pretty] md:mt-8 md:text-[19px] md:leading-[1.65]">
              <p>
                Outside brand strategy, I&rsquo;m still building. I run my
                own digital ventures, and digital marketing is as much an
                obsession as design: understanding how attention moves, what
                makes someone stop scrolling and actually stay, never really
                leaves me.
              </p>
              <p>
                The rest of my life follows the same instinct that runs
                through my work: notice, refine, repeat. I play guitar. I
                train, because discipline in the gym and discipline in a
                brand system come from the same place. I spend hours in
                tutorials and podcasts from people who think sharper than I
                do, not to collect information, but because learning never
                stops feeling urgent to me.
              </p>
              <p>
                I&rsquo;m drawn to nature for the same reason I&rsquo;m drawn
                to identity: it rewards attention. Look closely enough at
                anything and it starts telling you the truth about itself.
              </p>
              <p>
                I hold myself to a standard most people would call excessive.
                Everything I touch, a project, a room, a plan, has to be
                right, not almost right. And I do my best thinking alone.
                Solitude isn&rsquo;t withdrawal for me, it&rsquo;s where I
                actually interrogate myself and question my own decisions
                before anyone else has to. It&rsquo;s how ambition stays
                honest instead of becoming noise.
              </p>
              <p>I think in decades, not quarters.</p>
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
