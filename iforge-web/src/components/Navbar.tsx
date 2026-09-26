"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Phone, 
  Mail, 
  Sparkles,
  Cloud,
  Server,
  ShieldCheck,
  BrainCircuit,
  Code2
} from "lucide-react";
import { siteConfig, servicesData } from "@/data/siteData";
import ThemeToggle from "./ThemeToggle";

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-4 h-4 text-[#E61E32]" />,
  Cloud: <Cloud className="w-4 h-4 text-[#E61E32]" />,
  Server: <Server className="w-4 h-4 text-black dark:text-white" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-3">
        <div 
          className={`max-w-7xl mx-auto transition-all duration-300 ${
            scrolled 
              ? "bg-white/95 dark:bg-black/90 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800 shadow-lg shadow-black/5 dark:shadow-black/50 rounded-2xl px-4 sm:px-6 py-2.5" 
              : "px-0 py-1"
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
                  className="object-contain object-left transition-transform group-hover:scale-105 dark:brightness-110" 
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
                    ? "text-black dark:text-white font-bold bg-neutral-100 dark:bg-neutral-800" 
                    : "text-neutral-700 dark:text-neutral-300 hover:text-[#E61E32] dark:hover:text-[#E61E32] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/60"
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
                      ? "text-black dark:text-white font-bold bg-neutral-100 dark:bg-neutral-800" 
                      : "text-neutral-700 dark:text-neutral-300 hover:text-[#E61E32] dark:hover:text-[#E61E32] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/60"
                  }`}
                  onClick={() => setServicesOpen((prev) => !prev)}
                  aria-expanded={servicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-[#E61E32]" : ""}`} />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="w-[620px] bg-white dark:bg-[#0D0D0D] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/60 p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      {servicesData.map((s) => {
                        const isAppDev = s.id === "application-development";
                        return (
                          <Link
                            key={s.id}
                            href={`/services/${s.slug}`}
                            className={`flex items-start gap-3 rounded-xl transition-all group ${
                              isAppDev
                                ? "col-span-2 bg-[#FBFBFB] dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 hover:border-[#E61E32]/50 hover:bg-[#FDE8EA]/30 dark:hover:bg-[#E61E32]/10 p-3"
                                : "hover:bg-neutral-50 dark:hover:bg-neutral-900/80 p-2.5"
                            }`}
                            onClick={() => setServicesOpen(false)}
                          >
                            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-[#FDE8EA] dark:group-hover:bg-[#E61E32]/20 transition-colors shrink-0">
                              {iconMap[s.iconName] || <Server className="w-4 h-4 text-[#E61E32]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-black dark:text-white group-hover:text-[#E61E32] transition-colors">
                                  {s.title}
                                </span>
                                {isAppDev && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/20 text-[#E61E32]">
                                    Web • Dashboards • SaaS • Mobile
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                                {s.shortDesc}
                              </div>
                            </div>
                            {isAppDev && (
                              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#E61E32] transition-transform group-hover:translate-x-1 shrink-0 self-center" />
                            )}
                          </Link>
                        );
                      })}

                      {/* Mega-menu footer strip */}
                      <div className="col-span-2 mt-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-2">
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
                    ? "text-black dark:text-white font-bold bg-neutral-100 dark:bg-neutral-800" 
                    : "text-neutral-700 dark:text-neutral-300 hover:text-[#E61E32] dark:hover:text-[#E61E32] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/60"
                }`}
              >
                <span>Community</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/20 text-[#E61E32]">
                  12k+
                </span>
              </Link>

              <Link 
                href="/about" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/about") 
                    ? "text-black dark:text-white font-bold bg-neutral-100 dark:bg-neutral-800" 
                    : "text-neutral-700 dark:text-neutral-300 hover:text-[#E61E32] dark:hover:text-[#E61E32] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/60"
                }`}
              >
                About Us
              </Link>

              <Link 
                href="/contact" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/contact") 
                    ? "text-black dark:text-white font-bold bg-neutral-100 dark:bg-neutral-800" 
                    : "text-neutral-700 dark:text-neutral-300 hover:text-[#E61E32] dark:hover:text-[#E61E32] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/60"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />

              <a 
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} 
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#E61E32] px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#FDE8EA] dark:bg-[#E61E32]/20 flex items-center justify-center text-[#E61E32]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{siteConfig.phone}</span>
              </a>

              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#E61E32] hover:bg-[#C81426] shadow-md shadow-[#E61E32]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Actions */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/quote"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#E61E32]"
              >
                Quote
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-4 top-20 bg-white/98 dark:bg-black/98 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200 z-50 backdrop-blur-lg">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive("/") 
                    ? "bg-[#FDE8EA] dark:bg-[#E61E32]/20 text-[#E61E32] font-semibold" 
                    : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180 text-[#E61E32]" : ""}`} />
                </button>
                {servicesOpen && (
                  <div className="mt-1 pl-3 pr-1 py-1 space-y-1 bg-neutral-50/80 dark:bg-neutral-900/80 rounded-xl">
                    {servicesData.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-[#E61E32] hover:bg-white dark:hover:bg-neutral-800 transition-colors"
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
                  isActive("/community") 
                    ? "bg-[#FDE8EA] dark:bg-[#E61E32]/20 text-[#E61E32] font-semibold" 
                    : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"
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
                  isActive("/about") 
                    ? "bg-[#FDE8EA] dark:bg-[#E61E32]/20 text-[#E61E32] font-semibold" 
                    : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive("/contact") 
                    ? "bg-[#FDE8EA] dark:bg-[#E61E32]/20 text-[#E61E32] font-semibold" 
                    : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
              >
                Contact
              </Link>
            </nav>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200"
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
