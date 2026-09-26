"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
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
    <section className="py-20 lg:py-24 bg-white dark:bg-black border-t border-neutral-100 dark:border-neutral-800 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Context */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-[#E61E32] text-xs font-bold uppercase tracking-wider">
              Transparent Estimation
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
              Estimate Your Next Engineering Initiative in 30 Seconds
            </h2>

            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              No black-box pricing or delayed responses. Select your practice area and desired delivery horizon to receive an immediate preliminary scope and architecture breakdown.
            </p>

            <div className="space-y-3 pt-2 text-sm text-[#262626] dark:text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E61E32]" />
                <span>NDA protected: Complete intellectual property security guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E61E32]" />
                <span>Zero obligation: Architectural scoping session included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E61E32]" />
                <span>Flexible engagement: Fixed-scope deliverables or dedicated pods</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Calculator Box */}
          <div className="lg:col-span-6 bg-[#FBFBFB] dark:bg-[#0D0D0D] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-250">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-2">
                  1. Select Enterprise Practice
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-medium text-[#262626] dark:text-white focus:outline-none focus:border-[#E61E32] shadow-2xs"
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.slug} className="bg-white dark:bg-[#141414] text-black dark:text-white">
                      {s.title} — {s.shortDesc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-2">
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
                          ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                          : "bg-white dark:bg-[#141414] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-[#E61E32]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Outcome Box */}
              <div className="bg-white dark:bg-[#141414] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="font-semibold text-neutral-500 dark:text-neutral-400">Selected Practice:</span>
                  <span className="font-bold text-black dark:text-white">{serviceObj.title}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">Estimated Delivery</div>
                    <div className="text-base font-extrabold text-[#E61E32] mt-0.5">
                      {currentEst.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">Recommended Squad</div>
                    <div className="text-base font-extrabold text-black dark:text-white mt-0.5">
                      {currentEst.team}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/quote?service=${selectedService}&timeline=${timeline}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-[#E61E32] hover:bg-[#C81426] shadow-md shadow-[#E61E32]/25 transition-all hover:scale-[1.01] cursor-pointer"
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
