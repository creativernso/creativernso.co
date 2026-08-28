import Image from "next/image";

const marks = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
  "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
  "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
  "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
  "61", "62", "63", "64", "65", "67", "68", "70", "71", "72",
  "74", "75", "76", "77", "79", "80", "81", "82", "83", "84",
  "85", "86", "87", "88", "90", "91", "92", "93", "94", "95",
  "96", "97", "98", "99", "100", "101", "102", "103", "104", "105",
  "106", "107", "108", "109", "111",
];

export default function MarkLibrary() {
  return (
    <div className="mt-24 md:mt-32">
      <h2 className="font-display text-bone text-[clamp(36px,5vw,96px)] font-bold leading-[1.1] tracking-[-0.04em]">
        The Mark Library
      </h2>
      <p className="mt-3 text-[15px] text-muted-2 md:text-[18px]">
        Every shape carries a decision. Every curve, every angle, every
        weight chosen with intention.
      </p>

      <div
        className="mt-8 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-10"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
      >
        <div className="grid grid-cols-2 border-l border-t border-bone/10 sm:grid-cols-3 md:grid-cols-4">
          {marks.map((n) => (
            <div
              key={n}
              className="relative flex aspect-square items-center justify-center border-b border-r border-bone/10 p-4 md:p-10"
            >
              <div className="relative h-full w-full">
                <Image
                  src={`/marks/MARKS-${n}.png`}
                  alt={`Mark ${n}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
