import Image from "next/image";
import { press } from "@/lib/data";

export default function Press() {
  const row = [...press, ...press];
  return (
    <section id="press" className="relative border-y border-line py-10 md:py-14">
      <div className="container-x mb-8 flex items-center justify-between">
        <p className="eyebrow">As featured in</p>
        <p className="eyebrow hidden md:block">Guaranteed high-tier press</p>
      </div>
      <div className="marquee-wrap relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee items-center" style={{ ["--marquee-duration" as string]: "32s" }}>
          {[...row, ...row].map((p, i) => (
            <div key={i} className="flex w-[44vw] shrink-0 items-center justify-center px-6 sm:w-[28vw] md:w-[18vw]">
              <Image
                src={p.logo}
                alt={i < press.length ? p.name : ""}
                width={200}
                height={80}
                className="h-9 w-auto object-contain opacity-60 brightness-0 invert transition-opacity duration-500 hover:opacity-100 md:h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
