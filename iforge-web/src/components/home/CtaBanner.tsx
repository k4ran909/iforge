"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteData";

export default function CtaBanner() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A3C6E] via-[#0D4B8A] to-[#0A3C6E] p-8 sm:p-12 lg:p-16 text-white shadow-xl shadow-[#0A3C6E]/15">
          {/* Decorative ambient glow */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-[#1783C1]/30 blur-3xl rounded-full" 
          />

          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Dedicated Enterprise IT & Cloud Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Forge Your Resilient Tech Architecture?
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              Schedule a complimentary discovery session with our Principal Cloud & Cybersecurity Architects. We analyze your infrastructure bottlenecks and provide an actionable roadmap within 48 hours.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-lg shadow-black/20 transition-all hover:scale-105 active:scale-95"
              >
                <span>Request Architectural Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#38bdf8]" />
                <span>Call {siteConfig.phone}</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold text-slate-200 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Inquiry</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
