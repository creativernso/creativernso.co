import { getTranslations } from "next-intl/server";

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
        <h1 className="font-display text-bone text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.04em]">
          {t("title")}
        </h1>
        <p className="mt-3 text-[13px] text-muted-2">
          {t("updatedLabel")} {t("updatedDate")}
        </p>

        <div className="mt-10 space-y-9 text-[15px] leading-[1.7] text-muted-2 md:text-[16px]">
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
        </div>
      </div>
    </section>
  );
}
