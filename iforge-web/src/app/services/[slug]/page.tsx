import React from "react";
import { notFound } from "next/navigation";
import WpPageContent from "@/components/WpPageContent";
import { pagesHtml } from "@/data/htmlContent";
import { servicesData } from "@/data/siteData";

const postClassMap: Record<string, string> = {
  "data-ai": "elementor elementor-2609",
  "cloud-services": "elementor elementor-2611",
  "it-infrastructure": "elementor elementor-2607",
  "cybersecurity-services": "elementor elementor-2613",
  "web-development": "elementor elementor-2617",
  "digital-marketing": "elementor elementor-2615",
  "staffing-solutions": "elementor elementor-8733",
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | iForge Technologies`,
    description: service.shortDesc,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const html = pagesHtml[slug];
  if (!html) {
    notFound();
  }

  const pageClass = postClassMap[slug] || "elementor";

  return (
    <WpPageContent 
      html={html} 
      pageClass={pageClass}
    />
  );
}
