"use client";

import React, { useState } from "react";
import Link from "next/link";
import { servicesData } from "@/data/siteData";
import { 
  ArrowRight, 
  BrainCircuit, 
  Cloud, 
  Server, 
  ShieldCheck, 
  Code2, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-6 h-6 text-[#1783C1]" />,
  Cloud: <Cloud className="w-6 h-6 text-[#1783C1]" />,
  Server: <Server className="w-6 h-6 text-[#0A3C6E]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
  Code2: <Code2 className="w-6 h-6 text-indigo-600" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-amber-600" />,
  Users: <Users className="w-6 h-6 text-rose-600" />,
};

export default function ServicesBento() {
  const [filter, setFilter] = useState<string>("all");

  const filteredServices = filter === "all" 
    ? servicesData 
    : servicesData.filter((s) => {
        if (filter === "cloud") return s.slug === "cloud-services" || s.slug === "it-infrastructure";
        if (filter === "ai") return s.slug === "data-ai" || s.slug === "web-development";
        if (filter === "security") return s.slug === "cybersecurity-services";
        if (filter === "growth") return s.slug === "digital-marketing" || s.slug === "staffing-solutions";
        return true;
      });

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4FC] text-[#0A3C6E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#1783C1]" />
            Enterprise Service Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A3C6E] tracking-tight">
            Engineered For Uncompromising Scale
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            Seven specialized practice groups delivering full-lifecycle cloud architecture, intelligent automation, proactive cybersecurity, and high-velocity engineering.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All 7 Practices" },
              { id: "cloud", label: "Cloud & Infrastructure" },
              { id: "ai", label: "Data, AI & Engineering" },
              { id: "security", label: "Cybersecurity & Risk" },
              { id: "growth", label: "Growth & Staffing" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#0A3C6E] text-white shadow-sm"
                    : "bg-[#F4F7FB] text-[#333333] hover:bg-slate-200/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => {
            const isFeatured = index === 0 || index === 1;
            return (
              <div
                key={service.id}
                className={`group relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#1783C1] hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 ${
                  isFeatured && filter === "all" ? "lg:col-span-1 bg-gradient-to-b from-[#F4F7FB]/40 to-white" : ""
                }`}
              >
                <div>
                  {/* Card Header: Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F4FC] border border-[#1783C1]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {iconMap[service.iconName] || <Server className="w-6 h-6 text-[#1783C1]" />}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#1783C1] transition-colors">
                      Enterprise Practice
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-[#0A3C6E] group-hover:text-[#1783C1] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Core Features List */}
                  <div className="space-y-2.5 mb-6">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#333333]">
                        <CheckCircle2 className="w-4 h-4 text-[#1783C1] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1783C1] group-hover:text-[#136FA5] transition-colors"
                  >
                    <span>View Architecture Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={`/quote?service=${service.slug}`}
                    className="text-[11px] font-semibold text-slate-500 hover:text-[#0A3C6E] transition-colors"
                  >
                    Quote →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#666666]">
            Looking for a hybrid or bespoke infrastructure engagement?{" "}
            <Link href="/quote" className="font-semibold text-[#1783C1] hover:underline">
              Request an architectural audit & consultation →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
