import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/sites/rak/SmoothScroll";
import { Nav } from "@/components/sites/rak/Nav";
import { Footer } from "@/components/sites/rak/Footer";
import { Preloader } from "@/components/sites/rak/Preloader";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-display", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--f-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--section-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--section-mono" });

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
