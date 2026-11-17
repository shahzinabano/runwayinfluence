"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { expertise } from "@/lib/data";
import { Reveal, ScrollWords, SplitText } from "./motion";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-28 md:py-44">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6">(03) — About</p>
          <h2 className="font-display text-6xl md:text-7xl xl:text-8xl">
            <SplitText text={"Experience\nthe future of"} />
            <SplitText text="brand influence." className="italic text-red" delay={0.2} />
          </h2>

          <motion.div style={{ rotate }} className="relative mt-14 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem]">
            <motion.div style={{ y: imgY }} className="absolute -inset-[15%]">
              <Image src="/images/backgrounds/trust-portrait.png" alt="Runway Influence talent at Coachella" fill sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-7 lg:pt-28">
          <p className="eyebrow mb-6 !text-bone">Runway Influence is not just another digital marketing agency;</p>
          <ScrollWords
            text="we’re your strategic partner in crafting unforgettable social media campaigns and brand activations."
            className="font-display text-4xl leading-[1.08] md:text-6xl"
          />

          <div className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
            <p className="eyebrow">Our expertise spans across</p>
            <ul className="md:col-span-2">
              {expertise.map((e, i) => (
                <Reveal as="li" key={e} delay={i * 0.06} y={20} className="group flex items-baseline justify-between border-b border-line py-4">
                  <span className="text-lg text-bone/80 transition-all duration-500 group-hover:translate-x-3 group-hover:text-bone md:text-xl">
                    {e}
                  </span>
                  <span className="eyebrow transition-colors group-hover:!text-red">0{i + 1}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
