import { notFound } from"next/navigation";
import { client } from"@/lib/sanity/client";
import { projectsQuery } from"@/lib/sanity/queries";
import type { Project } from"@/lib/content";
import ProjectDetail from"@/components/sections/work/ProjectDetail";
import { getTranslations } from "next-intl/server";

export const revalidate = 30;

export async function generateStaticParams() {
 const projects = await client.fetch<Project[]>(projectsQuery);
 return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
 const projects = await client.fetch<Project[]>(projectsQuery);
 const p = projects.find((x) => x.slug === params.slug);
 if (!p) {
 const t = await getTranslations("work");
 return { title: t("metaTitle") };
 }
 return {
 title: `${p.title} — Ernso Azor`,
 description: p.subtitle,
 };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
 const projects = await client.fetch<Project[]>(projectsQuery);
 const index = projects.findIndex((x) => x.slug === params.slug);
 if (index === -1) notFound();
 const p = projects[index];
 const next = projects[(index + 1) % projects.length];

 return <ProjectDetail p={p} next={next} />;
}
