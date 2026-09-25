import React from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData, siteConfig } from "@/data/siteData";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to accelerate your enterprise technology?
              </h3>
              <p className="mt-2 text-slate-300 text-sm sm:text-base">
                Connect with our certified IT consultants for cloud modernization, AI adoption, or dedicated staffing.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-950 transition-all hover:scale-105"
              >
                Request a Proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block relative h-10 w-40">
              <Image
                src="/images/cropped-iforge-Logo1-Copy-1.png"
                alt="iForge Technologies"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              iForge Technologies delivers end-to-end IT services, cloud architecture, enterprise AI advisory, robust cybersecurity, and scalable talent solutions for evolving organizations.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Certified Partner: AWS, Google Cloud, VMware</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-blue-400 transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              IT Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesData.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-blue-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesData.slice(4).map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-blue-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-500 shrink-0" />
            <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white transition-colors">
              {siteConfig.contactEmail}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-cyan-500 shrink-0" />
            <span>India (Serving Clients Worldwide)</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Business Inquiries: Mon - Fri</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-400">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
