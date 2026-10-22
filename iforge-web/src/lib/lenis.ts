import type Lenis from "lenis";

// The page's single Lenis instance, so other components (the section rail, the
// mobile menu) can scroll or pause it without threading props through. Null
// when smooth scrolling is off (reduced motion, admin pages).
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
