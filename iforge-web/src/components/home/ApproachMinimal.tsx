"use client";

import React from "react";
import { Reveal, Stagger, RevealItem } from "@/components/ui/reveal";

const PRINCIPLES = [
  {
    k: "01",
    title: "Zero-trust engineering",
    body: "Every line of code and infrastructure component is architected with defense-in-depth, encrypted pipelines, and least-privilege access by default.",
  },
  {
    k: "02",
    title: "Agile speed & transparency",
    body: "Rapid sprints, bi-weekly milestone demonstrations, dedicated channels, and crystal-clear project accounting — no black boxes.",
  },
  {
    k: "03",
    title: "Vendor-independent stacks",
    body: "Industry-standard, open frameworks tuned for high concurrency, security, and low latency — so you are never locked in.",
  },
  {
    k: "04",
    title: "Measured outcomes",
    body: "Every engagement ships with benchmarks, governance, and SLAs. We optimise for the metrics that move your business.",
  },
];

export default function ApproachMinimal() {
  return (
    <section className="section border-b border-hairline bg-muted">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-5">How we work</p>
          <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Principles that hold at enterprise scale
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.k}>
              <div className="group h-full bg-background p-8 transition-colors hover:bg-muted sm:p-10">
                <span className="font-mono text-sm text-[#E61E32]">{p.k}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
