"use client";

import React from "react";
import Link from "next/link";
import { Users, ArrowRight, Sparkles, Terminal, Code, Cpu } from "lucide-react";

export default function CommunitySpotlight() {
  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#F4F7FB] via-white to-[#E8F4FC]/50 border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-sm">
          {/* Background decorative glow */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-[#1783C1]/10 rounded-full blur-3xl" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4FC] text-[#0A3C6E] text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-[#1783C1]" />
                Global Developer Ecosystem
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A3C6E] tracking-tight">
                Where 12,000+ Engineers & Builders Ship Together
              </h2>

              <p className="text-base text-[#666666] leading-relaxed">
                The <strong>iForge Builders Community</strong> is an invite-driven network of software architects, AI researchers, and DevOps engineers shipping production solutions, exchanging architecture teardowns, and collaborating on open-source toolchains.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                  <div className="text-2xl font-extrabold text-[#0A3C6E]">12,000+</div>
                  <div className="text-xs text-slate-500 font-medium">Active Builders</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                  <div className="text-2xl font-extrabold text-[#1783C1]">45+</div>
                  <div className="text-xs text-slate-500 font-medium">Open-Source Repos</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                  <div className="text-2xl font-extrabold text-[#0A3C6E]">Weekly</div>
                  <div className="text-xs text-slate-500 font-medium">Tech Sessions</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#0A3C6E] hover:bg-[#072648] shadow-md transition-all hover:scale-105"
                >
                  <span>Experience Orbit Community</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-sm font-semibold text-[#0A3C6E] hover:bg-slate-100 transition-colors"
                >
                  <span>Partner With Community</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="relative">
              <div className="relative mx-auto max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-slate-400 ml-2">builders-orbit.tsx</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    LIVE DISCORD & GITHUB
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-700 bg-[#F8FAFC] p-4 rounded-xl">
                  <p className="text-slate-400">// iForge Builders Orbit Network</p>
                  <p className="text-[#0A3C6E] font-semibold">$ npm run join:community</p>
                  <p className="text-[#1783C1]">✓ Connecting 12k+ engineers across 40 countries...</p>
                  <p className="text-emerald-600">✓ Syncing latest Cloud & GenAI architecture sprints</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#1783C1]" />
                    Discord • GitHub • Hackathons
                  </span>
                  <Link
                    href="/community"
                    className="font-bold text-[#1783C1] hover:underline"
                  >
                    View Interactive Orbit →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
