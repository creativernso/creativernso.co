import InitiateHero from "@/components/sections/initiate/InitiateHero";
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
        <InitiateHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />

        <InitiateFlow />
      </div>
    </section>
  );
}
