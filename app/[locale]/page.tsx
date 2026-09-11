import Hero from"@/components/sections/self/Hero";
import HeadlineMarquee from"@/components/sections/self/HeadlineMarquee";
import ThreeWorlds from"@/components/sections/self/ThreeWorlds";
import SelectedWork from"@/components/sections/self/SelectedWork";
import PersonalIntro from"@/components/sections/self/PersonalIntro";
import Testimonials from"@/components/sections/self/Testimonials";
import ReadyToBeSeen from"@/components/sections/self/ReadyToBeSeen";
import { client } from"@/lib/sanity/client";
import { projectsQuery } from"@/lib/sanity/queries";
import { localizeProject, type RawProject } from"@/lib/content";

export const revalidate = 30;

export default async function HomePage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 const raw = await client.fetch<RawProject[]>(projectsQuery);
 const projects = raw.map((p) => localizeProject(p, locale));
 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "ProfessionalService",
 name: "Ernso Azor",
 url: "https://creativernso.co",
 image: "https://creativernso.co/opengraph-image.png",
 description:
 "Brand strategist & designer building identities across institutions, professionals and creators.",
 founder: {
 "@type": "Person",
 name: "Ernso Azor",
 },
 };
 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
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
