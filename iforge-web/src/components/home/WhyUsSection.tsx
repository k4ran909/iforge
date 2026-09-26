"use client";

import React from "react";
import { valueProps } from "@/data/siteData";
import { Target, ShieldCheck, Lock, Zap } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-6 h-6 text-[#E61E32]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#E61E32]" />,
  Lock: <Lock className="w-6 h-6 text-[#E61E32]" />,
  Zap: <Zap className="w-6 h-6 text-[#E61E32]" />,
};

export default function WhyUsSection() {
  return (
    <section className="py-20 lg:py-28 bg-black text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-40 right-0 w-[500px] h-[500px] bg-[#E61E32]/15 blur-3xl rounded-full" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E61E32] text-xs font-bold uppercase tracking-wider">
            Why Enterprise Leaders Choose iForge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built On Rigor. Driven By Measurable Outcomes.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            We don&apos;t just advise from afar. Our certified systems architects and senior engineers embed directly within your roadmap to deliver resilient, SLA-backed technology.
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 sm:p-7 hover:bg-neutral-900 transition-all duration-300 hover:border-[#E61E32]/80 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {iconMap[prop.icon] || <Zap className="w-6 h-6 text-[#E61E32]" />}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#E61E32] transition-colors">
                {prop.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal Credibility Bar */}
        <div className="mt-14 pt-10 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#E61E32]">100%</div>
            <div className="text-xs text-neutral-400 mt-1">SLA Compliance Record</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#E61E32]">&lt; 15 min</div>
            <div className="text-xs text-neutral-400 mt-1">Critical Response Time</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#E61E32]">98%</div>
            <div className="text-xs text-neutral-400 mt-1">Client Retention Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#E61E32]">50+</div>
            <div className="text-xs text-neutral-400 mt-1">Certified Cloud Architects</div>
          </div>
        </div>
      </div>
    </section>
  );
}
