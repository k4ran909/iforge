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
  CheckCircle2,
  Sparkles
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-6 h-6 text-[#E61E32]" />,
  Cloud: <Cloud className="w-6 h-6 text-[#E61E32]" />,
  Server: <Server className="w-6 h-6 text-black" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#E61E32]" />,
  Code2: <Code2 className="w-6 h-6 text-[#E61E32]" />,
};

export default function ServicesBento() {
  const [filter, setFilter] = useState<string>("all");

  const filteredServices = filter === "all" 
    ? servicesData 
    : servicesData.filter((s) => {
        if (filter === "cloud") return s.slug === "cloud-services" || s.slug === "it-infrastructure";
        if (filter === "ai") return s.slug === "ai-ml";
        if (filter === "apps") return s.slug === "application-development";
        if (filter === "security") return s.slug === "cybersecurity-services";
        return true;
      });

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE8EA] text-[#E61E32] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E61E32]" />
            Enterprise Service Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
            Engineered For Uncompromising Scale
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Five core enterprise practice groups delivering full-lifecycle cloud architecture, machine learning systems, proactive cybersecurity, and high-velocity application engineering.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All 5 Practices" },
              { id: "ai", label: "AI & ML" },
              { id: "cloud", label: "Cloud & Infrastructure" },
              { id: "apps", label: "Application Development" },
              { id: "security", label: "Cybersecurity" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-black text-white shadow-sm"
                    : "bg-[#FBFBFB] text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => {
            const isAppDev = service.slug === "application-development";
            return (
              <div
                key={service.id}
                className={`group relative bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#E61E32] hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 ${
                  isAppDev && filter === "all" ? "lg:col-span-2 bg-gradient-to-br from-[#FBFBFB] via-white to-[#FDE8EA]/20 border-neutral-200" : ""
                }`}
              >
                <div>
                  {/* Card Header: Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#FDE8EA] border border-[#E61E32]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {iconMap[service.iconName] || <Server className="w-6 h-6 text-[#E61E32]" />}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#E61E32] transition-colors">
                      Enterprise Practice
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-black group-hover:text-[#E61E32] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Core Features List */}
                  <div className="space-y-2.5 mb-6">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#262626]">
                        <CheckCircle2 className="w-4 h-4 text-[#E61E32] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 text-[11px] font-medium text-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E61E32] group-hover:text-[#C81426] transition-colors"
                  >
                    <span>View Architecture Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={`/quote?service=${service.slug}`}
                    className="text-[11px] font-semibold text-neutral-500 hover:text-black transition-colors"
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
          <p className="text-sm text-neutral-600">
            Looking for a hybrid or bespoke infrastructure engagement?{" "}
            <Link href="/quote" className="font-semibold text-[#E61E32] hover:underline">
              Request an architectural audit & consultation →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
