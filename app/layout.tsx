import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Runway Influence — Influencer Marketing Agency",
  description:
    "We connect premium brands with top model influencers to deliver high-impact campaigns that drive engagement, amplify brand image and build cultural relevance.",
  icons: { icon: "/images/brand/logo-white.png" },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
