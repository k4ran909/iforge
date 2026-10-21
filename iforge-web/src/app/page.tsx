import React from "react";
import type { Metadata } from "next";
import HeroMinimal from "@/components/home/HeroMinimal";
import ServicesMinimal from "@/components/home/ServicesMinimal";
import ApproachMinimal from "@/components/home/ApproachMinimal";
import TechStackMinimal from "@/components/home/TechStackMinimal";
import HomeQuoteTeaser from "@/components/home/HomeQuoteTeaser";
import { siteConfig } from "@/data/siteData";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Enterprise IT Services, Cloud Architecture & AI Consulting`,
  description:
    "Accelerating enterprise success with certified cloud architecture (AWS & GCP), proactive cybersecurity, generative AI advisory, and bespoke web engineering.",
};

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <HeroMinimal />
      <ServicesMinimal />
      <ApproachMinimal />
      <TechStackMinimal />
      <HomeQuoteTeaser />
    </div>
  );
}
