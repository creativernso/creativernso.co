import Image from"next/image";
import { client } from"@/lib/sanity/client";
import { projectsQuery } from"@/lib/sanity/queries";
import { localizeProject, type RawProject } from"@/lib/content";
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
 {/* Hero image */}
 <div className="relative aspect-[2400/1126] overflow-hidden border border-bone/20 bg-black/30">
 <Image
 src="/work-hero.jpg"
 alt="Ernso Azor at work"
 fill
 sizes="(min-width: 1400px) 1304px, (min-width: 768px) 90vw, 95vw"
 quality={88}
 className="object-cover"
 priority
 />
 </div>

 {/* Header */}
 <header className="mt-8 md:mt-12">
 <h1 className="font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.05] tracking-[-0.04em]">
 {t("heroTitle")}
 </h1>
 </header>

 <WorkFilter projects={projects} />

 <MarkLibrary />
 </div>
 </section>
 );
}
