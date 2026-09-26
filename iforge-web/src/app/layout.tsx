import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/siteData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iforge.in"),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.subheadline,
  keywords: [
    "iForge Technologies",
    "IT Services",
    "Cloud Architecture",
    "AWS Partner",
    "Google Cloud Partner",
    "Cybersecurity Services",
    "VAPT",
    "AI & ML Consulting",
    "Application Development",
    "Enterprise Dashboards",
    "Custom Web Applications",
    "Cloud Migration"
  ],
  authors: [{ name: "iForge Technologies" }],
  creator: "iForge Technologies",
  icons: {
    icon: "/images/cropped-iforge-logo2-32x32.png",
    apple: "/images/cropped-iforge-logo2-180x180.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iforge.in",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.subheadline,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/iforge-logo1.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body 
        suppressHydrationWarning 
        className="min-h-screen bg-white text-[#262626] font-sans antialiased flex flex-col justify-between selection:bg-[#E61E32] selection:text-white"
      >
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
