import Image from "next/image";
import InitiateFlow from "@/components/sections/initiate/InitiateFlow";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("initiate");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function InitiatePage() {
  const t = await getTranslations("initiate");
  return (
    <section
      data-theme="dark"
      className="relative min-h-screen bg-ink py-10 text-bone md:py-14"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Hero image */}
        <div className="relative aspect-[2400/1126] overflow-hidden border border-bone/20 bg-black/30">
          <Image
            src="/personal-intro.jpg"
            alt="Ernso Azor"
            fill
            sizes="(min-width: 1400px) 1304px, (min-width: 768px) 90vw, 95vw"
            quality={88}
            className="object-cover"
            priority
          />
        </div>

        <header className="mt-8 md:mt-12">
          <h1 className="font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.05] tracking-[-0.04em]">
            {t("heroTitle")}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-2 md:text-[18px]">
            {t("heroSubtitle")}
          </p>
        </header>

        <InitiateFlow />
      </div>
    </section>
  );
}
