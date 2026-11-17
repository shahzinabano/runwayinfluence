"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ease } from "./motion";

export const PRELOAD_MS = 2200;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.dataset.loading = "1";
    (window as unknown as { __lenis?: { stop(): void } }).__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (PRELOAD_MS - 400));
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const to = setTimeout(() => {
      setDone(true);
      delete document.documentElement.dataset.loading;
      document.documentElement.style.overflow = "";
      (window as unknown as { __lenis?: { start(): void } }).__lenis?.start();
    }, PRELOAD_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(to);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease }}
          >
            <Image src="/images/brand/logo-white.png" alt="Runway Influence" width={239} height={55} priority className="h-10 w-auto md:h-14" />
          </motion.div>
          <div className="mt-10 h-px w-48 overflow-hidden bg-line">
            <div className="h-full bg-red transition-[width] duration-100" style={{ width: `${count}%` }} />
          </div>
          <div className="absolute bottom-8 right-8 font-display text-7xl tabular-nums text-bone/90 md:text-9xl">
            {count}
            <span className="text-red">%</span>
          </div>
          <div className="eyebrow absolute bottom-10 left-8">Los Angeles · New York · Miami</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
