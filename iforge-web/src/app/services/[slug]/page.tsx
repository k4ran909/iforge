import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData, siteConfig } from "@/data/siteData";
import ServiceFaqAccordion from "@/components/services/ServiceFaqAccordion";
import ContactForm from "@/components/ContactForm";
import { 
  ArrowRight, 
  BrainCircuit, 
  Cloud, 
  Server, 
  ShieldCheck, 
  Code2, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  Shield,
  Layers,
  Zap
} from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-8 h-8 text-[#E61E32]" />,
  Cloud: <Cloud className="w-8 h-8 text-[#E61E32]" />,
  Server: <Server className="w-8 h-8 text-black dark:text-white" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
  Code2: <Code2 className="w-8 h-8 text-[#E61E32]" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-amber-600" />,
  Users: <Users className="w-8 h-8 text-[#E61E32]" />,
};

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | ${siteConfig.name}`,
    description: service.shortDesc,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Related services (exclude current)
  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-250">
      {/* Service Hero Header */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-neutral-50 via-white to-white dark:from-neutral-950 dark:via-black dark:to-black border-b border-neutral-100 dark:border-neutral-800 transition-colors duration-250">
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -top-40 right-1/4 w-[600px] h-[350px] bg-[#E61E32]/8 dark:bg-[#E61E32]/12 blur-3xl rounded-full" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-6 font-medium">
            <Link href="/" className="hover:text-[#E61E32] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <Link href="/#services" className="hover:text-[#E61E32] transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-black dark:text-white font-semibold">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-black dark:text-white text-xs font-bold uppercase tracking-wider">
                Enterprise Practice Area
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black dark:text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#E61E32] font-semibold">
                {service.subtitle}
              </p>

              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-normal">
                {service.longDesc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  href={`/quote?service=${service.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#E61E32] hover:bg-[#C81426] shadow-md shadow-[#E61E32]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Request Architectural Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#consultation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-black dark:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 transition-colors hover:border-[#E61E32] dark:hover:border-[#E61E32]"
                >
                  <span>Book Discovery Call</span>
                </a>
              </div>
            </div>

            {/* Right KPI Metrics Box */}
            <div className="lg:col-span-4 bg-white dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors duration-250">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-12 h-12 rounded-xl bg-[#FDE8EA] dark:bg-[#E61E32]/15 flex items-center justify-center">
                  {iconMap[service.iconName] || <Server className="w-6 h-6 text-[#E61E32]" />}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-neutral-400">Benchmark Metrics</div>
                  <div className="text-sm font-bold text-black dark:text-white">{service.title} SLA</div>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                {service.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800">
                    <div className="text-2xl font-extrabold text-black dark:text-white">{metric.value}</div>
                    <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mt-0.5">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technical Offerings */}
      <section className="py-16 lg:py-24 bg-white dark:bg-black transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E61E32]">
              Detailed Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
              Core Practice Offerings
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Structured architectural modules engineered for reliability, security, and measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {service.offerings.map((offering, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#E61E32] dark:hover:border-[#E61E32] hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm mb-5">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                    {offering.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">
                    {offering.description}
                  </p>

                  {offering.points && offering.points.length > 0 && (
                    <div className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                      {offering.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E61E32] shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Deliverables & Technologies Strip */}
      <section className="py-16 bg-neutral-50 dark:bg-black/90 border-y border-neutral-200 dark:border-neutral-800 transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Key Deliverables */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E61E32]">What You Receive</span>
                <h3 className="text-2xl font-bold text-black dark:text-white mt-1">Guaranteed Technical Deliverables</h3>
              </div>
              <div className="space-y-3">
                {service.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Technologies */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E61E32]">Toolchain & Standards</span>
                <h3 className="text-2xl font-bold text-black dark:text-white mt-1">Certified Frameworks & Stacks</h3>
              </div>
              <div className="bg-white dark:bg-[#0D0D0D] border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Our engineers utilize industry-standard, production-vetted technologies to ensure vendor neutrality and maximum performance:
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FDE8EA] dark:bg-[#E61E32]/15 border border-[#E61E32]/20 text-xs font-bold text-black dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-black transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E61E32]">The iForge Advantage</span>
            <h2 className="text-3xl font-extrabold text-black dark:text-white">Measurable Enterprise Benefits</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, bIdx) => (
              <div
                key={bIdx}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 hover:border-[#E61E32] dark:hover:border-[#E61E32] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FDE8EA] dark:bg-[#E61E32]/15 flex items-center justify-center text-[#E61E32] mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-black dark:text-white mb-2">Benefit 0{bIdx + 1}</h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      <section className="py-16 bg-neutral-50 dark:bg-black/90 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-250">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-black dark:text-white text-xs font-bold">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <ServiceFaqAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* Embedded Discovery / Consultation Form */}
      <section id="consultation" className="py-16 lg:py-24 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-250">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-extrabold text-black dark:text-white">
              Schedule a {service.title} Architecture Consultation
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Speak directly with an iForge Principal Architect to scope requirements, review security posture, or request a proposal.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Complementary Services Carousel/Grid */}
      <section className="py-16 bg-neutral-50 dark:bg-black/90 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-black dark:text-white">Related Practice Areas</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Explore complementary capabilities</p>
            </div>
            <Link href="/#services" className="text-xs font-bold text-[#E61E32] hover:underline">
              View All Practices →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.id}
                href={`/services/${rel.slug}`}
                className="bg-white dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-[#E61E32] dark:hover:border-[#E61E32] hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FDE8EA] dark:bg-[#E61E32]/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[rel.iconName] || <Server className="w-5 h-5 text-[#E61E32]" />}
                </div>
                <h4 className="text-base font-bold text-black dark:text-white group-hover:text-[#E61E32] transition-colors mb-1">
                  {rel.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                  {rel.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
