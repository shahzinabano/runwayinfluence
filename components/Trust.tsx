"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { trust } from "@/lib/data";
import { Reveal } from "./motion";

export default function Trust() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 0.5], ["-20%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["20%", "0%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-bone py-28 text-ink md:py-40">
      <div className="container-x">
        <h2 className="font-display text-[17vw] leading-[0.85] md:text-[11vw]">
          <motion.span style={{ x: leftX }} className="block">
            People trust
          </motion.span>
          <motion.span style={{ x: rightX }} className="block text-right italic">
            people. <span className="text-red">Not ads.</span>
          </motion.span>
        </h2>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:col-span-5">
            <motion.div style={{ y: imgY }} className="absolute -inset-[10%]">
              <Image src="/images/backgrounds/coachella-friends.png" alt="Influencers creating content together" fill sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
            </motion.div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-ink/70 p-5 text-bone backdrop-blur-md">
              <p className="font-display text-3xl">Real voices. Real reach.</p>
              <p className="mt-1 text-sm text-bone/70">Campaigns that feel like recommendations, not interruptions.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            {trust.map((t, i) => (
              <Reveal key={t.k} delay={i * 0.1} className="group border-t border-ink/15 py-8 last:border-b">
                <div className="flex gap-6">
                  <span className="font-display text-5xl italic text-red">{t.k}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{t.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/70">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
