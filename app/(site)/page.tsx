import StickyHero from"@/components/sections/self/StickyHero";
import HeadlineMarquee from"@/components/sections/self/HeadlineMarquee";
import BrandQuote from"@/components/sections/self/BrandQuote";
import ThreeWorlds from"@/components/sections/self/ThreeWorlds";
import BioStats from"@/components/sections/self/BioStats";
import SelectedWork from"@/components/sections/self/SelectedWork";
import ReadyToBeSeen from"@/components/sections/self/ReadyToBeSeen";
import { client } from"@/lib/sanity/client";
import { projectsQuery } from"@/lib/sanity/queries";
import type { Project } from"@/lib/content";

export default async function HomePage() {
 const projects = await client.fetch<Project[]>(projectsQuery);
 return (
 <>
 {/* Background layer — sticky Hero stays pinned to viewport */}
 <StickyHero />

 {/* Foreground layer — content slides up over the sticky Hero.
 z-10 + opaque .bg-site (bg.png + ink fallback) covers the hero
 while preserving the site's background image and grain texture. */}
 <div className="bg-site relative z-10">
 <HeadlineMarquee />
 <BrandQuote />
 <ThreeWorlds />
 <BioStats />
 <SelectedWork projects={projects} />
 <ReadyToBeSeen />
 </div>
 </>
 );
}
