"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { projects, type Project } from "@/lib/data";
import { SplitText } from "./motion";

export default function Projects() {
  const banner = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bp } = useScroll({ target: banner, offset: ["start end", "end start"] });
  const bannerY = useTransform(bp, [0, 1], ["-12%", "12%"]);
  const titleScale = useTransform(bp, [0.1, 0.5], [0.7, 1]);

  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative">
      <div ref={banner} className="relative flex h-[80svh] items-center justify-center overflow-hidden">
        <motion.div style={{ y: bannerY }} className="absolute -inset-[12%]">
          <Image src="/images/backgrounds/projects-banner.png" alt="Runway Influence campaign highlights" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-ink/50" />
        <motion.div style={{ scale: titleScale }} className="relative text-center">
          <p className="eyebrow mb-4 !text-bone/80">(04) — Selected work</p>
          <h2 className="font-display text-[22vw] leading-none md:text-[15vw]">
            <SplitText text="Projects" className="italic" />
          </h2>
        </motion.div>
      </div>

      <div ref={stack} className="relative">
        {projects.map((p, i) => {
          const start = i / projects.length;
          return <ProjectCard key={p.name} p={p} i={i} progress={scrollYProgress} range={[start, 1]} targetScale={1 - (projects.length - i) * 0.03} />;
        })}
      </div>
    </section>
  );
}

function ProjectCard({
  p,
  i,
  progress,
  range,
  targetScale,
}: {
  p: Project;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const dim = useTransform(progress, range, [0, 0.55]);

  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center justify-center px-3 md:px-8">
      <motion.article
        style={{ scale, top: `calc(6vh + ${i * 14}px)` }}
        className="relative flex h-[84svh] w-full max-w-[1400px] origin-top flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 md:flex-row"
      >
        <div className="relative z-10 flex flex-col justify-between gap-6 p-6 md:w-[34%] md:p-10">
          <div>
            <div className="flex items-center justify-between">
              <span className="eyebrow">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <span className="eyebrow">{p.tag}</span>
            </div>
            <h3 className="font-display mt-6 text-4xl md:mt-10 md:text-6xl">{p.name}</h3>
            <Image
              src={p.logo}
              alt={`${p.name} logo`}
              width={260}
              height={p.squareLogo ? 260 : 90}
              className={`mt-6 w-auto max-w-[70%] object-contain md:mt-10 ${p.squareLogo ? "-ml-4 h-24 md:h-32" : "h-10 md:h-14"} ${p.invertLogo ? "brightness-0 invert" : ""}`}
            />
          </div>
          <div className="hidden items-center justify-between gap-6 md:flex">
            <span className="eyebrow">Start a project like this</span>
            <a href="#contact" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-red hover:bg-red" aria-label={`Start a project like ${p.name}`}>
              ↗
            </a>
          </div>
        </div>

        <div data-cursor="Drag" className="relative min-h-0 flex-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] md:overflow-hidden">
          <motion.div style={{ scale: imgScale }} className="flex h-full origin-left gap-3 p-3 md:grid md:grid-cols-6 md:grid-rows-2 md:p-4">
            {p.images.map((src, j) => (
              <div
                key={src}
                className={`group relative h-full w-[62vw] shrink-0 overflow-hidden rounded-xl sm:w-[40vw] md:w-auto md:col-span-2 ${j === 0 ? "md:row-span-2" : ""}`}
              >
                <Image
                  src={src}
                  alt={`${p.name} — image ${j + 1}`}
                  fill
                  sizes="(max-width: 768px) 62vw, 22vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.article>
    </div>
  );
}
