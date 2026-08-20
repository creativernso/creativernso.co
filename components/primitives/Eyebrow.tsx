export default function Eyebrow({
 index,
 label,
 className,
}: {
 index?: string;
 label: string;
 className?: string;
}) {
 return (
 <div className={`meta flex items-center gap-3 text-gold ${className ??""}`}>
 {index && <span className="opacity-70">{index}</span>}
 <span className="h-px w-8 bg-gold/60"/>
 <span>{label}</span>
 </div>
 );
}
