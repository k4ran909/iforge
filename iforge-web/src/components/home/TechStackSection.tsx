"use client";

import React, { useState } from "react";
import { techCapabilities } from "@/data/siteData";
import { CheckCircle2, Layers, Cpu, Cloud, ShieldCheck } from "lucide-react";

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabIcons = [
    <Cloud key="cloud" className="w-4 h-4 text-[#E61E32]" />,
    <Cpu key="ai" className="w-4 h-4 text-[#E61E32]" />,
    <ShieldCheck key="sec" className="w-4 h-4 text-[#E61E32]" />,
    <Layers key="web" className="w-4 h-4 text-[#E61E32]" />,
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FBFBFB] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE8EA] text-[#E61E32] text-xs font-bold uppercase tracking-wider">
            Enterprise Architecture & Tooling
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Battle-Tested Technology Stacks
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            We build and maintain enterprise software with industry-standard, vendor-independent frameworks optimized for high concurrency, security, and low latency.
          </p>

          {/* Tab Navigation */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {techCapabilities.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-black text-white shadow-md shadow-black/15"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:border-[#E61E32]"
                }`}
              >
                {tabIcons[idx]}
                <span>{cat.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Capabilities Box */}
        <div className="max-w-4xl mx-auto bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-xl font-bold text-black">
                {techCapabilities[activeTab].category}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Production-grade frameworks & toolchains deployed by our certified specialists
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#FDE8EA] text-[#E61E32] text-xs font-bold">
              {techCapabilities[activeTab].items.length} Core Frameworks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {techCapabilities[activeTab].items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FBFBFB] border border-neutral-200/80 hover:border-[#E61E32] transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E61E32] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#262626]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
