import Link from"next/link";

const socials = [
 {
 href:"mailto:hey@creativernso.co",
 label:"Email",
 external: false,
 icon: (
 <svg
 width="16"
 height="16"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.7"
 strokeLinecap="round"
 strokeLinejoin="round"
 aria-hidden
 >
 <rect x="3"y="5"width="18"height="14"rx="2"/>
 <path d="M3 7l9 7 9-7"/>
 </svg>
 ),
 },
 {
 href:"https://www.instagram.com/creativernso/",
 label:"Instagram",
 external: true,
 icon: (
 <svg
 width="16"
 height="16"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.7"
 strokeLinecap="round"
 strokeLinejoin="round"
 aria-hidden
 >
 <rect x="2"y="2"width="20"height="20"rx="5"ry="5"/>
 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
 <line x1="17.5"x2="17.51"y1="6.5"y2="6.5"/>
 </svg>
 ),
 },
 {
 href:"https://www.linkedin.com/in/ernsoazor/",
 label:"LinkedIn",
 external: true,
 icon: (
 <svg
 width="16"
 height="16"
 viewBox="0 0 24 24"
 fill="currentColor"
 aria-hidden
 >
 <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.36v1.92h.06c.6-1.13 2.08-2.33 4.28-2.33 4.58 0 5.42 3.02 5.42 6.95V22h-4.55v-6.18c0-1.47-.03-3.37-2.05-3.37-2.05 0-2.36 1.6-2.36 3.26V22H7.62V8z"/>
 </svg>
 ),
 },
 {
 href:"https://www.behance.net/ernsoazor7",
 label:"Behance",
 external: true,
 icon: (
 <span
 aria-hidden
 className="font-display text-[11px] font-bold leading-none tracking-tight"
 >
 Bē
 </span>
 ),
 },
 {
 href:"https://x.com/Creativ_ernso",
 label:"X",
 external: true,
 icon: (
 <svg
 width="15"
 height="15"
 viewBox="0 0 24 24"
 fill="currentColor"
 aria-hidden
 >
 <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.94l-5.43-7.1L4.36 22H1.1l8.04-9.18L1 2h7.11l4.91 6.49L18.244 2zm-1.22 18h1.9L7.07 4H5.04l11.984 16z"/>
 </svg>
 ),
 },
];

export default function Footer() {
 return (
 <footer data-theme="dark"className="pb-6 md:pb-12">
 <div className="mx-auto max-w-[1400px] px-6 md:px-12">
 <div
 className="relative overflow-hidden bg-black px-6 py-12 md:px-12 md:py-14"
 style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.14)"}}
 >
 <div className="grid grid-cols-12 items-end gap-x-6 gap-y-10">
 {/* Left, Let's Connect + socials */}
 <div className="col-span-12 md:col-span-6">
 <h2 className="font-display text-bone text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.02] tracking-[-0.04em]">
 Let&rsquo;s Connect
 </h2>

 <ul className="mt-8 flex items-center gap-3">
 {socials.map((s) => (
 <li key={s.label}>
 <a
 href={s.href}
 target={s.external ?"_blank": undefined}
 rel={s.external ?"noreferrer": undefined}
 aria-label={s.label}
 data-cursor="hover"
 className="group inline-flex h-10 w-10 items-center justify-center border border-bone/10 bg-black/30 text-bone/85 transition-colors hover:border-bone/40 hover:bg-ink hover:text-bone"
 >
 {s.icon}
 </a>
 </li>
 ))}
 </ul>
 </div>

 {/* Right, Nav + CTA */}
 <nav className="col-span-12 flex flex-wrap items-center justify-start gap-6 md:col-span-6 md:justify-end md:gap-8">
 <Link
 href="/"
 data-cursor="hover"
 className="text-[12px] font-medium uppercase tracking-[0.18em] text-bone/85 transition-colors hover:text-bone"
 >
 Self
 </Link>
 <Link
 href="/about"
 data-cursor="hover"
 className="text-[12px] font-medium uppercase tracking-[0.18em] text-bone/85 transition-colors hover:text-bone"
 >
 Story
 </Link>
 <Link
 href="/services"
 data-cursor="hover"
 className="text-[12px] font-medium uppercase tracking-[0.18em] text-bone/85 transition-colors hover:text-bone"
 >
 Belief
 </Link>
 <Link
 href="/work"
 data-cursor="hover"
 className="text-[12px] font-medium uppercase tracking-[0.18em] text-bone/85 transition-colors hover:text-bone"
 >
 Creations
 </Link>
 <Link
 href="/initiate"
 data-cursor="hover"
 data-press
 className="group inline-flex items-center gap-2 border border-bone/20 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-bone transition-colors hover:bg-bone hover:text-black"
 >
 <span>Initiate</span>
 <span
 aria-hidden
 className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
 >
 ↗
 </span>
 </Link>
 </nav>
 </div>

 {/* Sub-footer line */}
 <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-bone/10 pt-6 text-[12px] text-muted-2 md:mt-16">
 <div>
 © {new Date().getFullYear()} Ernso Azor. Revealing what was always there.
 </div>
 <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
 <Link href="/terms" data-cursor="hover" className="transition-colors hover:text-bone">
 Terms of Service
 </Link>
 <Link href="/privacy" data-cursor="hover" className="transition-colors hover:text-bone">
 Privacy Policy
 </Link>
 <span>@creativernso · Brand Strategy &amp; Design</span>
 </div>
 </div>
 </div>
 </div>
 </footer>
 );
}
