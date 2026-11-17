"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { contact, nav } from "@/lib/data";
import { Magnetic, Reveal, SplitText } from "./motion";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nCompany: ${f.get("company")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent("New campaign inquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[50vh] w-[60vw] rounded-full bg-red/10 blur-[140px]" />
      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6">(06) — Contact</p>
          <h2 className="font-display text-7xl md:text-[8.5rem]">
            <SplitText text="Let’s" /> <SplitText text="connect." className="italic text-red" delay={0.1} />
          </h2>
          <Reveal delay={0.2} className="mt-8 max-w-md text-lg text-bone/70">
            Tell us about your brand and the audience you want to win. We’ll match you with the talent to reach them.
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <Info label="Email">
              <a href={`mailto:${contact.email}`} className="hover:text-red">
                {contact.email}
              </a>
            </Info>
            <Info label="Phone">
              <a href={contact.phoneHref} className="hover:text-red">
                {contact.phone}
              </a>
            </Info>
            <Info label="Studio">
              {contact.address[0]}
              <br />
              {contact.address[1]}
            </Info>
            <Info label="Cities">LA · NY · Miami</Info>
          </div>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <form onSubmit={onSubmit} className="rounded-[2rem] border border-line bg-ink-2/80 p-6 backdrop-blur md:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field name="name" label="Your name" required />
              <Field name="email" label="Email address" type="email" required />
            </div>
            <div className="mt-6">
              <Field name="company" label="Brand / company" />
            </div>
            <div className="mt-6">
              <Field name="message" label="Tell us about the campaign" textarea required />
            </div>
            <div className="mt-8 flex items-center justify-between gap-4">
              <p className="text-xs text-bone/50">{sent ? "Opening your email app…" : "We reply within one business day."}</p>
              <Magnetic>
                <button type="submit" className="btn btn-red">
                  Send <span aria-hidden>→</span>
                </button>
              </Magnetic>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal y={20}>
      <p className="eyebrow mb-2">{label}</p>
      <p className="text-lg">{children}</p>
    </Reveal>
  );
}

function Field({ name, label, type = "text", textarea, required }: { name: string; label: string; type?: string; textarea?: boolean; required?: boolean }) {
  const cls =
    "peer w-full border-b border-line bg-transparent pb-3 pt-6 text-lg text-bone placeholder-transparent outline-none transition-colors focus:border-red";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={4} placeholder={label} required={required} className={`${cls} resize-none`} />
      ) : (
        <input name={name} type={type} placeholder={label} required={required} className={cls} />
      )}
      <span className="pointer-events-none absolute left-0 top-0 text-xs uppercase tracking-[0.2em] text-bone/50 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-red">
        {label}
      </span>
    </label>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line pt-20">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src="/images/brand/logo-white.png" alt="Runway Influence" width={239} height={55} className="h-10 w-auto" />
          <p className="font-display mt-6 max-w-sm text-3xl">
            Powering iconic brands <span className="italic text-bone/60">into the future.</span>
          </p>
        </div>
        <nav className="md:col-span-3 md:col-start-7">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-bone/70 transition-colors hover:text-bone">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-4 md:col-span-3">
          <p className="eyebrow mb-4">Reach us</p>
          <a href={`mailto:${contact.email}`} className="block text-bone/70 hover:text-bone">
            {contact.email}
          </a>
          <a href={contact.phoneHref} className="block text-bone/70 hover:text-bone">
            {contact.phone}
          </a>
          <p className="text-bone/70">
            {contact.address[0]}, {contact.address[1]}
          </p>
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="font-display mt-20 select-none whitespace-nowrap text-center pb-[2vw] text-[15.5vw] leading-[0.8] tracking-tight" aria-hidden>
        Runway <span className="italic text-red">Influence</span>
      </motion.div>

      <div className="container-x flex flex-col items-center justify-between gap-4 border-t border-line py-6 text-xs text-bone/50 md:flex-row">
        <p>© {new Date().getFullYear()} Runway Influence. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-bone">Terms of Use</a>
          <a href="#" className="hover:text-bone">Privacy Policy</a>
          <a href="#top" className="hover:text-bone">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
