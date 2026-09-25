import React from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData, siteConfig, partnerLogos } from "@/data/siteData";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#072648] text-slate-300 border-t border-slate-800">
      {/* Top Pre-Footer CTA Banner in Deep Navy */}
      <div className="bg-gradient-to-r from-[#0A3C6E] via-[#0D4B8A] to-[#0A3C6E] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Accelerate Your Digital Evolution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Ready to engineer resilient enterprise systems?
              </h3>
              <p className="mt-2 text-slate-200 text-sm sm:text-base leading-relaxed">
                Partner with certified IT consultants for cloud modernization, enterprise AI advisory, zero-trust cybersecurity, or dedicated tech talent.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-lg shadow-[#1783C1]/30 transition-all hover:scale-105 active:scale-95"
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
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              iForge Technologies delivers end-to-end enterprise IT consultancy, multi-cloud architecture, AI & ML engineering, robust cybersecurity, and bespoke application development.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Certified Partner Ecosystem
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {["AWS", "Google Cloud", "VMware", "Palo Alto", "Trend Micro"].map((partner) => (
                  <span
                    key={partner}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-200"
                  >
                    <ShieldCheck className="w-3 h-3 text-[#38bdf8]" />
                    {partner}
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
                    className="text-slate-300 hover:text-[#38bdf8] transition-colors"
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
                  className="text-[#38bdf8] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Builders Community</span>
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-[#1783C1] text-white">12k+</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/quote" 
                  className="text-slate-300 hover:text-[#38bdf8] transition-colors"
                >
                  Project Cost Calculator
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/cloud-services" 
                  className="text-slate-300 hover:text-[#38bdf8] transition-colors"
                >
                  Cloud Migration Blueprint
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/application-development" 
                  className="text-slate-300 hover:text-[#38bdf8] transition-colors"
                >
                  Enterprise Dashboards & Apps
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/cybersecurity-services" 
                  className="text-slate-300 hover:text-[#38bdf8] transition-colors"
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
                <Link href="/about" className="text-slate-300 hover:text-[#38bdf8] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-slate-300 hover:text-[#38bdf8] transition-colors">
                  Project Estimator
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-[#38bdf8] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="text-slate-300 hover:text-[#38bdf8] transition-colors">
                  Direct Line: {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-slate-300 hover:text-[#38bdf8] transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Location & SLA Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <span>Inquiries: <a href={`mailto:${siteConfig.contactEmail}`} className="text-white hover:underline">{siteConfig.contactEmail}</a></span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <span>Engineering Hub: Noida, India (Serving Global Clients)</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <span>24/7 Operations: NOC & SOC Support Commitment</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">Security Standards</Link>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">SLA Commitments</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
