# Runway Influence — Next.js redesign

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Stack: Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion · Lenis smooth scroll.

- `app/` — layout, global styles (design tokens live in `@theme` in `globals.css`)
- `components/` — one file per section, plus `motion.tsx` (Reveal, SplitText, ScrollWords, Magnetic, Parallax)
- `lib/data.ts` — all copy, influencers, projects, clients, contact details (edit content here)
- `public/images/` — PNG assets taken from runwayinfluence.com (logos that were SVG stay SVG)

The contact form opens the visitor's email app addressed to RWI@RunwayInfluence.com; wire it to an API route or form service to collect submissions server-side.
