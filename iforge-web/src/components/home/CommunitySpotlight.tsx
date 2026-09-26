"use client";

import React from "react";
import Link from "next/link";
import { Users, ArrowRight, Terminal } from "lucide-react";

export default function CommunitySpotlight() {
  return (
    <section className="py-20 lg:py-24 bg-white dark:bg-black relative overflow-hidden transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FBFBFB] via-white to-[#FDE8EA]/20 dark:from-[#0D0D0D] dark:via-[#111111] dark:to-[#E61E32]/10 border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-sm transition-colors duration-250">
          {/* Background decorative crimson glow */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-[#E61E32]/10 dark:bg-[#E61E32]/15 rounded-full blur-3xl" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-[#E61E32] text-xs font-bold uppercase tracking-wider">
                Global Developer Ecosystem
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black dark:text-white tracking-tight">
                Where 12,000+ Engineers & Builders Ship Together
              </h2>

              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                The <strong>iForge Builders Community</strong> is an invite-driven network of software architects, AI researchers, and DevOps engineers shipping production solutions, exchanging architecture teardowns, and collaborating on open-source toolchains.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white dark:bg-[#141414] border border-neutral-200/80 dark:border-neutral-800">
                  <div className="text-2xl font-extrabold text-black dark:text-white">12,000+</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Active Builders</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#141414] border border-neutral-200/80 dark:border-neutral-800">
                  <div className="text-2xl font-extrabold text-[#E61E32]">45+</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Open-Source Repos</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#141414] border border-neutral-200/80 dark:border-neutral-800">
                  <div className="text-2xl font-extrabold text-black dark:text-white">Weekly</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Tech Sessions</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white dark:text-black bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Experience Orbit Community</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <span>Partner With Community</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="relative">
              <div className="relative mx-auto max-w-md bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-neutral-400 ml-2">builders-orbit.tsx</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#E61E32] bg-[#FDE8EA] dark:bg-[#E61E32]/20 px-2 py-0.5 rounded-full">
                    LIVE DISCORD & GITHUB
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-neutral-700 dark:text-neutral-300 bg-[#FBFBFB] dark:bg-black/60 p-4 rounded-xl">
                  <p className="text-neutral-400">// iForge Builders Orbit Network</p>
                  <p className="text-black dark:text-white font-semibold">$ npm run join:community</p>
                  <p className="text-[#E61E32]">✓ Connecting 12k+ engineers across 40 countries...</p>
                  <p className="text-neutral-800 dark:text-neutral-200 font-medium">✓ Syncing latest Cloud, AI & App Architecture sprints</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#E61E32]" />
                    Discord • GitHub • Hackathons
                  </span>
                  <Link
                    href="/community"
                    className="font-bold text-[#E61E32] hover:underline"
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
