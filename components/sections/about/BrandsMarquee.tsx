import Image from"next/image";

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

// Three rows with shuffled order so the rows feel distinct.
const rows: { items: string[]; direction:"left"|"right"; duration: number }[] = [
 { items: brands, direction:"left", duration: 65 },
 {
 items: [
 brands[3], brands[7], brands[0], brands[10],
 brands[5], brands[1], brands[8], brands[11],
 brands[2], brands[6], brands[9], brands[4],
 ],
 direction:"right",
 duration: 80,
 },
 {
 items: [
 brands[6], brands[2], brands[9], brands[1],
 brands[11], brands[4], brands[7], brands[0],
 brands[8], brands[3], brands[10], brands[5],
 ],
 direction:"left",
 duration: 95,
 },
];

export default function BrandsMarquee() {
 return (
 <div
 className="relative"
 style={{
 maskImage:
"linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
 WebkitMaskImage:
"linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
 }}
 >
 <div className="space-y-14 md:space-y-16">
 {rows.map((row, ri) => (
 <div key={ri} className="overflow-hidden">
 <div
 className="marquee-track flex w-max items-center gap-x-16 md:gap-x-24"
 data-direction={row.direction}
 style={{"--marquee-duration": `${row.duration}s` } as React.CSSProperties}
 >
 {/* Duplicated set, the -50% translate produces a seamless loop */}
 {[...row.items, ...row.items].map((src, i) => (
 <div
 key={i}
 className="relative h-10 w-[120px] shrink-0 md:h-12 md:w-[160px]"
 >
 <Image
 src={src}
 alt=""
 fill
 sizes="160px"
 className="object-contain opacity-45 grayscale"
 />
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
