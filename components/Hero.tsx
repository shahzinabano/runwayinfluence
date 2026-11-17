"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { heroBrands } from "@/lib/data";
import { ease, Magnetic, SplitText } from "./motion";
import { PRELOAD_MS } from "./Preloader";

const D = PRELOAD_MS / 1000;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const stripScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const stripRadius = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-red/10 blur-[120px]" />

      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="container-x relative">
        <motion.p
          className="eyebrow mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: D + 0.1, duration: 1, ease }}
        >
          <span className="inline-block h-px w-10 bg-red" /> Influencer marketing agency
        </motion.p>

        <h1 className="font-display text-[13.5vw] leading-[0.88] md:text-[7.6vw] xl:text-[7.5rem]">
          <SplitText text="Behind the world’s" delay={D + 0.15} immediate />
          <span className="flex flex-wrap items-end gap-x-[0.25em]">
            <SplitText text="most iconic" delay={D + 0.3} immediate className="italic text-red" />
            <SplitText text="brands." delay={D + 0.4} immediate />
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-md text-base leading-relaxed text-bone/70 md:col-span-5 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D + 0.7, duration: 1, ease }}
          >
            We connect premium brands with top model influencers to deliver high-impact campaigns that drive engagement, amplify brand
            image and build cultural relevance.
          </motion.p>

          <motion.div
            className="flex items-center gap-4 md:col-span-4 md:col-start-9 md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D + 0.85, duration: 1, ease }}
          >
            <Magnetic>
              <a href="#contact" className="btn btn-red">
                Start a campaign <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <ScrollBadge />
          </motion.div>
        </div>
      </motion.div>

      {/* Brand accordion strip */}
      <motion.div
        style={{ scale: stripScale, borderRadius: stripRadius }}
        className="relative mt-12 flex h-[62vh] min-h-[420px] w-full origin-top overflow-hidden md:mt-14 md:h-[72vh]"
        onMouseLeave={() => setActive(null)}
      >
        {heroBrands.map((b, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={b.name}
              data-cursor="View"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group relative h-full overflow-hidden border-r border-ink last:border-r-0"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{
                clipPath: "inset(0% 0 0 0)",
                flexGrow: active === null ? 1 : isActive ? 2.6 : 0.7,
              }}
              transition={{
                clipPath: { duration: 1.3, ease, delay: D + 0.35 + i * 0.09 },
                flexGrow: { duration: 0.9, ease },
              }}
              style={{ flexBasis: 0 }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.35 }}
                animate={{ scale: isActive ? 1.04 : 1.12 }}
                transition={{ duration: active === null ? 2 : 1.2, ease, delay: active === null ? D + 0.4 : 0 }}
              >
                <Image
                  src={b.image}
                  alt={`${b.name} campaign`}
                  fill
                  priority
                  sizes="(max-width: 768px) 40vw, 30vw"
                  className={`object-cover transition-[filter] duration-700 ${
                    active === null || isActive ? "grayscale-0" : "grayscale brightness-50"
                  }`}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={240}
                  height={120}
                  className="h-auto max-h-16 w-[80%] max-w-[180px] object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,.6)] transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <span className="eyebrow absolute bottom-4 left-4 hidden !text-bone/70 md:block">0{i + 1}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function ScrollBadge() {
  const text = "SCROLL TO EXPLORE • SCROLL TO EXPLORE • ";
  return (
    <a href="#press" aria-label="Scroll to explore" className="relative hidden h-24 w-24 shrink-0 md:block">
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-bone/70 text-[9.5px] tracking-[0.2em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-red">↓</span>
    </a>
  );
}
