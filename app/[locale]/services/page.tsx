import { getTranslations } from "next-intl/server";
import ServicesContent from "@/components/sections/services/ServicesContent";

export const dynamic = "force-static";

export async function generateMetadata() {
  const t = await getTranslations("services");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}
