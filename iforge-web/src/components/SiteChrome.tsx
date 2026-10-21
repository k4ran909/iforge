"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";

/**
 * Renders the public site chrome (nav + footer + page transitions) around the
 * page, but omits it on /admin routes so the admin panel gets a clean shell.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <main className="flex-1 w-full bg-background text-foreground">{children}</main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-background text-foreground transition-colors duration-250">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
