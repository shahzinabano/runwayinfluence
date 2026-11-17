"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Magnetic, Reveal } from "./motion";

const cities = ["Los Angeles", "New York", "Miami", "Las Vegas", "Coachella", "& Beyond"];

/** Image starts as an inset card and expands to full-bleed as you scroll. */
export default function Agency() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const inset = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  const { scrollYProgress: p2 } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(p2, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(p2, [0, 1], ["-30%", "0%"]);

  return (
    <section ref={ref} className="relative">
      <div className="relative h-[110svh] overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.div style={{ scale }} className="absolute inset-0">
            <Image src="/images/backgrounds/coachella-crew.png" alt="Runway Influence models at Coachella" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink" />
        </motion.div>

        <div className="container-x relative flex h-full flex-col justify-end pb-20 md:pb-28">
          <Reveal>
            <p className="eyebrow mb-6 !text-bone/80">Leading influencer agency</p>
          </Reveal>
          <h2 className="font-display max-w-5xl text-5xl md:text-8xl">
            <Reveal>Elevate your brand across</Reveal>
            <Reveal delay={0.1} className="italic text-red">
              Los Angeles, New York, Miami & beyond.
            </Reveal>
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <Reveal delay={0.2} className="text-bone/80 md:col-span-6 md:text-lg">
              We handpick the most influential model talent to elevate premier destinations, luxury venues, and high-end brands. Our mission
              is clear: amplify your brand’s voice through captivating, memorable content. With our influencers, we don’t just connect with
              your audience — we engage them, spark desire, and ignite a lasting impact that propels your brand far beyond the campaign.
            </Reveal>
            <Reveal delay={0.3} className="md:col-span-4 md:col-start-9 md:justify-self-end">
              <Magnetic>
                <a href="#contact" className="btn btn-red">
                  Get started
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="space-y-2 overflow-hidden py-16 md:py-24">
        <motion.div style={{ x: x1 }} className="font-display flex gap-10 whitespace-nowrap text-[14vw] leading-none md:text-[9vw]">
          {[...cities, ...cities].map((c, i) => (
            <span key={i} className={i % 2 ? "text-outline italic" : ""}>
              {c} <span className="text-red">✦</span>
            </span>
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="font-display flex gap-10 whitespace-nowrap text-[14vw] leading-none md:text-[9vw]">
          {[...cities, ...cities].reverse().map((c, i) => (
            <span key={i} className={i % 2 ? "" : "text-outline italic"}>
              {c} <span className="text-red">✦</span>
            </span>
          ))}
        </motion.div>
        <p className="container-x pt-10 text-center text-bone/60">Runway Influence: Powering iconic brands into the future.</p>
      </div>
    </section>
  );
}
