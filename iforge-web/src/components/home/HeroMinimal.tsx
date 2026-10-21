"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const PRACTICES = ["AI & ML", "Cloud", "Infrastructure", "Cybersecurity", "App Development"];

const WORDS = ["Accelerating", "enterprise", "success", "with", "intelligent", "IT."];

export default function HeroMinimal() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-hairline">
      {/* Faint dotted field, mono */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          color: "var(--hairline)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, #000 20%, transparent 75%)",
        }}
      />

      <div className="container-page relative pt-20 pb-16 sm:pt-28 sm:pb-24">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          Certified AWS &amp; Google Cloud Partner
        </motion.p>

        {/* Word-by-word headline reveal */}
        <h1 className="mt-7 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {WORDS.map((w, i) => (
            <motion.span
              key={i}
              initial={reduced ? false : { opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              <span className={w === "intelligent" || w === "IT." ? "text-[#E61E32]" : ""}>
                {w}
              </span>
              {i < WORDS.length - 1 && " "}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          From multi-cloud architecture and zero-trust cybersecurity to AI &amp; ML systems and
          high-performance application engineering — we build resilient digital infrastructure
          that scales.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/quote"
            className="group inline-flex items-center gap-2 bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-[#E61E32]"
          >
            Calculate project scope
            <ArrowRight className="h-4 w-4 arrow-nudge" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 border border-hairline px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-[#E61E32] hover:text-[#E61E32]"
          >
            Explore 5 practices
          </Link>
          <Link
            href="/community"
            className="link-underline ml-1 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Builders community <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Practice strip — real capabilities, not invented numbers */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-5"
        >
          {PRACTICES.map((p) => (
            <Link
              key={p}
              href="/#services"
              className="group bg-background p-5 transition-colors hover:bg-muted sm:p-6"
            >
              <div className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                Practice
              </div>
              <div className="mt-2 text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-[#E61E32]">
                {p}
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
