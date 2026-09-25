"use client";

import React, { useEffect } from "react";
import { footerHtml } from "@/data/htmlContent";
import { useRouter } from "next/navigation";

export default function WpFooter() {
  const router = useRouter();

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#") && href !== "#") {
        e.preventDefault();
        router.push(href);
      }
    };

    const footerEl = document.getElementById("colophon");
    if (footerEl) {
      footerEl.addEventListener("click", handleLinkClick);
    }

    return () => {
      if (footerEl) {
        footerEl.removeEventListener("click", handleLinkClick);
      }
    };
  }, [router]);

  return (
    <div 
      id="wp-footer-container"
      dangerouslySetInnerHTML={{ __html: footerHtml }} 
    />
  );
}
