"use client"

import { ArrowRight, ShieldCheck, Cloud, BrainCircuit } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { SonarGrid } from "@/components/ui/sonar-grid"

const settings = {
  ringWidth: 90,
  speed: 260,
  amplitude: 2.2,
  pingEvery: 2.4,
  interactive: true,
  spacing: 26,
  baseOpacity: 0.28,
  useThemeColor: true,
  color: "#1783C1",
  eyebrow: "Certified AWS & Google Cloud Partner",
  headline: "Accelerating Success With IT Services",
  subline:
    "From cloud architecture and AI advisory to cybersecurity and web engineering — we forge resilient, scalable technology for enterprises that demand results.",
}

const stats = [
  { value: "50+", label: "Cloud Architects" },
  { value: "98%", label: "Client Retention" },
  { value: "<15 min", label: "Response Time" },
  { value: "100%", label: "SLA Compliance" },
]

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props }
  const reduce = useReducedMotion()
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <SonarGrid
      id="sonar-grid-demo"
      ringWidth={s.ringWidth}
      speed={s.speed}
      amplitude={s.amplitude}
      pingEvery={s.pingEvery}
      interactive={s.interactive}
      spacing={s.spacing}
      baseOpacity={s.baseOpacity}
      color={s.useThemeColor ? undefined : s.color}
      pingArea={[0.22, 0.18, 0.78, 0.82]}
      className="bg-background flex min-h-[max(600px,100svh)] w-full flex-col -mt-20"
    >
      {/* Soft radial wash for legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_40%_35%_at_50%_45%,var(--color-background)_0%,transparent_100%)]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pt-28 pb-16 text-center sm:px-8">
        <div className="flex max-w-2xl flex-col items-center">
          {/* Eyebrow badge */}
          <motion.div
            {...enter(0)}
            className="text-muted-foreground border-border mb-5 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-sm bg-background/60"
          >
            <span aria-hidden="true" className="bg-primary size-2 rounded-full animate-pulse" />
            {s.eyebrow}
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...enter(0.08)}
            className="text-foreground text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {s.headline}
          </motion.h1>

          {/* Subline */}
          <motion.p
            {...enter(0.16)}
            className="text-muted-foreground mt-6 max-w-xl text-base text-pretty sm:text-lg leading-relaxed"
          >
            {s.subline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              id="cta-primary"
              data-slot="cta-primary"
              className="group bg-primary text-primary-foreground focus-visible:ring-ring/50 inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full px-7 text-sm font-semibold shadow-lg shadow-[#1783C1]/20 transition-[transform,box-shadow] duration-200 outline-none hover:shadow-xl hover:shadow-[#1783C1]/30 focus-visible:ring-[3px] active:scale-[0.98]"
            >
              Get a Quote
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="#services"
              data-slot="cta-secondary"
              className="bg-background/70 text-foreground border-border hover:bg-accent focus-visible:ring-ring/50 inline-flex h-12 cursor-pointer items-center rounded-full border px-7 text-sm font-semibold backdrop-blur transition-[background-color,transform] duration-200 outline-none focus-visible:ring-[3px] active:scale-[0.98]"
            >
              Explore Services
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            {...enter(0.32)}
            className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <Cloud className="size-3.5 text-[#1783C1]" />
              AWS & GCP Certified
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#1783C1]" />
              SOC 2 Compliant
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="inline-flex items-center gap-1.5">
              <BrainCircuit className="size-3.5 text-[#1783C1]" />
              AI-Powered Solutions
            </span>
          </motion.div>
        </div>

        {/* KPI Stats Bar */}
        <motion.div
          {...enter(0.4)}
          className="mt-14 w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm px-4 py-4 text-center"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] text-muted-foreground font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SonarGrid>
  )
}
