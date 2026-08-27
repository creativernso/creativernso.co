import { client } from"@/lib/sanity/client";
import { projectsQuery } from"@/lib/sanity/queries";
import type { Project } from"@/lib/content";
import WorkFilter from"@/components/sections/work/WorkFilter";

export const revalidate = 30;

export const metadata = {
 title:"Work Ernso Azor",
 description:
"Work that reveals selected brand projects across institutional, individual and creative worlds.",
};

export default async function WorkPage() {
 const projects = await client.fetch<Project[]>(projectsQuery);
 return (
 <section
 data-theme="dark"
 className="relative min-h-screen py-10 text-bone md:py-14"
 >
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 {/* Header */}
 <header>
 <h1 className="font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.05] tracking-[-0.04em]">
 Work that reveals.
 </h1>
 </header>

 <WorkFilter projects={projects} />
 </div>
 </section>
 );
}
