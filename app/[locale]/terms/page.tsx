import { getTranslations } from "next-intl/server";
import { LegalTitle, LegalBody } from "@/components/primitives/LegalReveal";

export async function generateMetadata() {
  const t = await getTranslations("terms");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage() {
  const t = await getTranslations("terms");
  const sections = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <section
      data-theme="dark"
      className="relative min-h-screen py-10 text-bone md:py-14"
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-12">
        <LegalTitle>{t("title")}</LegalTitle>
        <p className="mt-3 text-[13px] text-muted-2">
          {t("updatedLabel")} {t("updatedDate")}
        </p>

        <LegalBody>
          <p>{t("intro")}</p>

          {sections.map((n) => (
            <div key={n}>
              <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
                {t(`s${n}Title`)}
              </h2>
              <p className="mt-3">{t(`s${n}Body`)}</p>
            </div>
          ))}

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s10Title")}
            </h2>
            <p className="mt-3">
              {t("s10Pre")}{" "}
              <a
                href="mailto:hey@creativernso.co"
                className="text-bone underline underline-offset-2 hover:text-gold"
              >
                hey@creativernso.co
              </a>
              {t("s10Post")}
            </p>
          </div>
        </LegalBody>
      </div>
    </section>
  );
}
