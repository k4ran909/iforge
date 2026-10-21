"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { techCapabilities } from "@/data/siteData";
import { Reveal } from "@/components/ui/reveal";

export default function TechStackMinimal() {
  const [active, setActive] = useState(0);
  const current = techCapabilities[active];

  return (
    <section className="section border-b border-hairline">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-5">Technology</p>
          <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Battle-tested stacks, vendor-independent
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          {/* Tabs */}
          <Reveal direction="left">
            <div className="flex flex-col border-t border-hairline">
              {techCapabilities.map((c, i) => (
                <button
                  key={c.category}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 border-b border-hairline py-4 text-left transition-colors ${
                    active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-mono text-xs tabular-nums transition-colors ${
                      active === i ? "text-[#E61E32]" : "text-muted-foreground"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold tracking-tight">{c.category}</span>
                  {active === i && (
                    <motion.span
                      layoutId="stack-active"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-[#E61E32]"
                    />
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Items */}
          <Reveal direction="right">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2"
              >
                {current.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-background px-5 py-4 text-sm text-foreground"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#E61E32]" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
