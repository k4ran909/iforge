import React from "react";
import WpPageContent from "@/components/WpPageContent";
import { pagesHtml } from "@/data/htmlContent";

export const metadata = {
  title: "Contact Us | iForge Technologies",
  description: "Contact Us - iForge delivers services and technologies at scale, accelerating digital operations and driving efficiencies.",
};

export default function ContactPage() {
  return (
    <WpPageContent 
      html={pagesHtml.contact} 
      pageClass="elementor elementor-548"
    />
  );
}
