import React from 'react';
import type { Metadata } from 'next';
import CommunityOrbitDemo from '@/components/ui/builders-orbit-demo';
import Link from 'next/link';
import { ArrowRight, Users, Sparkles, Terminal, MessageSquare, Code, ShieldCheck, Zap } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export const metadata: Metadata = {
  title: `Builders Community | ${siteConfig.name}`,
  description: 'Where 12,000+ engineers, architects, and creators ship cutting-edge technology and share production architectures.',
};

export default function CommunityPage() {
  return (
    <div className="w-full bg-white pb-20">
      {/* Top Banner Badge */}
      <div className="mx-auto max-w-[1200px] px-4 pt-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E61E32]/20 bg-[#FDE8EA] px-4 py-1.5 text-xs font-semibold text-black shadow-xs">
          <Users className="h-3.5 w-3.5 text-[#E61E32]" />
          <span>Global Developer Ecosystem & Talent Network</span>
        </div>
      </div>

      {/* Orbit Hero Component */}
      <CommunityOrbitDemo />

      {/* CTA Button Section */}
      <div className="mx-auto mt-6 max-w-[650px] px-4 text-center">
        <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <Link
            href="/quote"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E61E32] px-7 text-sm font-semibold text-white shadow-md shadow-[#E61E32]/25 transition-all hover:bg-[#C81426] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Join Builders Community</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-7 text-sm font-semibold text-black hover:bg-neutral-50 hover:border-[#E61E32] transition-colors cursor-pointer"
          >
            <span>Partner With Organizers</span>
          </Link>
        </div>
        <p className="mt-3 text-xs text-neutral-500 font-medium">
          Over 12,000+ engineers, founders, and creators shipping daily worldwide.
        </p>
      </div>

      {/* Community Tracks Grid */}
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E61E32]">Community Tracks</span>
          <h2 className="text-3xl font-extrabold text-black">Collaborative Learning & Hackathons</h2>
          <p className="text-sm text-neutral-600">
            Deep-dive technical channels curated by Principal Architects at iForge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "AI & ML Innovation",
              desc: "RAG architectures, local model inference, LangChain pipelines, and vector database optimization.",
              icon: <Zap className="w-5 h-5 text-[#E61E32]" />,
              members: "4.2k Builders",
            },
            {
              title: "Cloud & DevOps",
              desc: "Multi-region Kubernetes, Terraform IaC modules, FinOps cost cutting, and continuous delivery.",
              icon: <Terminal className="w-5 h-5 text-black" />,
              members: "3.8k Builders",
            },
            {
              title: "Application Development",
              desc: "Next.js App Router, React 19 server components, cross-platform mobile, and real-time dashboards.",
              icon: <Code className="w-5 h-5 text-[#E61E32]" />,
              members: "2.9k Builders",
            },
            {
              title: "Cybersecurity & Zero Trust",
              desc: "VAPT challenges, ethical hacking walkthroughs, cloud security audits, and SOC 2 frameworks.",
              icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
              members: "2.1k Builders",
            },
          ].map((track, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-[#E61E32] hover:bg-white hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-4">
                {track.icon}
              </div>
              <h3 className="text-base font-bold text-black mb-2">{track.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">{track.desc}</p>
              <span className="text-[11px] font-bold text-[#E61E32] bg-[#FDE8EA] px-2.5 py-1 rounded-md">
                {track.members}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
