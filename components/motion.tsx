"use client";

import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + rise when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "li" | "span";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Splits text into words that slide up from behind a mask, staggered. */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const show = immediate || inView;
  const lines = text.split("\n");
  let i = 0;
  return (
    <span ref={ref} className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word, wi) => {
            const idx = i++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "110%", rotate: 4 }}
                  animate={show ? { y: "0%", rotate: 0 } : undefined}
                  transition={{ duration: 1.2, ease: EASE, delay: delay + idx * stagger }}
                >
                  {word}
                  {wi < line.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/** Word-by-word opacity tied to scroll progress (manifesto style). */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

/** Element drifts toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={className ?? "inline-block"}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Parallax wrapper: children move on Y as the section scrolls past. */
export function Parallax({ children, speed = 0.2, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

export const ease = EASE;
