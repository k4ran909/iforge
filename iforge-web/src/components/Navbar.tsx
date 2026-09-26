"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { servicesData, siteConfig } from "@/data/siteData";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Phone,
  BrainCircuit, 
  Cloud, 
  Server, 
  ShieldCheck, 
  Code2, 
  Sparkles
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-4 h-4 text-[#E61E32]" />,
  Cloud: <Cloud className="w-4 h-4 text-[#E61E32]" />,
  Server: <Server className="w-4 h-4 text-black" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-[#E61E32]" />,
  Code2: <Code2 className="w-4 h-4 text-[#E61E32]" />,
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "py-2.5 px-4 sm:px-6" 
            : "py-4 px-4 sm:px-8"
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto transition-all duration-300 ${
            scrolled 
              ? "bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-black/5 rounded-2xl px-4 sm:px-6 py-2.5" 
              : "px-0"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative h-9 w-32 sm:h-10 sm:w-36">
                <Image 
                  src="/images/iforge-logo1.png" 
                  alt={siteConfig.name} 
                  fill 
                  sizes="(max-width: 640px) 128px, 144px"
                  className="object-contain object-left transition-transform group-hover:scale-105" 
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/") 
                    ? "text-black font-bold bg-slate-100" 
                    : "text-[#262626] hover:text-[#E61E32] hover:bg-slate-50/80"
                }`}
              >
                Home
              </Link>

              {/* Services Mega Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button 
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    pathname.startsWith("/services") 
                      ? "text-black font-bold bg-slate-100" 
                      : "text-[#262626] hover:text-[#E61E32] hover:bg-slate-50/80"
                  }`}
                  onClick={() => setServicesOpen((prev) => !prev)}
                  aria-expanded={servicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-[#E61E32]" : ""}`} />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="w-[620px] bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-black/10 p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      {servicesData.map((s) => {
                        const isAppDev = s.id === "application-development";
                        return (
                          <Link
                            key={s.id}
                            href={`/services/${s.slug}`}
                            className={`flex items-start gap-3 rounded-xl transition-all group ${
                              isAppDev
                                ? "col-span-2 bg-[#FBFBFB] border border-slate-200/80 hover:border-[#E61E32]/50 hover:bg-[#FDE8EA]/30 p-3"
                                : "hover:bg-slate-50 p-2.5"
                            }`}
                            onClick={() => setServicesOpen(false)}
                          >
                            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#FDE8EA] transition-colors shrink-0">
                              {iconMap[s.iconName] || <Server className="w-4 h-4 text-[#E61E32]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-black group-hover:text-[#E61E32] transition-colors">
                                  {s.title}
                                </span>
                                {isAppDev && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#FDE8EA] text-[#E61E32]">
                                    Web • Dashboards • SaaS • Mobile
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {s.shortDesc}
                              </div>
                            </div>
                            {isAppDev && (
                              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#E61E32] transition-transform group-hover:translate-x-1 shrink-0 self-center" />
                            )}
                          </Link>
                        );
                      })}

                      {/* Mega-menu footer strip */}
                      <div className="col-span-2 mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-[#E61E32]" />
                          Need tailored enterprise IT solutions?
                        </span>
                        <Link
                          href="/quote"
                          onClick={() => setServicesOpen(false)}
                          className="font-semibold text-[#E61E32] hover:text-[#C81426] inline-flex items-center gap-1"
                        >
                          <span>Calculate project estimate</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/community" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-1.5 ${
                  isActive("/community") 
                    ? "text-black font-bold bg-slate-100" 
                    : "text-[#262626] hover:text-[#E61E32] hover:bg-slate-50/80"
                }`}
              >
                <span>Community</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#FDE8EA] text-[#E61E32]">
                  12k+
                </span>
              </Link>

              <Link 
                href="/about" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/about") 
                    ? "text-black font-bold bg-slate-100" 
                    : "text-[#262626] hover:text-[#E61E32] hover:bg-slate-50/80"
                }`}
              >
                About Us
              </Link>

              <Link 
                href="/contact" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/contact") 
                    ? "text-black font-bold bg-slate-100" 
                    : "text-[#262626] hover:text-[#E61E32] hover:bg-slate-50/80"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} 
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#262626] hover:text-[#E61E32] px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#FDE8EA] flex items-center justify-center text-[#E61E32]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{siteConfig.phone}</span>
              </a>

              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#E61E32] hover:bg-[#C81426] shadow-md shadow-[#E61E32]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/quote"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#E61E32]"
              >
                Quote
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-[#262626] hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-4 top-20 bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200 z-50">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive("/") ? "bg-[#FDE8EA] text-[#E61E32] font-semibold" : "text-[#262626] hover:bg-slate-50"
                }`}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-[#262626] hover:bg-slate-50"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180 text-[#E61E32]" : ""}`} />
                </button>
                {servicesOpen && (
                  <div className="mt-1 pl-3 pr-1 py-1 space-y-1 bg-slate-50/70 rounded-xl">
                    {servicesData.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#E61E32] hover:bg-white transition-colors"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/community"
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                  isActive("/community") ? "bg-[#FDE8EA] text-[#E61E32] font-semibold" : "text-[#262626] hover:bg-slate-50"
                }`}
              >
                <span>Builders Community</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#E61E32] text-white">
                  12,000+
                </span>
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive("/about") ? "bg-[#FDE8EA] text-[#E61E32] font-semibold" : "text-[#262626] hover:bg-slate-50"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive("/contact") ? "bg-[#FDE8EA] text-[#E61E32] font-semibold" : "text-[#262626] hover:bg-slate-50"
                }`}
              >
                Contact
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-[#262626]"
              >
                <Phone className="w-3.5 h-3.5 text-[#E61E32]" />
                <span>Call {siteConfig.phone}</span>
              </a>
              <Link
                href="/quote"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#E61E32] text-white text-xs font-semibold shadow-md shadow-[#E61E32]/20"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so fixed header doesn't cover top page content */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
