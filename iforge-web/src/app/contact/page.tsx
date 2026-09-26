import React from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/siteData";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  HelpCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: "Connect with certified iForge technical consultants. Rapid 2-hour response time guarantee for enterprise IT and cloud inquiries.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-250">
      {/* Contact Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-neutral-50 via-white to-white dark:from-neutral-950 dark:via-black dark:to-black border-b border-neutral-100 dark:border-neutral-800 transition-colors duration-250">
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -top-40 right-1/3 w-[600px] h-[350px] bg-[#E61E32]/8 dark:bg-[#E61E32]/12 blur-3xl rounded-full" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-black dark:text-white text-xs font-bold uppercase tracking-wider">
              Direct Engineering Inquiry
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white tracking-tight">
              Connect With Our Principal Architects
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Whether you need to scale cloud infrastructure, conduct a cybersecurity audit, deploy AI & ML models, or build custom enterprise applications — our team responds within 2 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Dual-Column Contact Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-black transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Channel Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E61E32]">
                  Direct Channels
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mt-1">
                  We are here to support your mission.
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  Reach out directly through phone or email, or complete the architectural intake form for an immediate consultation slot.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 hover:border-[#E61E32] dark:hover:border-[#E61E32] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-[#E61E32] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">Telephone Hotline</div>
                    <div className="text-base font-bold text-black dark:text-white group-hover:text-[#E61E32] transition-colors mt-0.5">
                      {siteConfig.phone}
                    </div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Monday – Friday, 9:00 AM – 7:00 PM IST</div>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 hover:border-[#E61E32] dark:hover:border-[#E61E32] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-[#E61E32] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">Email Inquiries</div>
                    <div className="text-base font-bold text-black dark:text-white group-hover:text-[#E61E32] transition-colors mt-0.5">
                      {siteConfig.contactEmail}
                    </div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Guaranteed response within 2 hours</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800">
                  <div className="w-12 h-12 rounded-xl bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-[#E61E32] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">Headquarters</div>
                    <div className="text-base font-bold text-black dark:text-white mt-0.5">
                      Noida, Uttar Pradesh, India
                    </div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Engineering Hub serving clients across USA, Europe & APAC</div>
                  </div>
                </div>
              </div>

              {/* SLA & Security Box */}
              <div className="p-6 rounded-2xl bg-black dark:bg-[#080808] text-white border border-neutral-800 space-y-3 relative overflow-hidden">
                <div 
                  aria-hidden="true" 
                  className="pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 bg-[#E61E32]/15 blur-2xl rounded-full" 
                />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#E61E32]" />
                  <span className="text-sm font-bold">Standard Client Guarantees</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-1.5 pl-1">
                  <li>• Mutual Non-Disclosure Agreement (NDA) prior to technical review</li>
                  <li>• Zero obligation initial architectural recommendations</li>
                  <li>• Dedicated Technical Lead assigned upon engagement</li>
                </ul>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="py-16 bg-neutral-50 dark:bg-black/90 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-250">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-black dark:text-white">
              Engagement Questions Answered
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Clear terms before you begin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-black dark:text-white mb-2">How fast can we start a project?</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Following our initial discovery session, we provide a detailed proposal and technical scope within 48 hours. Engineering kick-off occurs within 3 to 5 business days upon agreement.
              </p>
            </div>
            <div className="bg-white dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-black dark:text-white mb-2">Do you sign NDAs before initial discussions?</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Yes, absolutely. We provide a bilateral NDA covering all proprietary architectures, repositories, and technical requirements before any in-depth scoping calls.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
