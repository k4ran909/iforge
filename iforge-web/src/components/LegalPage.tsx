import React from "react";
import { Reveal } from "@/components/ui/reveal";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

/** Shared layout for the Privacy Policy and Terms pages. */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <div className="w-full bg-background">
      <section className="border-b border-hairline">
        <div className="container-page pt-20 pb-14 sm:pt-28 sm:pb-16">
          <Reveal>
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              Last updated {updated}
            </p>
            <div className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <ol className="space-y-12">
            {sections.map((s, i) => (
              <li key={s.heading} className="grid gap-3 border-t border-hairline pt-8 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-sm text-[#E61E32]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{s.heading}</h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a:hover]:text-[#E61E32] [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-foreground [&_ul]:space-y-1.5">
                    {s.body}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
