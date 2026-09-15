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
import { getTranslations } from "next-intl/server";

export const revalidate = 30;

export async function generateMetadata() {
 const t = await getTranslations("home");
 return {
 title: t("metaTitle"),
 description: t("metaDescription"),
 };
}

export default async function HomePage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 const raw = await client.fetch<RawProject[]>(projectsQuery);
 const projects = raw.map((p) => localizeProject(p, locale));
 const jsonLd = [
 {
 "@context": "https://schema.org",
 "@type": "Person",
 name: "Ernso Azor",
 url: "https://creativernso.co",
 image: "https://creativernso.co/opengraph-image.png",
 jobTitle: "Brand Designer & Brand Strategist",
 description:
 "Brand Designer and Brand Strategist based in Curitiba, Brazil, building brand identities and visual systems for companies, professionals and creators.",
 address: {
 "@type": "PostalAddress",
 addressLocality: "Curitiba",
 addressRegion: "Paraná",
 addressCountry: "BR",
 },
 sameAs: [
 "https://www.behance.net/ernsoazor7",
 "https://www.linkedin.com/in/ernsoazor/",
 "https://www.instagram.com/creativernso/",
 "https://x.com/Creativ_ernso",
 ],
 },
 {
 "@context": "https://schema.org",
 "@type": "WebSite",
 name: "Ernso Azor",
 url: "https://creativernso.co",
 },
 ];
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
