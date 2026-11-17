"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Custom cursor: dot + trailing ring that grows with a label over [data-cursor] elements. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const c = t.closest<HTMLElement>("[data-cursor]");
      setLabel(c?.dataset.cursor || null);
      setHover(!!t.closest("a, button, input, textarea"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 96 : hover ? 56 : 32;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgba(243,238,230,1)" : "rgba(243,238,230,0)",
          borderColor: label ? "rgba(243,238,230,0)" : "rgba(243,238,230,0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <span className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
        {label}
      </motion.div>
    </>
  );
}
