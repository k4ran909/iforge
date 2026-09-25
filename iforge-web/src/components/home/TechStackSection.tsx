"use client";

import React, { useState } from "react";
import { techCapabilities } from "@/data/siteData";
import { CheckCircle2, Layers, Cpu, Cloud, ShieldCheck } from "lucide-react";

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabIcons = [
    <Cloud key="cloud" className="w-4 h-4" />,
    <Cpu key="ai" className="w-4 h-4" />,
    <ShieldCheck key="sec" className="w-4 h-4" />,
    <Layers key="web" className="w-4 h-4" />,
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4FC] text-[#0A3C6E] text-xs font-bold uppercase tracking-wider">
            Enterprise Architecture & Tooling
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A3C6E] tracking-tight">
            Battle-Tested Technology Stacks
          </h2>
          <p className="text-sm sm:text-base text-[#666666]">
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
                    ? "bg-[#0A3C6E] text-white shadow-md shadow-[#0A3C6E]/15"
                    : "bg-white text-[#333333] border border-slate-200 hover:border-[#1783C1]"
                }`}
              >
                {tabIcons[idx]}
                <span>{cat.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Capabilities Box */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-[#0A3C6E]">
                {techCapabilities[activeTab].category}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Production-grade frameworks & toolchains deployed by our certified specialists
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#E8F4FC] text-[#1783C1] text-xs font-bold">
              {techCapabilities[activeTab].items.length} Core Frameworks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {techCapabilities[activeTab].items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/70 hover:border-[#1783C1] transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-[#1783C1] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#333333]">
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
