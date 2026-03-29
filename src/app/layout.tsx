import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gokservis.space"
  ),
  title: "GökServis — Yörüngedeki Güvenceniz",
  description:
    "Türkiye'nin ilk yörünge içi uzay servis şirketi. KUTAY orbital hub ve GEZGİN servis aracı ile uydularınızı tazeliyor, güncelliyor ve geleceğe taşıyoruz.",
  keywords: "uzay servisi, uydu yakıt ikmali, orbital hub, Türkiye uzay, GökServis, KUTAY, GEZGİN, SPaaS",
  authors: [{ name: "GökServis Teknoloji" }],
  openGraph: {
    title: "GökServis — Yörüngedeki Güvenceniz",
    description: "Uzayda Sürdürülebilirlik, Yörüngede Verimlilik.",
    type: "website",
    locale: "tr_TR",
    siteName: "GökServis",
  },
  twitter: {
    card: "summary_large_image",
    title: "GökServis — Yörüngedeki Güvenceniz",
    description: "Uzayda Sürdürülebilirlik, Yörüngede Verimlilik.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0B] text-[#E2E8F0] overflow-x-hidden">
        <StarField />
        <div className="grid-overlay fixed inset-0 z-0 pointer-events-none" />
        <Navbar />
        <main id="main-content" className="flex-1 relative z-10">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
