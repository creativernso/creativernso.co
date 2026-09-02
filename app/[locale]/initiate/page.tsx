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
        <header>
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
