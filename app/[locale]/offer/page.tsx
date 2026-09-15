import { getTranslations } from "next-intl/server";
import OfferContent from "@/components/sections/offer/OfferContent";

export const dynamic = "force-static";

export async function generateMetadata() {
  const t = await getTranslations("offer");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function OfferPage() {
  return <OfferContent />;
}
