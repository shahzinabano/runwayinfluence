"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { clients } from "@/lib/data";
import { ease, SplitText } from "./motion";

export default function Clients() {
  return (
    <section id="clients" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6">(05) — Trusted by</p>
            <h2 className="font-display text-6xl md:text-8xl">
              <SplitText text="Our" /> <SplitText text="clients" className="italic text-red" delay={0.1} />
            </h2>
          </div>
          <p className="max-w-sm text-bone/60">From supercars and five-star hospitality to fashion houses and premium spirits.</p>
        </div>

        <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((c, i) => (
            <motion.div
              key={c.logo}
              className="group relative flex aspect-square items-center justify-center overflow-hidden border-b border-r border-line p-3 md:p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.9, ease, delay: (i % 6) * 0.07 + Math.floor(i / 6) * 0.1 }}
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-red transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
              <Image
                src={c.logo}
                alt={c.name}
                width={200}
                height={200}
                className="relative h-full w-full object-contain opacity-70 brightness-0 invert transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
