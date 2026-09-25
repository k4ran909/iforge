import React from "react";
import QuoteCalculator from "@/components/QuoteCalculator";

export const metadata = {
  title: "Request a Quote | iForge Technologies",
  description: "Calculate an estimated project scope and request an architectural consultation with iForge Technologies.",
};

export default function QuotePage() {
  return (
    <div id="content" className="site-content" style={{ backgroundColor: "#f8fafc", minHeight: "calc(100vh - 140px)" }}>
      <div className="ast-container" style={{ paddingTop: "50px", paddingBottom: "80px" }}>
        <QuoteCalculator />
      </div>
    </div>
  );
}
