"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useFitText } from "@/lib/useFitText";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

const testimonialNames = [
  { initials: "MK", name: "Marcus Keller" },
  { initials: "AR", name: "Amara Reyes" },
  { initials: "JD", name: "Jules Duval" },
  { initials: "NP", name: "Nadia Prescott" },
  { initials: "TO", name: "Theo Osei" },
];

function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C49A55">
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L5.7 21l1.7-7L2 9.2l7.1-.6z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const testimonials = testimonialNames.map((n, i) => ({
    ...n,
    role: t(`t${i + 1}role` as "t1role"),
    quote: t(`t${i + 1}quote` as "t1quote"),
  }));
  // Duplicate the set so the -50% translate loop is seamless
  const track = [...testimonials, ...testimonials];
  const containerRef = useRef<HTMLDivElement>(null);
  const { textRef, fontSize } = useFitText<HTMLHeadingElement>(containerRef);

  return (
    <section data-theme="dark" className="pt-10 pb-16 text-bone md:pt-14 md:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div ref={containerRef}>
          <motion.h2
            ref={textRef}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="font-display text-bone whitespace-nowrap font-bold leading-[1.1] tracking-[-0.04em]"
            style={{
              fontSize: fontSize ? `${fontSize}px` : "clamp(36px, 6.5vw, 116px)",
              visibility: fontSize ? "visible" : "hidden",
            }}
          >
            {t("title")}
          </motion.h2>
        </div>
      </div>

      <div
        className="relative mt-6 md:mt-8"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      >
        <div className="overflow-hidden">
          <div
            className="marquee-track flex w-max items-stretch gap-4 md:gap-5"
            style={{ "--marquee-duration": "50s" } as React.CSSProperties}
          >
            {track.map((t, i) => (
              <article
                key={i}
                className="flex w-[320px] shrink-0 flex-col bg-black/30 px-6 py-7 backdrop-blur-md backdrop-saturate-100 md:w-[380px] md:px-8 md:py-9"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bone/10 font-display text-[15px] font-bold text-bone">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display text-[18px] font-bold leading-tight text-bone">
                      {t.name}
                    </div>
                    <div className="text-[13px] text-muted-2">{t.role}</div>
                  </div>
                </div>

                <div className="mt-5 h-px w-full bg-bone/10" />

                <p className="mt-5 flex-1 text-[15px] leading-[1.6] text-bone/85">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-2 text-[14px] text-bone">
                  <span>5.0</span>
                  <Stars />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
