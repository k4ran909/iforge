import React from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData, siteConfig } from "@/data/siteData";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-slate-300 border-t border-neutral-900">
      {/* Top Pre-Footer CTA Banner */}
      <div className="bg-gradient-to-r from-black via-neutral-950 to-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3">
                <span>Accelerate Your Digital Evolution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Ready to engineer resilient enterprise systems?
              </h3>
              <p className="mt-2 text-neutral-300 text-sm sm:text-base leading-relaxed">
                Partner with certified IT consultants for cloud modernization, AI & ML deployment, zero-trust cybersecurity, or custom enterprise applications.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#E61E32] hover:bg-[#C81426] shadow-lg shadow-[#E61E32]/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Calculate Project Scope</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                <span>Contact Leadership</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Alliances */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block relative h-10 w-40">
              <Image
                src="/images/iforge-logo1.png"
                alt={siteConfig.name}
                fill
                sizes="160px"
                className="object-contain object-left brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              iForge Technologies delivers end-to-end enterprise IT consultancy, multi-cloud architecture, AI & ML engineering, robust cybersecurity, and bespoke application development.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Enterprise Standards & Assurances
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {["Zero-Trust Security", "Multi-Cloud Resiliency", "SOC 2 Type II", "24/7 Rapid SLA", "ISO 27001"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Practices
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <Link 
                    href={`/services/${s.slug}`} 
                    className="text-neutral-400 hover:text-[#E61E32] transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Platform */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform & Community
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  href="/community" 
                  className="text-white hover:text-[#E61E32] font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Builders Community</span>
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-[#E61E32] text-white font-bold">12k+</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/quote" 
                  className="text-neutral-400 hover:text-[#E61E32] transition-colors"
                >
                  Project Cost Calculator
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/cloud-services" 
                  className="text-neutral-400 hover:text-[#E61E32] transition-colors"
                >
                  Cloud Migration Blueprint
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/application-development" 
                  className="text-neutral-400 hover:text-[#E61E32] transition-colors"
                >
                  Enterprise Dashboards & Apps
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/cybersecurity-services" 
                  className="text-neutral-400 hover:text-[#E61E32] transition-colors"
                >
                  VAPT & SOC 2 Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-[#E61E32] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-neutral-400 hover:text-[#E61E32] transition-colors">
                  Project Estimator
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-[#E61E32] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="text-neutral-400 hover:text-[#E61E32] transition-colors">
                  Direct Line: {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-neutral-400 hover:text-[#E61E32] transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Location & SLA Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#E61E32] shrink-0" />
            <span>Inquiries: <a href={`mailto:${siteConfig.contactEmail}`} className="text-white hover:underline">{siteConfig.contactEmail}</a></span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#E61E32] shrink-0" />
            <span>Engineering Hub: Noida, India (Serving Global Clients)</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#E61E32] shrink-0" />
            <span>24/7 Operations: NOC & SOC Support Commitment</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">Security Standards</Link>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">SLA Commitments</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
