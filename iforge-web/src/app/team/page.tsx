import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { siteConfig } from "@/data/siteData";
import { getContent, type TeamMember } from "@/lib/content";
import { Reveal, Stagger, RevealItem } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: `Team | ${siteConfig.name}`,
  description: "Meet the architects, engineers and specialists behind iForge Technologies.",
};

// Soft colour fields for the glass to frost. Deliberately static: a moving
// backdrop would make every card's blur recompute each frame.
function Glows() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[#E61E32]/25 blur-[120px] dark:bg-[#E61E32]/30" />
      <div className="absolute right-[-10rem] top-[28rem] h-[30rem] w-[30rem] rounded-full bg-violet-500/20 blur-[120px] dark:bg-violet-600/25" />
      <div className="absolute bottom-[-8rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-rose-400/20 blur-[120px] dark:bg-[#5c0d31]/40" />
    </div>
  );
}

const GLASS =
  "relative overflow-hidden rounded-3xl border border-white/60 bg-white/45 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)]";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function MemberCard({ m }: { m: TeamMember }) {
  const links = [
    ["LinkedIn", m.linkedin],
    ["GitHub", m.github],
    ["X", m.x],
  ].filter(([, href]) => href) as [string, string][];

  return (
    <article
      className={`${GLASS} group h-full p-3 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-18px_rgba(230,30,50,0.35)]`}
    >
      {/* the glass's lit top edge */}
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/30" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-foreground/[0.06]">
        {m.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-5xl font-bold tracking-tight text-foreground/30">
            {initials(m.name)}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="px-3 pb-3 pt-5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{m.name}</h3>
        {m.role && (
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#E61E32]">{m.role}</p>
        )}
        {m.bio && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>}
        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-foreground/10 bg-white/40 px-2.5 py-1 text-[0.7rem] font-semibold text-foreground transition-colors hover:border-[#E61E32]/50 hover:text-[#E61E32] dark:bg-white/[0.04]"
              >
                {label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default async function TeamPage() {
  const { team } = await getContent();

  return (
    <div className="relative isolate w-full overflow-hidden bg-background">
      <Glows />

      <section className="border-b border-hairline">
        <div className="container-page pt-20 pb-14 sm:pt-28 sm:pb-20">
          <Reveal>
            <p className="eyebrow mb-6">Team</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              The people behind <span className="text-[#E61E32]">iForge</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Architects, engineers and security specialists who design, build and run the systems
              our clients depend on.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          {team.length === 0 ? (
            <Reveal>
              <div className={`${GLASS} mx-auto max-w-xl p-10 text-center`}>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Team profiles are on their way
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We&apos;re putting faces to names. In the meantime, our architects are a message away.
                </p>
                <Link
                  href="/contact"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-[#E61E32]"
                >
                  Talk to the team <ArrowRight className="h-4 w-4 arrow-nudge" />
                </Link>
              </div>
            </Reveal>
          ) : (
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <RevealItem key={m.id} className="h-full">
                  <MemberCard m={m} />
                </RevealItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </div>
  );
}
