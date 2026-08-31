import { Anton } from"next/font/google";
import { getTranslations } from"next-intl/server";

const condensed = Anton({
 subsets: ["latin"],
 weight: ["400"],
 variable:"--font-condensed",
 display:"swap",
});

export default async function HeadlineMarquee() {
 const t = await getTranslations("marquee");
 const items = [t("item1"), t("item2"), t("item3"), t("item4")];
 // Render the items 4× inside the track so the seamless -50% loop has enough width
 const set = items.flatMap((it, i) => [it, i === items.length - 1 ? null :"•"]);
 const doubled = [...set, ...set];

 return (
 <div
 data-theme="dark"
 className="relative overflow-hidden py-3 md:py-5"
 style={{
 maskImage:
"linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
 WebkitMaskImage:
"linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
 }}
 >
 <div
 className="marquee-track flex w-max items-center gap-x-12 md:gap-x-16"
 style={{"--marquee-duration":"55s"} as React.CSSProperties}
 >
 {doubled.map((it, i) =>
 it ==="•"? (
 <span
 key={i}
 aria-hidden
 className="text-[clamp(56px,8vw,120px)] leading-none text-bone/5"
 >
 •
 </span>
 ) : it ? (
 <span
 key={i}
 className={`${condensed.className} text-[clamp(56px,8vw,120px)] uppercase leading-none tracking-[0.12em] text-bone/5`}
 >
 {it}
 </span>
 ) : null
 )}
 </div>
 </div>
 );
}
