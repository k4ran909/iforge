import React from "react";
import WpPageContent from "@/components/WpPageContent";
import { pagesHtml } from "@/data/htmlContent";

export const metadata = {
  title: "About Us | iForge Technologies",
  description: "About Us - Deliver personalized experiences with an agile infrastructure that ensures business continuity. IT Consultancy That Turns Technology Into Business Value.",
};

export default function AboutPage() {
  return (
    <WpPageContent 
      html={pagesHtml.about} 
      pageClass="elementor elementor-2455"
    />
  );
}
