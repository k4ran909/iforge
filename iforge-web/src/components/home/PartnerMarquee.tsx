"use client";

import React from "react";
import Image from "next/image";
import { partnerLogos, clientLogos } from "@/data/siteData";

export default function PartnerMarquee() {
  const allPartners = [
    ...partnerLogos.map((p) => ({ ...p, type: "Strategic Partner" })),
    ...clientLogos.map((c) => ({ ...c, type: "Trusted Client" })),
  ];

  // Duplicate for seamless infinite loop
  const marqueeItems = [...allPartners, ...allPartners];

  return (
    <section className="py-10 border-y border-neutral-200 bg-[#FBFBFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
          Trusted By Industry Pioneers & Certified By Cloud Titans
        </p>
      </div>

      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center justify-center shrink-0 h-14 w-36 sm:w-44 px-4 py-2 bg-white rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#E61E32]/60 transition-all hover:scale-105"
              title={`${item.name} (${item.type})`}
            >
              <div className="relative h-8 w-28 sm:w-32">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 112px, 128px"
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
