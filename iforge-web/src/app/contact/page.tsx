import React from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/siteData";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRight } from "reicon-react";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description:
    "Talk to iForge's architects and engineers about your enterprise IT, cloud, AI and security projects.",
};

const CHANNELS = [
  { label: "Email", value: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`,
  },
  { label: "Studio", value: "Noida, India — serving global clients", href: null },
];

export default function ContactPage() {
  return (
    <div className="w-full bg-background">
      <section className="border-b border-hairline">
        <div className="container-page grid gap-16 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Left: intro + channels */}
          <div>
            <Reveal>
              <p className="eyebrow mb-6">Contact</p>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Let&apos;s talk about your{" "}
                <span className="text-[#E61E32]">infrastructure</span>
              </h1>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
                Speak directly with a Principal Architect — no sales funnel. Scope requirements,
                review your security posture, or request a proposal.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-12 border-t border-hairline">
                {CHANNELS.map((c) => (
                  <div
                    key={c.label}
                    className="grid grid-cols-[120px_1fr] items-baseline gap-4 border-b border-hairline py-5"
                  >
                    <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {c.href ? (
                        <a
                          href={c.href}
                          className="inline-flex items-center gap-1 hover:text-[#E61E32]"
                        >
                          {c.value}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal direction="left">
            <div className="border border-hairline p-8 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
