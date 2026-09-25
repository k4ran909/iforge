import React from "react";
import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import ServicesBento from "@/components/home/ServicesBento";
import WhyUsSection from "@/components/home/WhyUsSection";
import TechStackSection from "@/components/home/TechStackSection";
import CommunitySpotlight from "@/components/home/CommunitySpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HomeQuoteTeaser from "@/components/home/HomeQuoteTeaser";
import CtaBanner from "@/components/home/CtaBanner";
import { siteConfig } from "@/data/siteData";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Enterprise IT Services, Cloud Architecture & AI Consulting`,
  description: "Accelerating enterprise success with certified cloud architecture (AWS & GCP), proactive cybersecurity, generative AI advisory, and bespoke web engineering.",
};

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <HomeHero />
      <PartnerMarquee />
      <ServicesBento />
      <WhyUsSection />
      <TechStackSection />
      <CommunitySpotlight />
      <TestimonialsSection />
      <HomeQuoteTeaser />
      <CtaBanner />
    </div>
  );
}
