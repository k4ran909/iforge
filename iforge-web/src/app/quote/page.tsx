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
    <div className="w-full bg-[#F8FAFC] min-h-[calc(100vh-140px)] py-12 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4FC] text-[#0A3C6E] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#1783C1]" />
            Transparent Scoping
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A3C6E] tracking-tight">
            Calculate Your Project Estimate
          </h1>
          <p className="text-sm sm:text-base text-[#666666]">
            Configure your technical discipline, team size, and timeline to receive a preliminary architectural overview.
          </p>
        </div>

        <QuoteCalculator />

        {/* Bottom Trust Row */}
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict NDA Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1783C1]" />
            <span>Free Architectural Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1783C1]" />
            <span>No Obligation Proposal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
