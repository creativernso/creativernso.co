"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useFitText } from "@/lib/useFitText";

export const dynamic = "force-static";

const EASE = [0.16, 1, 0.3, 1] as const;

type DisciplineGroup = { n: string; name: string; items: string[] };
type ProcessStep = { n: string; label: string; name: string; desc: string };

function DisciplineRow({
  group,
  isOpen,
  onToggle,
}: {
  group: DisciplineGroup;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-bone/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        data-cursor="hover"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
      >
        <span
          className={`font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em] transition-colors md:text-[28px] ${
            isOpen ? "text-bone" : "text-bone/60"
          }`}
        >
          {group.name}
        </span>
        <span
          aria-hidden
          className="relative flex h-4 w-4 shrink-0 items-center justify-center"
        >
          <span className="absolute h-px w-4 bg-bone" />
          <span
            className="absolute h-4 w-px bg-bone transition-transform duration-300 ease-out"
            style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-10 text-[14px] leading-[1.75] text-muted-2 md:pb-9 md:pr-16 md:text-[15.5px]">
              {group.items.join("   ·   ")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PROCESS_IMAGES: (string | null)[] = [
  "/process-01-discovery.jpg",
  "/process-02-proposal.jpg",
  "/process-03-agreement.jpg",
  "/process-04-creation.jpg",
  "/process-05-review.jpg",
  "/process-06-delivery.jpg",
];

function ProcessNumeralPanel({
  n,
  image,
}: {
  n: string;
  image: string | null;
}) {
  return (
    <div className="relative hidden aspect-[4/3] overflow-hidden border border-bone/10 bg-bone/[0.02] md:block">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1400px) 600px, 45vw"
          quality={85}
          className="object-cover grayscale"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 flex select-none items-center justify-center font-display text-[150px] font-bold leading-none text-bone/[0.06]"
        >
          {n}
        </span>
      )}
    </div>
  );
}

export default function OfferPage() {
  const t = useTranslations("offer");
  const disciplineGroups = t.raw("disciplineGroups") as DisciplineGroup[];
  const processSteps = t.raw("processSteps") as ProcessStep[];
  const [openDiscipline, setOpenDiscipline] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const pageTitle = useFitText<HTMLHeadingElement>(contentRef);
  const processTitle = useFitText<HTMLHeadingElement>(contentRef);

  return (
    <section
      data-theme="dark"
      className="relative min-h-screen py-10 text-bone md:py-14"
    >
      <div ref={contentRef} className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header — "What I bring to the table." */}
        <motion.h1
          ref={pageTitle.textRef}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display font-bold leading-[1.05] tracking-[-0.04em] md:whitespace-nowrap"
          style={{
            fontSize: pageTitle.fontSize
              ? `${pageTitle.fontSize}px`
              : "clamp(36px, 5vw, 96px)",
            visibility: pageTitle.fontSize ? "visible" : "hidden",
          }}
        >
          <span className="text-bone">{t("titleLead")}</span>
          <span className="text-bone/35">{t("titleRest")}</span>
        </motion.h1>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          className="relative mt-8 aspect-[2400/1126] overflow-hidden border border-bone/20 bg-black/30 md:mt-12"
        >
          <Image
            src="/about-worlds.jpg"
            alt="Ernso Azor"
            fill
            sizes="(min-width: 1400px) 1304px, (min-width: 768px) 90vw, 95vw"
            quality={88}
            className="object-cover"
            priority
          />
        </motion.div>

        {/* "The Disciplines" — asymmetric split: intro left, accordion right */}
        <div className="mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
          >
            <div className="md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]">
              <div className="border-b border-bone/10 px-6 pb-8 pt-8 md:border-b-0 md:border-r md:px-10 md:py-10">
                <h2 className="font-display text-bone text-[clamp(28px,3vw,44px)] font-bold leading-[1.1] tracking-[-0.03em]">
                  {t("disciplinesTitle")}
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed text-muted-2 md:text-[15.5px]">
                  {t("disciplinesIntro")}
                </p>
              </div>

              <div className="px-6 md:px-10">
                {disciplineGroups.map((g, i) => (
                  <DisciplineRow
                    key={g.name}
                    group={g}
                    isOpen={openDiscipline === i}
                    onToggle={() =>
                      setOpenDiscipline((cur) => (cur === i ? -1 : i))
                    }
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* "How we work together." — alternating timeline */}
        <div className="mt-24 md:mt-32">
          <motion.h2
            ref={processTitle.textRef}
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display text-bone font-bold leading-[1.1] tracking-[-0.03em] md:whitespace-nowrap"
            style={{
              fontSize: processTitle.fontSize
                ? `${processTitle.fontSize}px`
                : "clamp(36px, 5vw, 96px)",
              visibility: processTitle.fontSize ? "visible" : "hidden",
            }}
          >
            {t("processTitle")}
          </motion.h2>

          <div className="relative mt-16 md:mt-20">
            {/* connecting line, grows in on scroll */}
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-y-0 left-[22px] w-px -translate-x-1/2 bg-bone/15 md:left-1/2"
            />

            <div className="flex flex-col gap-10 md:gap-6">
              {processSteps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, y: 64 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                  >
                    {/* mobile: simple stacked card */}
                    <div className="flex items-start gap-4 md:hidden">
                      <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-bone/20 bg-ink font-display text-[14px] font-bold text-bone">
                        {step.n}
                      </span>
                      <div>
                        <h3 className="font-display text-bone text-[19px] font-bold leading-[1.2] tracking-[-0.02em]">
                          {step.name}
                        </h3>
                        <p className="mt-2 text-[14px] leading-[1.6] text-muted-2">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* desktop: alternating zigzag with connecting line */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 lg:gap-12">
                      {isEven ? (
                        <>
                          <div className="text-right">
                            <h3 className="font-display text-bone text-[24px] font-bold leading-[1.2] tracking-[-0.02em] lg:text-[28px]">
                              {step.name}
                            </h3>
                            <p className="mt-3 text-[15px] leading-[1.6] text-muted-2 lg:text-[16px]">
                              {step.desc}
                            </p>
                          </div>
                          <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center border border-bone/20 bg-ink font-display text-[15px] font-bold text-bone">
                            {step.n}
                          </span>
                          <ProcessNumeralPanel n={step.n} image={PROCESS_IMAGES[i]} />
                        </>
                      ) : (
                        <>
                          <ProcessNumeralPanel n={step.n} image={PROCESS_IMAGES[i]} />
                          <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center border border-bone/20 bg-ink font-display text-[15px] font-bold text-bone">
                            {step.n}
                          </span>
                          <div>
                            <h3 className="font-display text-bone text-[24px] font-bold leading-[1.2] tracking-[-0.02em] lg:text-[28px]">
                              {step.name}
                            </h3>
                            <p className="mt-3 text-[15px] leading-[1.6] text-muted-2 lg:text-[16px]">
                              {step.desc}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA — Ready to begin? */}
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
              <h3 className="font-display text-[clamp(34px,4.6vw,60px)] font-bold leading-[1.1] tracking-[-0.03em] text-bone">
                {t("ctaHeading")}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-2 md:whitespace-nowrap md:text-[24px]">
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
