"use client";

import React from "react";
import { testimonials } from "@/data/siteData";
import { Reveal, Stagger, RevealItem } from "@/components/ui/reveal";

export default function TestimonialsMinimal() {
  return (
    <section className="section border-b border-hairline bg-muted">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-5">Proof</p>
          <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Trusted by teams that ship
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.company}>
              <figure className="flex h-full flex-col bg-background p-8 sm:p-10">
                <div className="mb-6 font-mono text-xs tracking-widest text-[#E61E32]">
                  {"★".repeat(t.rating)}
                </div>
                <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-hairline pt-5">
                  <div className="text-sm font-semibold text-foreground">{t.client}</div>
                  <div className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {t.company}
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
