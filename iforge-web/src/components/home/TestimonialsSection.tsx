"use client";

import React from "react";
import Image from "next/image";
import { testimonials, clientLogos } from "@/data/siteData";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#FBFBFB] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE8EA] text-[#E61E32] text-xs font-bold uppercase tracking-wider">
            Client Success & Validation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Trusted By Engineering Leaders
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            Discover how visionary enterprises modernise legacy infrastructure, safeguard critical data, and accelerate developer velocity with iForge.
          </p>
        </div>

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => {
            const clientLogo = clientLogos.find((c) => c.name.toLowerCase().includes(t.company.toLowerCase()));
            return (
              <div
                key={index}
                className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all hover:border-[#E61E32]/50 group"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-neutral-200 group-hover:text-[#E61E32]/25 transition-colors" />
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm text-[#262626] leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Client Info & Logo */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-black">
                      {t.client}
                    </div>
                    <div className="text-xs text-neutral-500 font-medium">
                      {t.company}
                    </div>
                  </div>

                  {clientLogo && (
                    <div className="relative h-7 w-20 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Image
                        src={clientLogo.src}
                        alt={t.company}
                        fill
                        sizes="80px"
                        className="object-contain object-right"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
