import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CommunityOrbitDemo from "@/components/ui/builders-orbit-demo";
import GithubSkyline from "@/components/community/GithubSkyline";
import { Reveal, Stagger, RevealItem } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteData";

export const metadata: Metadata = {
  title: `Builders Community | ${siteConfig.name}`,
  description:
    "Where 12,000+ engineers, architects, and creators ship cutting-edge technology and share production architectures.",
};

const TRACKS = [
  {
    title: "AI & ML Innovation",
    desc: "RAG architectures, local model inference, LangChain pipelines, and vector database optimization.",
    members: "4.2k",
  },
  {
    title: "Cloud & DevOps",
    desc: "Multi-region Kubernetes, Terraform IaC modules, FinOps cost cutting, and continuous delivery.",
    members: "3.8k",
  },
  {
    title: "Application Development",
    desc: "Next.js App Router, React 19 server components, cross-platform mobile, and real-time dashboards.",
    members: "2.9k",
  },
  {
    title: "Cybersecurity & Zero Trust",
    desc: "VAPT challenges, ethical hacking walkthroughs, cloud security audits, and SOC 2 frameworks.",
    members: "2.1k",
  },
];

export default function CommunityPage() {
  return (
    <div className="w-full bg-background">
      {/* Orbit hero */}
      <section className="border-b border-hairline">
        <div className="container-page pt-14 text-center">
          <Reveal>
            <p className="eyebrow mx-auto mb-6 w-fit">Global developer ecosystem</p>
          </Reveal>
        </div>
        <CommunityOrbitDemo />
        <div className="container-page pb-16 text-center">
          <Reveal>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-[#E61E32]"
              >
                Join builders community
                <ArrowRight className="h-4 w-4 arrow-nudge" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-hairline px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-[#E61E32] hover:text-[#E61E32]"
              >
                Partner with organizers
              </Link>
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              12,000+ engineers, founders &amp; creators shipping daily
            </p>
          </Reveal>
        </div>
      </section>

      {/* Live GitHub contribution skyline */}
      <section className="section border-b border-hairline bg-muted">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-5">Live activity</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              A year of shipping, in real time
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Our contribution graph, synced live from GitHub — flat heat map or
              isometric skyline. Toggle the view, hover a day, or drag to orbit.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <GithubSkyline />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-5">Community tracks</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Collaborative learning &amp; hackathons
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
            {TRACKS.map((t, i) => (
              <RevealItem key={t.title}>
                <div className="group h-full bg-background p-8 transition-colors hover:bg-muted sm:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm text-[#E61E32]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="border border-hairline px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      {t.members} builders
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
