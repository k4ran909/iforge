import React from "react";
import WpPageContent from "@/components/WpPageContent";
import { pagesHtml } from "@/data/htmlContent";

export const metadata = {
  title: "iForge Technologies | IT Services & Consulting",
  description: "Accelerating Success With IT Services - Transform your business with cutting-edge technology and expert consultancy services tailored to your needs.",
};

export default function HomePage() {
  return (
    <WpPageContent 
      html={pagesHtml.home} 
      pageClass="elementor elementor-14868"
    />
  );
}
