"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PersonalIntro() {
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
          <span className="text-bone">Before the brand,</span>
          <br />
          <span className="text-muted-2">the person.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-6 overflow-hidden border border-bone/20 bg-black/30 md:mt-8"
        >
          <div className="relative aspect-[2400/1126]">
            <Image
              src="/personal-intro.jpg"
              alt="Ernso Azor at his desk"
              fill
              sizes="(min-width: 1400px) 1304px, (min-width: 768px) 90vw, 95vw"
              quality={88}
              className="object-cover"
            />
          </div>
        </motion.div>

        <div className="mt-6 max-w-3xl space-y-5 text-[14px] leading-[1.6] text-muted-2 md:mt-8 md:max-w-none md:text-[19px] md:leading-[1.65]">
          <p>
            I&rsquo;m Ernso Azor, a brand designer and strategist based in
            Curitiba, Brazil, with 8+ years spent working across
            institutions, professionals, and creatives who refuse to be
            average. I help people and companies uncover what actually makes
            them different, then build an identity that puts it on full
            display. Not decoration. Not guesswork. I look for the truth
            that&rsquo;s already sitting inside a brand, the part its owner
            usually can&rsquo;t see because they&rsquo;re too close to it, and
            I give it a shape the world can&rsquo;t ignore.
          </p>
          <p>
            I&rsquo;m on a mission to work with ambitious institutions,
            driven professionals, and bold creatives ready to be seen at the
            level they actually operate, not the one their current presence
            suggests.
          </p>
          <p>
            Whether you&rsquo;re a corporation ready to lead with the
            authority you&rsquo;ve already earned, or an artist ready to be
            felt before you&rsquo;re heard, I bring the same discipline:
            strategy first, storytelling that makes people look twice, and
            craft that makes sure they remember you.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-8 md:mt-10"
        >
          <Link
            href="/about"
            data-cursor="hover"
            data-press
            className="group inline-flex items-center gap-4 bg-black/30 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-md transition-colors hover:bg-bone hover:text-black md:text-[13px]"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.22)" }}
          >
            <span>Read my story</span>
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
        </motion.div>
      </div>
    </section>
  );
}
