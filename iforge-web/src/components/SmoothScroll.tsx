"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { getLenis, setLenis } from "@/lib/lenis";

const HEADER = 64; // fixed navbar height; anchor jumps land below it

/**
 * Lenis smooth scrolling for the public site. Wheel and trackpad input glide
 * instead of stepping; same-page anchor links (#services, #tracks…) ease to
 * their target and clear the navbar. Touch keeps native momentum, and anyone
 * who prefers reduced motion keeps plain scrolling.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: true,
      anchors: { offset: -HEADER },
    });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // On a route change, drop any glide still in flight from the old page and
  // pick up wherever the router left the scroll position.
  useEffect(() => {
    getLenis()?.scrollTo(window.scrollY, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
