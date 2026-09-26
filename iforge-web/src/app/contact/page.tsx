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
  MessageSquare, 
  Sparkles,
  HelpCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: "Connect with certified iForge technical consultants. Rapid 2-hour response time guarantee for enterprise IT and cloud inquiries.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      {/* Contact Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-neutral-50 via-white to-white border-b border-neutral-100">
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -top-40 right-1/3 w-[600px] h-[350px] bg-[#E61E32]/8 blur-3xl rounded-full" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDE8EA] text-black text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-[#E61E32]" />
              Direct Engineering Inquiry
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">
              Connect With Our Principal Architects
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Whether you need to scale cloud infrastructure, conduct a cybersecurity audit, deploy AI & ML models, or build custom enterprise applications — our team responds within 2 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Dual-Column Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Channel Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E61E32]">
                  Direct Channels
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-black mt-1">
                  We are here to support your mission.
                </h2>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  Reach out directly through phone or email, or complete the architectural intake form for an immediate consultation slot.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-[#E61E32] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FDE8EA] text-[#E61E32] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 uppercase">Telephone Hotline</div>
                    <div className="text-base font-bold text-black group-hover:text-[#E61E32] transition-colors mt-0.5">
                      {siteConfig.phone}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Monday – Friday, 9:00 AM – 7:00 PM IST</div>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-[#E61E32] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FDE8EA] text-[#E61E32] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 uppercase">Email Inquiries</div>
                    <div className="text-base font-bold text-black group-hover:text-[#E61E32] transition-colors mt-0.5">
                      {siteConfig.contactEmail}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Guaranteed response within 2 hours</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="w-12 h-12 rounded-xl bg-[#FDE8EA] text-[#E61E32] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 uppercase">Headquarters</div>
                    <div className="text-base font-bold text-black mt-0.5">
                      Noida, Uttar Pradesh, India
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Engineering Hub serving clients across USA, Europe & APAC</div>
                  </div>
                </div>
              </div>

              {/* SLA & Security Box */}
              <div className="p-6 rounded-2xl bg-black text-white border border-neutral-800 space-y-3 relative overflow-hidden">
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
      <section className="py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-black">
              Engagement Questions Answered
            </h3>
            <p className="text-xs text-neutral-500">
              Clear terms before you begin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-black mb-2">How fast can we start a project?</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Following our initial discovery session, we provide a detailed proposal and technical scope within 48 hours. Engineering kick-off occurs within 3 to 5 business days upon agreement.
              </p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-black mb-2">Do you sign NDAs before initial discussions?</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Yes, absolutely. We provide a bilateral NDA covering all proprietary architectures, repositories, and technical requirements before any in-depth scoping calls.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
