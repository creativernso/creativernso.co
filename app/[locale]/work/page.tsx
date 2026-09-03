import { client } from"@/lib/sanity/client";
import { projectsQuery } from"@/lib/sanity/queries";
import { localizeProject, type RawProject } from"@/lib/content";
import WorkHero from"@/components/sections/work/WorkHero";
import WorkFilter from"@/components/sections/work/WorkFilter";
import MarkLibrary from"@/components/sections/work/MarkLibrary";
import { getTranslations } from "next-intl/server";

export const revalidate = 30;

export async function generateMetadata() {
  const t = await getTranslations("work");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WorkPage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 const raw = await client.fetch<RawProject[]>(projectsQuery);
 const projects = raw.map((p) => localizeProject(p, locale));
 const t = await getTranslations("work");
 return (
 <section
 data-theme="dark"
 className="relative min-h-screen py-10 text-bone md:py-14"
 >
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 <WorkHero title={t("heroTitle")} />

 <WorkFilter projects={projects} />

 <MarkLibrary />
 </div>
 </section>
 );
}
