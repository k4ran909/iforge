"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { servicesData } from "@/data/siteData";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  BrainCircuit, 
  Cloud, 
  Server, 
  ShieldCheck, 
  Code2, 
  TrendingUp, 
  Users 
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-5 h-5 text-blue-600" />,
  Cloud: <Cloud className="w-5 h-5 text-cyan-600" />,
  Server: <Server className="w-5 h-5 text-indigo-600" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  Code2: <Code2 className="w-5 h-5 text-violet-600" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-amber-600" />,
  Users: <Users className="w-5 h-5 text-rose-600" />,
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800/80 py-3" 
          : "bg-slate-950 border-b border-slate-800/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-36">
              <Image 
                src="/images/cropped-iforge-Logo1-Copy-1.png" 
                alt="iForge Technologies" 
                fill 
                className="object-contain object-left" 
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-blue-400 font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button 
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-2 ${
                  pathname.startsWith("/services") ? "text-blue-400 font-semibold" : "text-slate-300 hover:text-white"
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-blue-400" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {servicesData.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-slate-800/80 group-hover:bg-slate-700/80 transition-colors shrink-0">
                        {iconMap[s.iconName] || <Server className="w-5 h-5 text-blue-400" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                          {s.title}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {s.shortDesc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-blue-400 font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              About Us
            </Link>

            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-blue-400 font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-200">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-blue-400"
          >
            Home
          </Link>
          
          <div className="px-3 py-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Services
            </div>
            <div className="space-y-1 pl-2 border-l border-slate-800">
              {servicesData.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="block px-2 py-1.5 text-sm text-slate-300 hover:text-blue-400"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-blue-400"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-blue-400"
          >
            Contact
          </Link>

          <div className="pt-2">
            <Link
              href="/quote"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 shadow-md"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
