import DirectContact from "@/components/sections/initiate/DirectContact";
import ContactForm from "@/components/sections/initiate/ContactForm";
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
          <p className="mt-3 text-[15px] leading-relaxed text-muted-2 md:whitespace-nowrap md:text-[18px]">
            {t("heroSubtitle")}
          </p>
        </header>

        <div className="mt-10 md:mt-14">
          <DirectContact />
        </div>

        <div className="mt-16 md:mt-20">
          <h2 className="font-display text-bone text-[clamp(24px,3.6vw,48px)] font-bold leading-[1.15] tracking-[-0.03em]">
            {t("formHeading")}
          </h2>
          <div className="mt-6 md:mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
