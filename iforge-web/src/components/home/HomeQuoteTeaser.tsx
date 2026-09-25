"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, Sparkles } from "lucide-react";
import { servicesData } from "@/data/siteData";

export default function HomeQuoteTeaser() {
  const [selectedService, setSelectedService] = useState("cloud-services");
  const [timeline, setTimeline] = useState("medium");

  const estimates: Record<string, { duration: string; team: string }> = {
    short: { duration: "2 - 4 Weeks", team: "2 - 3 Engineers" },
    medium: { duration: "1 - 3 Months", team: "3 - 5 Specialists" },
    large: { duration: "3 - 6+ Months", team: "Dedicated Pod (6+)" },
  };

  const currentEst = estimates[timeline];
  const serviceObj = servicesData.find((s) => s.slug === selectedService) || servicesData[0];

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Context */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4FC] text-[#0A3C6E] text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5 text-[#1783C1]" />
              Transparent Estimation
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A3C6E] tracking-tight">
              Estimate Your Next Engineering Initiative in 30 Seconds
            </h2>

            <p className="text-base text-[#666666] leading-relaxed">
              No black-box pricing or delayed responses. Select your practice area and desired delivery horizon to receive an immediate preliminary scope and architecture breakdown.
            </p>

            <div className="space-y-3 pt-2 text-sm text-[#333333]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1783C1]" />
                <span>NDA protected: Complete intellectual property security guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1783C1]" />
                <span>Zero obligation: Architectural scoping session included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1783C1]" />
                <span>Flexible engagement: Fixed-scope deliverables or dedicated pods</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Calculator Box */}
          <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
                  1. Select Enterprise Practice
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-[#333333] focus:outline-none focus:border-[#1783C1] shadow-2xs"
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.title} — {s.shortDesc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
                  2. Project Horizon / Urgency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "short", label: "Sprint (2-4 wks)" },
                    { id: "medium", label: "Quarter (1-3 mo)" },
                    { id: "large", label: "Enterprise (6+ mo)" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTimeline(opt.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        timeline === opt.id
                          ? "bg-[#0A3C6E] text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:border-[#1783C1]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Outcome Box */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Selected Practice:</span>
                  <span className="font-bold text-[#0A3C6E]">{serviceObj.title}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Estimated Delivery</div>
                    <div className="text-base font-extrabold text-[#1783C1] mt-0.5">
                      {currentEst.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Recommended Squad</div>
                    <div className="text-base font-extrabold text-[#0A3C6E] mt-0.5">
                      {currentEst.team}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/quote?service=${selectedService}&timeline=${timeline}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-md shadow-[#1783C1]/20 transition-all hover:scale-[1.01]"
              >
                <span>Launch Full Project Cost Wizard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
