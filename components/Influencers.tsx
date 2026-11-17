"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { influencers, type Influencer } from "@/lib/data";
import { SplitText } from "./motion";

/** Pinned section: vertical scroll drives a horizontal track of model cards. */
export default function Influencers() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bgX = useTransform(smooth, [0, 1], ["5%", "-35%"]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);
  const [count, setCount] = useState(1);
  useMotionValueEvent(smooth, "change", (v) => {
    const n = Math.min(influencers.length, Math.max(1, Math.round(v * (influencers.length - 1)) + 1));
    if (n !== count) setCount(n);
  });

  return (
    <section id="influencers" ref={section} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div
          style={{ x: bgX }}
          className="font-display text-outline pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[32vw] italic leading-none"
          aria-hidden
        >
          Model Influencers
        </motion.div>

        <div className="container-x relative mb-8 flex items-end justify-between md:mb-12">
          <div>
            <p className="eyebrow mb-4">(02) — The roster</p>
            <h2 className="font-display text-5xl md:text-7xl">
              <SplitText text="Model" /> <SplitText text="influencers" className="italic text-red" delay={0.1} />
            </h2>
          </div>
          <div className="text-right">
            <p className="font-display text-4xl tabular-nums md:text-6xl">
              {String(count).padStart(2, "0")}
              <span className="text-bone/30">/{influencers.length}</span>
            </p>
          </div>
        </div>

        <motion.div ref={track} style={{ x }} className="relative flex w-max gap-4 pl-[clamp(1rem,4vw,3.5rem)] pr-[30vw] md:gap-6">
          {influencers.map((p, i) => (
            <Card key={p.name} p={p} i={i} />
          ))}
        </motion.div>

        <div className="container-x relative mt-10">
          <div className="h-px w-full bg-line">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-red" />
          </div>
          <div className="mt-3 flex justify-between">
            <span className="eyebrow">Scroll</span>
            <a href="#contact" className="eyebrow hover:!text-bone">
              Book talent →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ p, i }: { p: Influencer; i: number }) {
  return (
    <motion.article
      data-cursor="Book"
      className="group relative h-[52svh] w-[68vw] shrink-0 overflow-hidden rounded-2xl bg-ink-2 sm:w-[40vw] md:h-[56vh] md:w-[24vw] lg:w-[19vw]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: i % 2 ? 30 : 0 }}
      viewport={{ once: true, margin: "0px -5% 0px 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src={p.image}
        alt={p.name}
        fill
        sizes="(max-width: 640px) 68vw, (max-width: 1024px) 30vw, 20vw"
        className="object-cover object-top grayscale-[35%] transition-all duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" />
      <span className="eyebrow absolute left-4 top-4 rounded-full bg-ink/50 px-3 py-1 !text-bone/80 backdrop-blur">
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-3xl leading-none md:text-4xl">{p.name}</h3>
        <div className="mt-3 flex items-center gap-4 text-sm text-bone/80">
          <span className="flex items-center gap-1.5">
            <InstaIcon /> {p.instagram}
          </span>
          {p.tiktok && (
            <span className="flex items-center gap-1.5">
              <TikTokIcon /> {p.tiktok}
            </span>
          )}
          <span className="text-xs text-bone/50">followers</span>
        </div>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-red">
              Work together <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

const InstaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-label="Instagram">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="13" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok">
    <path d="M16.6 2h-3.3v13.4a3.1 3.1 0 1 1-2.2-3V9a6.4 6.4 0 1 0 5.5 6.4V8.6a7.9 7.9 0 0 0 4.6 1.5V6.8a4.6 4.6 0 0 1-4.6-4.8Z" />
  </svg>
);
