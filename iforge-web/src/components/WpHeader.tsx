"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Database,
  Cloud,
  Server,
  ShieldCheck,
  Code2,
  TrendingUp,
  Users2,
  ArrowRight,
  Compass,
} from "lucide-react";
import "./HeaderAndDock.css";

const servicesList = [
  {
    title: "Data & AI",
    desc: "AI-driven analytics & predictive insights",
    href: "/services/data-ai",
    icon: Database,
    color: "#2563eb",
    bgColor: "#eff6ff",
  },
  {
    title: "Cloud Services",
    desc: "Scalable multi-cloud architecture & migration",
    href: "/services/cloud-services",
    icon: Cloud,
    color: "#0284c7",
    bgColor: "#f0f9ff",
  },
  {
    title: "IT Infrastructure",
    desc: "Enterprise networks, hardware & 24/7 reliability",
    href: "/services/it-infrastructure",
    icon: Server,
    color: "#4f46e5",
    bgColor: "#eef2ff",
  },
  {
    title: "Cybersecurity",
    desc: "Threat detection, audits & zero-trust defense",
    href: "/services/cybersecurity-services",
    icon: ShieldCheck,
    color: "#059669",
    bgColor: "#ecfdf5",
  },
  {
    title: "Web Development",
    desc: "Lightning-fast modern web applications",
    href: "/services/web-development",
    icon: Code2,
    color: "#7c3aed",
    bgColor: "#f5f3ff",
  },
  {
    title: "Digital Marketing",
    desc: "Targeted campaigns, SEO & data-driven growth",
    href: "/services/digital-marketing",
    icon: TrendingUp,
    color: "#d97706",
    bgColor: "#fffbeb",
  },
  {
    title: "Staffing Solutions",
    desc: "Specialized tech recruitment & team scaling",
    href: "/services/staffing-solutions",
    icon: Users2,
    color: "#e11d48",
    bgColor: "#fff1f2",
  },
  {
    title: "Custom Solutions",
    desc: "Tailored IT architecture, advisory & proposal",
    href: "/quote",
    icon: Compass,
    color: "#0284c7",
    bgColor: "#f0f9ff",
  },
];

export default function WpHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // Morph into floating glass island after scrolling 20px
          setIsScrolled(currentY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`iforge-header-fixed ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="iforge-header-inner">
          {/* Logo */}
          <Link href="/" className="iforge-header-logo">
            <Image
              src="/images/iforge-logo1.png"
              alt="iForge Technologies"
              width={118}
              height={38}
              priority
              style={{ height: "36px", width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="iforge-header-nav">
            <Link
              href="/"
              className={`iforge-nav-link ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="iforge-dropdown-wrapper"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className={`iforge-nav-link ${
                  pathname.startsWith("/services") ? "active" : ""
                } ${servicesOpen ? "is-open" : ""}`}
                onClick={() => setServicesOpen((prev) => !prev)}
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  style={{
                    width: 14,
                    height: 14,
                    transition: "transform 0.2s ease",
                    transform: servicesOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </button>

              {servicesOpen && (
                <div className="iforge-dropdown-menu">
                  {servicesList.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="iforge-dropdown-item"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div
                          className="iforge-dropdown-icon"
                          style={{
                            backgroundColor: service.bgColor,
                            color: service.color,
                          }}
                        >
                          <Icon style={{ width: 16, height: 16 }} />
                        </div>
                        <div>
                          <div className="iforge-dropdown-title">
                            {service.title}
                          </div>
                          <div className="iforge-dropdown-desc">
                            {service.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <div
                    style={{
                      gridColumn: "span 2",
                      marginTop: 4,
                      paddingTop: 8,
                      borderTop: "1px solid #f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#64748b",
                    }}
                  >
                    <span>Need customized enterprise IT?</span>
                    <Link
                      href="/quote"
                      onClick={() => setServicesOpen(false)}
                      style={{
                        color: "#0284c7",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        textDecoration: "none",
                      }}
                    >
                      Calculate quote <ArrowRight style={{ width: 12, height: 12 }} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/#insights" className="iforge-nav-link">
              Insights
            </Link>

            <Link
              href="/about"
              className={`iforge-nav-link ${isActive("/about") ? "active" : ""}`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`iforge-nav-link ${isActive("/contact") ? "active" : ""}`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="iforge-header-actions">
            <a href="tel:9971866720" className="iforge-header-phone">
              <Phone style={{ width: 14, height: 14, color: "#0284c7" }} />
              <span>+91 99718 66720</span>
            </a>

            <Link href="/quote" className="iforge-header-btn">
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="iforge-mobile-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X style={{ width: 22, height: 22 }} />
            ) : (
              <Menu style={{ width: 22, height: 22 }} />
            )}
          </button>
        </div>

        {/* Mobile Slide-Down Drawer */}
        <div className={`iforge-mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: isActive("/") ? 600 : 500 }}
          >
            Home
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "10px 14px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#0f172a",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <span>Services</span>
              <ChevronDown
                style={{
                  width: 14,
                  height: 14,
                  transform: mobileServicesOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            {mobileServicesOpen && (
              <div
                style={{
                  paddingLeft: 16,
                  backgroundColor: "#f8fafc",
                  borderRadius: 8,
                  margin: "4px 0",
                }}
              >
                {servicesList.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "8px 10px",
                      fontSize: "13px",
                      color: "#475569",
                      textDecoration: "none",
                    }}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#insights" onClick={() => setMobileMenuOpen(false)}>
            Insights
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: isActive("/about") ? 600 : 500 }}
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: isActive("/contact") ? 600 : 500 }}
          >
            Contact
          </Link>

          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <a
              href="tel:9971866720"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "10px",
                backgroundColor: "#f1f5f9",
                borderRadius: 8,
                fontSize: "13px",
                fontWeight: 600,
                color: "#334155",
                textDecoration: "none",
              }}
            >
              <Phone style={{ width: 14, height: 14, color: "#10b981" }} />
              <span>Call +91 99718 66720</span>
            </a>
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="iforge-header-btn"
              style={{ justifyContent: "center" }}
            >
              <span>Request an Estimate</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Dynamic Spacer so fixed header doesn't cover top page content */}
      <div className="iforge-header-spacer" aria-hidden="true" />
    </>
  );
}
