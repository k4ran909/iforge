"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, ChevronRight, Users } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#F4F7FB] via-white to-white">
      {/* Ambient background glow accents */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#1783C1]/15 to-[#0A3C6E]/10 blur-3xl rounded-full" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-40 right-[-100px] w-[350px] h-[350px] bg-[#1783C1]/10 blur-3xl rounded-full" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Certification Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F4FC] border border-[#1783C1]/30 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[#1783C1] animate-pulse" />
            <span className="text-xs font-semibold text-[#0A3C6E]">
              Certified Enterprise Partner: AWS • Google Cloud • VMware
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A3C6E] tracking-tight leading-[1.12]">
            Accelerating Enterprise Success With{" "}
            <span className="text-[#1783C1] inline-block relative">
              Intelligent IT Services
              <svg 
                className="absolute -bottom-2 left-0 w-full h-2.5 text-[#1783C1]/30" 
                viewBox="0 0 100 12" 
                preserveAspectRatio="none" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 6C20 2 80 2 100 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg lg:text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed font-normal">
            From multi-cloud architecture and zero-trust cybersecurity to generative AI advisory, bespoke web engineering, and specialized technical staffing — we engineer resilient digital systems that scale.
          </p>

          {/* CTA Button Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-lg shadow-[#1783C1]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Calculate Project Scope</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-[#0A3C6E] bg-white hover:bg-slate-50 border border-slate-200 transition-all hover:border-[#1783C1]"
            >
              <span>Explore 7 Core Services</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/community"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-semibold text-[#333333] hover:text-[#1783C1] hover:bg-[#E8F4FC]/60 transition-all"
            >
              <Users className="w-4 h-4 text-[#1783C1]" />
              <span>Builders Community (12k+)</span>
            </Link>
          </div>

          {/* Trust Guarantees Checklist */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1783C1]" />
              <span>ISO 27001 & SOC 2 Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1783C1]" />
              <span>Zero-Downtime Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1783C1]" />
              <span>Dedicated Technical Account Managers</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-14 lg:mt-18 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {[
            { value: "99.99%", label: "Uptime SLA Guarantee", desc: "Enterprise cloud redundancy" },
            { value: "250+", label: "Solutions Delivered", desc: "Across BFSI, SaaS & Retail" },
            { value: "40%", label: "Average Cloud Savings", desc: "Via FinOps optimization" },
            { value: "24/7/365", label: "NOC & SOC Operations", desc: "Continuous live surveillance" },
          ].map((stat, i) => (
            <div 
              key={i}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#1783C1]/50 transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0A3C6E] tracking-tight group-hover:text-[#1783C1] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#333333] mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#666666] mt-0.5">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
