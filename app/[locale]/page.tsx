import Hero from"@/components/sections/self/Hero";
import HeadlineMarquee from"@/components/sections/self/HeadlineMarquee";
import ThreeWorlds from"@/components/sections/self/ThreeWorlds";
import SelectedWork from"@/components/sections/self/SelectedWork";
import PersonalIntro from"@/components/sections/self/PersonalIntro";
import Testimonials from"@/components/sections/self/Testimonials";
import ReadyToBeSeen from"@/components/sections/self/ReadyToBeSeen";
import { client } from"@/lib/sanity/client";
import { projectsQuery } from"@/lib/sanity/queries";
import type { Project } from"@/lib/content";

export const revalidate = 30;

export default async function HomePage() {
 const projects = await client.fetch<Project[]>(projectsQuery);
 return (
 <>
 <Hero />
 <div className="bg-site relative z-10">
 <HeadlineMarquee />
 <SelectedWork projects={projects} />
 <PersonalIntro />
 <ThreeWorlds />
 <Testimonials />
 <ReadyToBeSeen />
 </div>
 </>
 );
}
