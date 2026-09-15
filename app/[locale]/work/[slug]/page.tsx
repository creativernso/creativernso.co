import { notFound } from"next/navigation";
import { client } from"@/lib/sanity/client";
import { projectsQuery } from"@/lib/sanity/queries";
import { localizeProject, type RawProject } from"@/lib/content";
import ProjectDetail from"@/components/sections/work/ProjectDetail";
import { getTranslations } from "next-intl/server";

export const revalidate = 30;

export async function generateStaticParams() {
 const projects = await client.fetch<RawProject[]>(projectsQuery);
 return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string; locale: string }>;
}) {
 const { slug, locale } = await params;
 const projects = await client.fetch<RawProject[]>(projectsQuery);
 const raw = projects.find((x) => x.slug === slug);
 if (!raw) {
 const t = await getTranslations("work");
 return { title: t("metaTitle") };
 }
 const p = localizeProject(raw, locale);
 return {
 title: `${p.title} · Ernso Azor`,
 description: p.subtitle,
 openGraph: {
 title: `${p.title} · Ernso Azor`,
 description: p.subtitle,
 images: [p.hero],
 type: "article",
 },
 twitter: {
 card: "summary_large_image",
 title: `${p.title} · Ernso Azor`,
 description: p.subtitle,
 images: [p.hero],
 },
 };
}

export default async function ProjectPage({
 params,
}: {
 params: Promise<{ slug: string; locale: string }>;
}) {
 const { slug, locale } = await params;
 const projects = await client.fetch<RawProject[]>(projectsQuery);
 const index = projects.findIndex((x) => x.slug === slug);
 if (index === -1) notFound();
 const p = localizeProject(projects[index], locale);
 const next = localizeProject(projects[(index + 1) % projects.length], locale);

 const jsonLd = [
 {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: "https://creativernso.co/" },
 { "@type": "ListItem", position: 2, name: "Work", item: "https://creativernso.co/work" },
 { "@type": "ListItem", position: 3, name: p.title, item: `https://creativernso.co/work/${p.slug}` },
 ],
 },
 {
 "@context": "https://schema.org",
 "@type": "CreativeWork",
 name: p.title,
 description: p.subtitle,
 image: p.hero,
 url: `https://creativernso.co/work/${p.slug}`,
 creator: {
 "@type": "Person",
 name: "Ernso Azor",
 url: "https://creativernso.co",
 },
 },
 ];

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <ProjectDetail p={p} next={next} />
 </>
 );
}
