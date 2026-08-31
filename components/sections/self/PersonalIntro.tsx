"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PersonalIntro() {
  const t = useTranslations("personalIntro");
  return (
    <section data-theme="dark" className="relative py-10 text-bone md:py-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="font-display text-[clamp(36px,6vw,88px)] font-bold leading-[1.05] tracking-[-0.04em]"
        >
          <span className="text-bone">{t("titleLine1")}</span>
          <br />
          <span className="text-muted-2">{t("titleLine2")}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-4 md:mt-8 md:p-6"
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
            />
          </div>

          <div className="mt-6 space-y-5 text-[14px] leading-[1.6] text-muted-2 [hyphens:auto] [text-align:justify] [text-wrap:pretty] md:mt-8 md:text-[19px] md:leading-[1.65]">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>

          <div className="mt-8 md:mt-10">
            <Link
              href="/about"
              data-cursor="hover"
              data-press
              className="group inline-flex items-center gap-4 bg-black/30 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-md transition-colors hover:bg-bone hover:text-black md:text-[13px]"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.22)" }}
            >
              <span>{t("cta")}</span>
              <span
                aria-hidden
                className="inline-flex h-5 w-5 items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 20 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 6h18M13 1l6 5-6 5" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
