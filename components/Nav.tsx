"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { contact, nav } from "@/lib/data";
import { ease, Magnetic } from "./motion";
import { PRELOAD_MS } from "./Preloader";

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 300 && !open);
    setScrolled(v > 40);
  });

  return (
    <>
      <motion.div className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-red" style={{ scaleX: progress }} />

      <motion.header
        className="fixed inset-x-0 top-0 z-[65]"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.8, ease, delay: hidden ? 0 : 0 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: PRELOAD_MS / 1000 + 0.4, duration: 0.8 }}
          className={`container-x flex items-center justify-between py-5 transition-[background,backdrop-filter] duration-500 ${
            scrolled && !open ? "bg-ink/60 backdrop-blur-xl" : ""
          }`}
        >
          <a href="#top" aria-label="Runway Influence home" className="relative z-10">
            <Image src="/images/brand/logo-white.png" alt="Runway Influence" width={239} height={55} priority className="h-8 w-auto md:h-9" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="group relative text-[0.78rem] font-medium uppercase tracking-[0.16em] text-bone/80 hover:text-bone">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-red transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Magnetic className="hidden md:block">
              <a href="#contact" className="btn btn-red !py-3">
                Let’s talk
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
            >
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block h-px w-5 bg-bone" />
              <motion.span animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="block h-px w-5 bg-bone" />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-hidden bg-ink"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.9, ease }}
          >
            <Image src="/images/backgrounds/menu.png" alt="" fill className="object-cover opacity-30" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
            <div className="container-x relative flex h-full flex-col justify-between pb-10 pt-28">
              <ul className="space-y-1">
                {nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden">
                    <motion.a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="font-display block text-[13vw] leading-[1.05] text-bone hover:italic hover:text-red sm:text-7xl"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.06 }}
                    >
                      {n.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-1 text-sm text-bone/70"
              >
                <a href={`mailto:${contact.email}`} className="block">{contact.email}</a>
                <a href={contact.phoneHref} className="block">{contact.phone}</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
