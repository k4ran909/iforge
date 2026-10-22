import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Allura } from "next/font/google";
import { ArrowRight } from "reicon-react";
import { siteConfig } from "@/data/siteData";
import { getContent, type TeamMember, type TeamStat } from "@/lib/content";
import { Reveal, Stagger, RevealItem } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: `Team | ${siteConfig.name}`,
  description: "Meet the architects, engineers and specialists behind iForge Technologies.",
};

// Handwritten face for the founder's signature line.
const signature = Allura({ weight: "400", subsets: ["latin"], display: "swap" });

/** "120+" → "120" in full colour, "+" in crimson. */
function Figure({ value }: { value: string }) {
  const m = /^([\d.,]+)(.*)$/.exec(value);
  if (!m) return <>{value}</>;
  return (
    <>
      {m[1]}
      <span className="text-[#E61E32]">{m[2]}</span>
    </>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
}

function Stats({ stats }: { stats: TeamStat[] }) {
  const cols = stats.length >= 4 ? "lg:grid-cols-4" : stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <Stagger className={`mt-16 grid grid-cols-1 divide-y divide-hairline border-y border-hairline sm:divide-x sm:divide-y-0 ${cols}`}>
      {stats.map((s) => (
        <RevealItem key={s.label} className="px-6 py-10 text-center">
          <div className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            <Figure value={s.value} />
          </div>
          <div className="mt-3 text-sm text-muted-foreground">{s.label}</div>
        </RevealItem>
      ))}
    </Stagger>
  );
}

function MemberCard({ m }: { m: TeamMember }) {
  const links = [
    ["LinkedIn", m.linkedin],
    ["GitHub", m.github],
    ["X", m.x],
  ].filter(([, href]) => href) as [string, string][];

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline bg-muted">
        {m.photo ? (
          <Photo
            src={m.photo}
            alt={m.name}
            className="grayscale-[40%] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-5xl font-bold tracking-tight text-foreground/25">
            {initials(m.name)}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{m.name}</h3>
      {m.role && <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>}
      {m.bio && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">{m.bio}</p>}
      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-hairline px-2.5 py-1 text-[0.7rem] font-semibold text-foreground transition-colors hover:border-[#E61E32]/50 hover:text-[#E61E32]"
            >
              {label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default async function TeamPage() {
  const { team, teamPage: p } = await getContent();
  const hasQuote = Boolean(p.quoteLead || p.quoteRest);
  const firstName = p.quoteName.split(/\s+/)[0] ?? "";

  return (
    <div className="w-full bg-background">
      {/* Page header */}
      <section className="border-b border-hairline">
        <div className="container-page pt-20 pb-14 sm:pt-28 sm:pb-20">
          <Reveal>
            <p className="eyebrow mb-6">Team</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              The people behind <span className="text-[#E61E32]">iForge</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Who we are + highlights */}
      <section className="section">
        <div className="container-page">
          <div className={`grid gap-10 lg:items-center lg:gap-16 ${p.introImage ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}>
            {p.introImage && (
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline bg-muted">
                  <Photo src={p.introImage} alt={p.introHeading || "iForge team"} />
                </div>
              </Reveal>
            )}
            <Reveal direction={p.introImage ? "left" : "up"}>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                <span className="text-[#E61E32]">/</span> {p.introHeading}
              </h2>
              <p className={`mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg ${p.introImage ? "" : "max-w-3xl"}`}>
                {p.introBody}
              </p>
            </Reveal>
          </div>

          {p.stats.length > 0 && <Stats stats={p.stats} />}
        </div>
      </section>

      {/* Founder quote */}
      {hasQuote && (
        <section className="section border-t border-hairline">
          <div className={`container-page grid gap-12 lg:items-center lg:gap-16 ${p.quotePhoto ? "lg:grid-cols-2" : ""}`}>
            <Reveal>
              <span aria-hidden className="block font-serif text-8xl leading-[0.6] text-[#E61E32]">
                &ldquo;
              </span>
              <blockquote className="mt-6 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-[2.1rem]">
                <span className="text-foreground">{p.quoteLead}</span>{" "}
                <span className="text-muted-foreground">{p.quoteRest}</span>
              </blockquote>
              {(p.quoteName || p.quoteRole) && (
                <div className="mt-8 flex items-center gap-5 border-t border-dashed border-hairline pt-6">
                  <div>
                    {p.quoteName && <div className="text-sm font-semibold text-foreground">{p.quoteName}</div>}
                    {p.quoteRole && <div className="mt-0.5 text-xs text-muted-foreground">{p.quoteRole}</div>}
                  </div>
                  {firstName && (
                    <>
                      <span aria-hidden className="h-10 w-px bg-hairline" />
                      <span aria-hidden className={`${signature.className} text-4xl leading-none text-foreground/80`}>
                        {firstName}
                      </span>
                    </>
                  )}
                </div>
              )}
            </Reveal>
            {p.quotePhoto && (
              <Reveal direction="left">
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-hairline bg-muted">
                  <Photo src={p.quotePhoto} alt={p.quoteName || "Founder"} />
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* The team */}
      <section className="section border-t border-hairline">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-5">The team</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Meet the people you&apos;ll work with
            </h2>
          </Reveal>

          {team.length === 0 ? (
            <Reveal>
              <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed border-hairline px-6 py-16 text-center">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">Team profiles are on their way</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
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
            <Stagger className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <RevealItem key={m.id}>
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
