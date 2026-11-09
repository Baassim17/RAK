import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/sites/rak/SmoothScroll";
import { Nav } from "@/components/sites/rak/Nav";
import { Footer } from "@/components/sites/rak/Footer";
import { Preloader } from "@/components/sites/rak/Preloader";
import "./globals.css";

const display = localFont({
  src: "./fonts/archivo.woff2",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--f-display",
});
const serif = localFont({
  src: "./fonts/instrumentserif.woff2",
  weight: "400",
  style: "italic",
  variable: "--f-serif",
});
const mono = localFont({
  src: "./fonts/jetbrainsmono.woff2",
  weight: "100 800",
  adjustFontFallback: false,
  variable: "--f-mono",
});
const geist = localFont({ src: "./fonts/geist.woff2", weight: "100 900", variable: "--section-sans" });
const geistMono = localFont({
  src: "./fonts/geistmono.woff2",
  weight: "100 900",
  adjustFontFallback: false,
  variable: "--section-mono",
});

export const metadata: Metadata = {
  title: { default: "RAK Security Services LLC — Security Guarding & Patrol, Ras Al Khaimah", template: "%s — RAK Security Services" },
  description:
    "RAK Security Services LLC — commercial security, uniformed guarding, event security, cash-in-transit, executive protection and CCTV in Ras Al Khaimah, UAE.",
};

export const viewport: Viewport = { themeColor: "#020a1f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll />
        <div className="grain" aria-hidden />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
