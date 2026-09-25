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
  TrendingUp, 
  Users,
  Compass,
  Sparkles
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-4 h-4 text-[#1783C1]" />,
  Cloud: <Cloud className="w-4 h-4 text-[#1783C1]" />,
  Server: <Server className="w-4 h-4 text-[#0A3C6E]" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
  Code2: <Code2 className="w-4 h-4 text-indigo-600" />,
  TrendingUp: <TrendingUp className="w-4 h-4 text-amber-600" />,
  Users: <Users className="w-4 h-4 text-rose-600" />,
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
              ? "bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-slate-900/5 rounded-2xl px-4 sm:px-6 py-2.5" 
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
                    ? "text-[#0A3C6E] font-semibold bg-slate-50" 
                    : "text-[#333333] hover:text-[#1783C1] hover:bg-slate-50/80"
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
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname.startsWith("/services") 
                      ? "text-[#0A3C6E] font-semibold bg-slate-50" 
                      : "text-[#333333] hover:text-[#1783C1] hover:bg-slate-50/80"
                  }`}
                  onClick={() => setServicesOpen((prev) => !prev)}
                  aria-expanded={servicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-[#1783C1]" : ""}`} />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="w-[620px] bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      {servicesData.map((s) => (
                        <Link
                          key={s.id}
                          href={`/services/${s.slug}`}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                          onClick={() => setServicesOpen(false)}
                        >
                          <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#E8F4FC] transition-colors shrink-0">
                            {iconMap[s.iconName] || <Server className="w-4 h-4 text-[#1783C1]" />}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#333333] group-hover:text-[#1783C1] transition-colors">
                              {s.title}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {s.shortDesc}
                            </div>
                          </div>
                        </Link>
                      ))}

                      {/* Mega-menu footer strip */}
                      <div className="col-span-2 mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-[#1783C1]" />
                          Need tailored enterprise IT solutions?
                        </span>
                        <Link
                          href="/quote"
                          onClick={() => setServicesOpen(false)}
                          className="font-semibold text-[#1783C1] hover:text-[#136FA5] inline-flex items-center gap-1"
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
                    ? "text-[#0A3C6E] font-semibold bg-slate-50" 
                    : "text-[#333333] hover:text-[#1783C1] hover:bg-slate-50/80"
                }`}
              >
                <span>Community</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#E8F4FC] text-[#1783C1]">
                  12k+
                </span>
              </Link>

              <Link 
                href="/about" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/about") 
                    ? "text-[#0A3C6E] font-semibold bg-slate-50" 
                    : "text-[#333333] hover:text-[#1783C1] hover:bg-slate-50/80"
                }`}
              >
                About Us
              </Link>

              <Link 
                href="/contact" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/contact") 
                    ? "text-[#0A3C6E] font-semibold bg-slate-50" 
                    : "text-[#333333] hover:text-[#1783C1] hover:bg-slate-50/80"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} 
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#333333] hover:text-[#1783C1] px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#E8F4FC] flex items-center justify-center text-[#1783C1]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{siteConfig.phone}</span>
              </a>

              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-md shadow-[#1783C1]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/quote"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#1783C1]"
              >
                Quote
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-[#333333] hover:bg-slate-100 transition-colors"
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
                  isActive("/") ? "bg-[#E8F4FC] text-[#0A3C6E] font-semibold" : "text-[#333333] hover:bg-slate-50"
                }`}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-[#333333] hover:bg-slate-50"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180 text-[#1783C1]" : ""}`} />
                </button>
                {servicesOpen && (
                  <div className="mt-1 pl-3 pr-1 py-1 space-y-1 bg-slate-50/70 rounded-xl">
                    {servicesData.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#1783C1] hover:bg-white transition-colors"
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
                  isActive("/community") ? "bg-[#E8F4FC] text-[#0A3C6E] font-semibold" : "text-[#333333] hover:bg-slate-50"
                }`}
              >
                <span>Builders Community</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#1783C1] text-white">
                  12,000+
                </span>
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive("/about") ? "bg-[#E8F4FC] text-[#0A3C6E] font-semibold" : "text-[#333333] hover:bg-slate-50"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive("/contact") ? "bg-[#E8F4FC] text-[#0A3C6E] font-semibold" : "text-[#333333] hover:bg-slate-50"
                }`}
              >
                Contact
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-[#333333]"
              >
                <Phone className="w-3.5 h-3.5 text-[#1783C1]" />
                <span>Call {siteConfig.phone}</span>
              </a>
              <Link
                href="/quote"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#1783C1] text-white text-xs font-semibold shadow-md shadow-[#1783C1]/20"
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
