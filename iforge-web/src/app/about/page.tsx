import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, companyStats, valueProps, companyTimeline, partnerLogos } from "@/data/siteData";
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Globe2, 
  Users, 
  Award, 
  Building2,
  Lock,
  Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: "Learn about iForge Technologies — our engineering mission, certified cloud alliances, leadership principles, and a decade of enterprise excellence.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* About Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-18 lg:pb-24 bg-gradient-to-b from-[#F4F7FB] via-white to-white border-b border-slate-100">
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#1783C1]/10 blur-3xl rounded-full" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4FC] text-[#0A3C6E] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#1783C1]" />
              Enterprise IT Consultancy & Engineering
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A3C6E] tracking-tight leading-tight">
              Engineering Digital Foundations For Tomorrow&apos;s Market Leaders
            </h1>

            <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-normal">
              Founded on principles of unyielding technical precision, iForge Technologies transforms legacy complexity into high-velocity, secure, and resilient cloud architectures.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {companyStats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0A3C6E]">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-8 sm:p-12 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8F4FC] flex items-center justify-center text-[#1783C1]">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3C6E]">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                To empower forward-thinking organizations with architectural clarity, multi-cloud mastery, and intelligent automation. We eliminate technical friction so enterprises can build, deploy, and scale without compromise.
              </p>
            </div>

            <div className="bg-[#0A3C6E] text-white border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#38bdf8]">
                <Globe2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                To become the world&apos;s most dependable engineering partner for mission-critical IT transformations, where cutting-edge technology directly translates into verifiable client market capitalization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decade of Excellence Timeline */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1783C1]">Our Evolution</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A3C6E]">A Decade of Technical Delivery</h2>
            <p className="text-sm text-[#666666]">Milestones charting our growth from infrastructure advisory to global cloud architecture.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {companyTimeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-xs hover:border-[#1783C1] transition-all"
              >
                <div className="shrink-0 px-4 py-2 rounded-xl bg-[#E8F4FC] text-[#0A3C6E] font-extrabold text-lg">
                  {item.year}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[#0A3C6E]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Certified Alliances */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1783C1]">Alliance Ecosystem</span>
            <h2 className="text-3xl font-extrabold text-[#0A3C6E]">Certified Industry Partnerships</h2>
            <p className="text-sm text-[#666666]">
              Our certified engineering credentials grant our clients direct access to priority tier-1 support, credits, and beta APIs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {partnerLogos.map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-6 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl hover:border-[#1783C1] transition-all"
              >
                <div className="relative h-12 w-32 mb-3">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-[#0A3C6E] text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#0A3C6E] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Partner With Certified Enterprise Architects
          </h2>
          <p className="text-base text-slate-200 max-w-2xl mx-auto">
            Whether you require a comprehensive cloud audit, AI & ML implementation, zero-trust cybersecurity assessment, or custom application engineering, we are ready to assist.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-lg transition-all"
            >
              <span>Calculate Project Scope</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              <span>Contact Our Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
