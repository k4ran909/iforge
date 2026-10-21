"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { siteConfig, servicesData } from "@/data/siteData";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-hairline"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-page">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Brand */}
            <Link href="/" className="group flex items-center gap-2.5 shrink-0">
              <div className="relative h-7 w-7">
                <Image
                  src="/images/iforge-logo2.png"
                  alt={siteConfig.name}
                  fill
                  sizes="28px"
                  className="object-contain transition-transform duration-300 group-hover:rotate-[-8deg]"
                  priority
                />
              </div>
              <span className="text-lg font-black tracking-tight text-foreground lowercase">
                iforge
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[0.8125rem] font-medium">
              <Link
                href="/"
                className={`relative tracking-wide transition-colors hover:text-foreground ${
                  isActive("/") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Home
                {isActive("/") && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-[22px] left-0 right-0 h-px bg-[#E61E32]"
                  />
                )}
              </Link>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className={`relative inline-flex items-center gap-1 tracking-wide transition-colors hover:text-foreground ${
                    pathname.startsWith("/services") ? "text-foreground" : "text-muted-foreground"
                  }`}
                  aria-expanded={servicesOpen}
                >
                  Services
                  <span className={`text-[0.6rem] transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                  {pathname.startsWith("/services") && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-[22px] left-0 right-0 h-px bg-[#E61E32]"
                    />
                  )}
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                    >
                      <div className="w-[460px] border border-hairline bg-card p-2 shadow-xl shadow-black/5 dark:shadow-black/40">
                        {servicesData.map((s, i) => (
                          <Link
                            key={s.id}
                            href={`/services/${s.slug}`}
                            className="group flex items-start gap-4 p-3.5 transition-colors hover:bg-muted"
                          >
                            <span className="mt-0.5 font-mono text-[0.65rem] tabular-nums text-[#E61E32]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                {s.title}
                                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground line-clamp-1">
                                {s.shortDesc}
                              </span>
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/quote"
                          className="mt-1 flex items-center justify-between border-t border-hairline px-3.5 pt-3 pb-2 text-xs font-medium text-muted-foreground hover:text-[#E61E32]"
                        >
                          <span>Need a tailored estimate?</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-[#E61E32]">
                            Get a quote <ArrowRight className="h-3 w-3" />
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.filter((l) => l.href !== "/").map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative tracking-wide transition-colors hover:text-foreground ${
                    isActive(l.href) ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-[22px] left-0 right-0 h-px bg-[#E61E32]"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-[0.8125rem] font-semibold text-background transition-colors hover:bg-[#E61E32]"
              >
                Get a Quote
                <ArrowRight className="h-3.5 w-3.5 arrow-nudge" />
              </Link>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-foreground"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="container-page flex h-full flex-col pt-24 pb-10">
              <nav className="flex flex-col divide-y divide-hairline border-y border-hairline">
                {[{ href: "/", label: "Home" }, ...servicesData.map((s) => ({ href: `/services/${s.slug}`, label: s.title })), ...NAV_LINKS.filter((l) => l.href !== "/")].map(
                  (l, i) => (
                    <motion.div
                      key={l.href + l.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={l.href}
                        className="flex items-center justify-between py-4 text-xl font-semibold tracking-tight text-foreground"
                      >
                        {l.label}
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              <div className="mt-auto space-y-3">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-2 border border-hairline py-3.5 text-sm font-semibold text-foreground"
                >
                  Call {siteConfig.phone}
                </a>
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 bg-[#E61E32] py-3.5 text-sm font-semibold text-white"
                >
                  Request a Proposal <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for the fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
