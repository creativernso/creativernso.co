import { getTranslations } from "next-intl/server";
import { LegalTitle, LegalBody } from "@/components/primitives/LegalReveal";

export async function generateMetadata() {
  const t = await getTranslations("privacy");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
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

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s1Title")}
            </h2>
            <p className="mt-3">{t("s1Body1")}</p>
            <p className="mt-3">{t("s1Body2")}</p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s2Title")}
            </h2>
            <p className="mt-3">{t("s2Body")}</p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s3Title")}
            </h2>
            <p className="mt-3">{t("s3Body")}</p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s4Title")}
            </h2>
            <p className="mt-3">{t("s4Body")}</p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s5Title")}
            </h2>
            <p className="mt-3">
              {t("s5Pre")}{" "}
              <a
                href="mailto:hey@creativernso.co"
                className="text-bone underline underline-offset-2 hover:text-gold"
              >
                hey@creativernso.co
              </a>
              {t("s5Post")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s6Title")}
            </h2>
            <p className="mt-3">{t("s6Body")}</p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s7Title")}
            </h2>
            <p className="mt-3">{t("s7Body")}</p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              {t("s8Title")}
            </h2>
            <p className="mt-3">
              {t("s8Pre")}{" "}
              <a
                href="mailto:hey@creativernso.co"
                className="text-bone underline underline-offset-2 hover:text-gold"
              >
                hey@creativernso.co
              </a>
              {t("s8Post")}
            </p>
          </div>
        </LegalBody>
      </div>
    </section>
  );
}
