import React from "react";
import type { Metadata } from "next";
import QuoteCalculator from "@/components/QuoteCalculator";
import { siteConfig } from "@/data/siteData";
import { Calculator, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Request a Quote & Project Estimator | ${siteConfig.name}`,
  description: "Calculate an estimated project scope and request an architectural consultation with iForge Technologies.",
};

export default function QuotePage() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-black min-h-[calc(100vh-140px)] py-12 lg:py-18 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-black dark:text-white text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#E61E32]" />
            Transparent Scoping
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black dark:text-white tracking-tight">
            Calculate Your Project Estimate
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Configure your technical discipline, team size, and timeline to receive a preliminary architectural overview.
          </p>
        </div>

        <QuoteCalculator />

        {/* Bottom Trust Row */}
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 dark:text-neutral-400 pt-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict NDA Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#E61E32]" />
            <span>Free Architectural Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#E61E32]" />
            <span>No Obligation Proposal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
