import React from "react";
import Link from "next/link";
import { servicesData, siteConfig } from "@/data/siteData";
import { ArrowRight, ArrowUpRight } from "reicon-react";
import HalftoneWordmarkFooter, {
  type FooterColumn,
} from "@/components/ui/halftone-wordmark-footer";

// Columns for the halftone wordmark band, built from the real site navigation.
const halftoneColumns: FooterColumn[] = [
  {
    title: "Practices",
    links: servicesData.slice(0, 3).map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Community", href: "/community" },
      { label: "Get a Quote", href: "/quote" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
      { label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}` },
    ],
  },
];

const linkCol = (title: string, links: { label: string; href: string }[]) => (
  <div>
    <h3 className="mb-5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
      {title}
    </h3>
    <ul className="space-y-3 text-sm">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            href={l.href}
            className="link-underline text-muted-foreground hover:text-foreground"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-background" data-rail-end>
      {/* CTA band */}
      <section className="border-t border-hairline">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-end md:py-24">
          <div>
            <p className="eyebrow mb-5">Let&apos;s build</p>
            <h2 className="max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Ready to engineer resilient enterprise systems?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2 bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-[#E61E32]"
            >
              Calculate project scope
              <ArrowRight className="h-4 w-4 arrow-nudge" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-hairline px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-[#E61E32] hover:text-[#E61E32]"
            >
              Contact leadership
            </Link>
          </div>
        </div>
      </section>

      {/* Directory */}
      <footer className="border-t border-hairline">
        <div className="container-page py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div className="max-w-sm">
              <span className="text-2xl font-black tracking-tight text-foreground lowercase">
                iforge
              </span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                End-to-end enterprise IT consultancy, multi-cloud architecture, AI &amp; ML
                engineering, cybersecurity, and bespoke application development.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Zero-Trust", "SOC 2 Type II", "ISO 27001", "24/7 SLA"].map((item) => (
                  <span
                    key={item}
                    className="border border-hairline px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {linkCol(
              "Practices",
              servicesData.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))
            )}

            {linkCol("Platform", [
              { label: "Builders Community", href: "/community" },
              { label: "Project Calculator", href: "/quote" },
              { label: "Cloud Migration", href: "/services/cloud-services" },
              { label: "Enterprise Apps", href: "/services/application-development" },
            ])}

            {linkCol("Company", [
              { label: "About", href: "/about" },
              { label: "Team", href: "/team" },
              { label: "Contact", href: "/contact" },
              { label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}` },
              { label: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
            ])}
          </div>

          {/* Meta strip */}
          <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {siteConfig.name}. Noida, India — serving global clients.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/contact" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Security
              </Link>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-[#E61E32]"
              >
                {siteConfig.contactEmail} <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Giant halftone wordmark sign-off */}
      <HalftoneWordmarkFooter
        wordmark="iforge"
        label={siteConfig.name}
        meta={`© ${year} · Noida, India`}
        columns={halftoneColumns}
        preset="night"
        palette={{ background: "#050505", ink: "#e9e4da", warm: "#E61E32" }}
        height="clamp(420px, 34vw, 600px)"
      />
    </div>
  );
}
