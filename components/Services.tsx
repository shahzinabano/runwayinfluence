"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { services } from "@/lib/data";
import { ease, Magnetic, Reveal, SplitText } from "./motion";

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const r1 = useTransform(scrollYProgress, [0.15, 0.6], [0, -70]);
  const r2 = useTransform(scrollYProgress, [0.15, 0.6], [0, 0]);
  const r3 = useTransform(scrollYProgress, [0.15, 0.6], [0, 70]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 150, damping: 20 });
  const py = useSpring(my, { stiffness: 150, damping: 20 });

  return (
    <section id="services" ref={ref} className="relative bg-navy py-28 md:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6">(01) — Services</p>
            <h2 className="font-display text-6xl md:text-7xl xl:text-8xl">
              <SplitText text={"Tailored services\nfor unmatched"} />
              <SplitText text="brand success." className="italic text-red" delay={0.2} />
            </h2>
            <Reveal delay={0.3} className="mt-8 max-w-sm text-bone/70">
              At Runway Influence, we craft strategic, results-driven solutions uniquely designed for each client’s needs.
            </Reveal>

            <motion.div style={{ rotate: spin }} className="relative mt-20 hidden h-56 w-[22rem] lg:block">
              {[r1, r2, r3].map((r, i) => (
                <motion.div
                  key={i}
                  style={{ x: r, translateX: "-50%" }}
                  className="absolute left-1/2 top-0 h-56 w-56 rounded-full border border-bone/30"
                />
              ))}
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red" />
            </motion.div>
          </div>
        </div>

        <div
          className="relative lg:col-span-7"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          {/* floating hover preview (desktop) */}
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key="preview"
                className="pointer-events-none absolute left-0 top-0 z-20 hidden h-72 w-56 overflow-hidden rounded-xl lg:block"
                style={{ x: px, y: py, translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
                transition={{ duration: 0.5, ease }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={hovered}
                    className="absolute inset-0"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <Image src={services[hovered].image} alt="" fill sizes="224px" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="border-t border-line">
            {services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="border-b border-line">
                <button
                  className="group flex w-full items-center gap-6 py-8 text-left md:py-10"
                  onMouseEnter={() => setHovered(i)}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="eyebrow w-8 shrink-0">0{i + 1}</span>
                  <span className="relative flex-1 overflow-hidden">
                    <span className="block text-2xl font-medium tracking-tight transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full md:text-4xl">
                      {s.title}
                    </span>
                    <span className="font-display absolute inset-0 translate-y-full text-[1.65rem] italic text-red transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 md:text-[2.75rem]">
                      {s.title}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-xl transition-colors group-hover:border-red group-hover:bg-red"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-6 pb-10 pl-14">
                        <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-md lg:hidden">
                          <Image src={s.image} alt="" fill sizes="80px" className="object-cover" />
                        </div>
                        <p className="max-w-lg text-bone/70 md:text-lg">{s.body}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-3xl md:text-4xl">
              Runway Influence: <span className="italic text-bone/60">defining success in the digital era.</span>
            </p>
            <Magnetic>
              <a href="#contact" className="btn btn-red shrink-0">
                Get started
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
