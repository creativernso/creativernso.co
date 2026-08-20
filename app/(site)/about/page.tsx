import Image from"next/image";
import Link from"next/link";
import BrandsMarquee from"@/components/sections/about/BrandsMarquee";
import Stats from"@/components/sections/about/Stats";

export const metadata = {
 title:"About, Ernso Azor",
 description:
"Brand strategist & designer. 8+ years across three worlds. The thread that holds.",
};

const brands = [
"/brands/brand-07.png",
"/brands/brand-08.png",
"/brands/brand-09.png",
"/brands/brand-10.png",
"/brands/brand-11.png",
"/brands/brand-12.png",
"/brands/brand-13.png",
"/brands/brand-14.png",
"/brands/brand-15.png",
"/brands/brand-16.png",
"/brands/brand-17.png",
"/brands/brand-18.png",
];

const tools = [
"/tools/tool-07.png",
"/tools/tool-08.png",
"/tools/tool-09.png",
"/tools/tool-10.png",
"/tools/tool-11.png",
"/tools/tool-12.png",
"/tools/tool-13.png",
"/tools/tool-14.png",
"/tools/tool-15.png",
"/tools/tool-16.png",
"/tools/tool-17.png",
"/tools/tool-18.png",
"/tools/tool-19.png",
"/tools/tool-20.png",
"/tools/tool-21.png",
];

export default function AboutPage() {
 return (
 <section
 data-theme="dark"
 className="relative min-h-screen py-10 text-bone md:py-14"
 >
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 {/* Title */}
 <h1 className="font-display text-bone text-[clamp(36px,5vw,64px)] font-normal leading-[1.05] tracking-[-0.04em]">
 Where it all began
 </h1>

 {/* Portrait + Bio, wrapped in a dark gray card with hairline outline */}
 <div
 className="mt-16 bg-black/30 backdrop-blur-md backdrop-saturate-100 p-6 md:mt-24 md:p-10"
 style={{ boxShadow:"inset 0 0 0 0.5px rgba(255,255,255,0.08)"}}
 >
 <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
 {/* Image — square */}
 <div className="relative aspect-square overflow-hidden bg-black">
 <Image
 src="/about-portrait.png"
 alt="Ernso Azor"
 fill
 sizes="(min-width: 768px) 50vw, 90vw"
 className="object-cover"
 priority
 />
 </div>

 {/* Text — content vertically centered, no square cropping */}
 <div className="flex flex-col justify-center">
 <h2 className="font-display text-bone text-[clamp(28px,3.4vw,48px)] font-normal leading-[1.1] tracking-[-0.04em]">
 I don&rsquo;t choose branding.
 <br />
 Branding chose me.
 </h2>
 <div className="mt-6 space-y-5 text-[16px] leading-[1.6] text-muted-2 [text-align:justify] md:text-[18px] md:leading-[1.65]">
 <p>
 It started long before I knew what design was. As a child, I
 was the one who noticed things. The way a logo felt wrong, the
 way a colour changed a room, the way certain names stayed in
 your mind and others disappeared. I was paying attention to
 identity before I had language for it.
 </p>
 <p>
 That obsession led me into design. And design led me somewhere
 deeper: into the realisation that every person, every
 institution, every artist carries a uniqueness most never
 learn to show. Over 8+ years, across three very different
 worlds, I have done the same thing every time.
 </p>
 <p>
 From the boardrooms of corporate institutions to the studios
 of artists and the platforms of public figures, I find the
 truth that was always there, and make it impossible to ignore.
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Stats, animated counters */}
 <Stats />

 {/* 8+ years across three worlds */}
 <div className="mt-24 md:mt-32">
 <h2 className="font-display text-bone text-[clamp(32px,4.2vw,56px)] font-normal leading-[1.1] tracking-[-0.04em]">
 8+ years across three worlds.
 </h2>

 <div
 className="mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 p-6 md:mt-8 md:p-10"
 style={{ boxShadow:"inset 0 0 0 0.5px rgba(255,255,255,0.08)"}}
 >
 <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
 {/* Text — left side, vertically centered */}
 <div className="flex flex-col justify-center space-y-5 text-[16px] leading-[1.6] text-muted-2 md:space-y-6 md:text-[18px] md:leading-[1.65] md:[text-align:justify]">
 <p>
 The corporate world taught me rigor, systems thinking, and
 the architecture of credibility.
 </p>
 <p>
 The professional world taught me the intimacy of personal
 positioning and how deeply a brand can shape someone&rsquo;s
 sense of authority.
 </p>
 <p>
 The creative world taught me that emotion and identity are
 inseparable, and that the most powerful brands are felt
 before they are seen.
 </p>
 <p>
 Together, these three worlds built a practitioner who can
 walk into any room — boardroom, consulting room, recording
 studio — and find the truth that makes that brand
 irreplaceable.
 </p>
 </div>

 {/* Image — right side, square */}
 <div className="relative aspect-square overflow-hidden bg-black">
 <Image
 src="https://picsum.photos/seed/workspace-craft/1080/1080?grayscale"
 alt="Working across three worlds"
 fill
 sizes="(min-width: 768px) 50vw, 90vw"
 className="object-cover"
 />
 </div>
 </div>
 </div>
 </div>

 {/* Ready to begin? CTA */}
 <div
 className="mt-10 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 px-5 py-7 md:mt-8 md:px-12 md:py-14"
 style={{ boxShadow:"inset 0 0 0 0.5px rgba(255,255,255,0.08)"}}
 >
 <div className="flex flex-wrap items-center justify-between gap-8">
 <div className="max-w-2xl">
 <p className="text-[16px] leading-[1.5] text-bone md:text-[20px]">
 If what you&rsquo;ve read here resonates, you already know what
 the next step is.
 </p>
 </div>
 <Link
 href="/#contact"
 data-cursor="hover"
 data-press
 className="group inline-flex items-center gap-2 bg-black/30 px-10 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-bone backdrop-blur-sm transition-colors hover:bg-bone hover:text-black md:text-[13px]"
 style={{
 boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)",
 }}
 >
 <span>Initiate</span>
 <span
 aria-hidden
 className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
 >
 ↗
 </span>
 </Link>
 </div>
 </div>

 {/* Brand wall, animated marquee */}
 <div className="mt-24 md:mt-32">
 <h2 className="font-display text-bone text-[clamp(28px,3.6vw,44px)] font-normal leading-[1.1] tracking-[-0.04em]">
 Brands I&rsquo;ve worked for
 </h2>
 <div className="mt-6 md:mt-8">
 <BrandsMarquee />
 </div>
 </div>

 {/* Tools */}
 <div className="mt-24 md:mt-32">
 <h2 className="font-display text-bone text-[clamp(28px,3.6vw,44px)] font-normal leading-[1.1] tracking-[-0.04em]">
 Tools
 </h2>
 <ul className="mt-8 grid grid-cols-5 gap-2.5 md:gap-3 md:[grid-template-columns:repeat(15,minmax(0,1fr))]">
 {tools.map((src, i) => (
 <li
 key={i}
 className="relative aspect-square border border-bone/10 bg-black/30 p-2 md:p-2.5"
 >
 <div className="relative h-full w-full">
 <Image
 src={src}
 alt=""
 fill
 sizes="(min-width: 768px) 6vw, 18vw"
 className="object-contain"
 />
 </div>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </section>
 );
}
