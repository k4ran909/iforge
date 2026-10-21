"use client";

import React from "react";
import { usePathname } from "next/navigation";

/**
 * A numbered section rail that stands in for the scrollbar on desktop.
 *
 * Each top-level <section> on the page (plus the site footer) becomes a mark,
 * placed on the rail in proportion to where it sits in the document — so the
 * gaps between numbers mirror the page itself. A bright bar slides to the
 * section in view; clicking a number jumps to it. mix-blend-difference keeps
 * it legible over the dark hero, dark sections and the light theme alike.
 */

const MIN_GAP = 16; // px between numbers on the rail
const HEADER = 64; // fixed navbar height to clear when jumping

type Mark = { label: string; y: number };

/** Rail height — kept in step with the h-[min(32vh,240px)] class below. */
const railHeight = () => Math.min(window.innerHeight * 0.32, 240);

/** Top-level sections in the page, then the footer as the closing mark. */
function collectSections(): HTMLElement[] {
  const main = document.querySelector("main");
  const sections = main
    ? Array.from(main.querySelectorAll<HTMLElement>("section")).filter(
        (s) => !s.parentElement?.closest("section"),
      )
    : [];
  const end = document.querySelector<HTMLElement>("[data-rail-end]");
  return end ? [...sections, end] : sections;
}

function labelOf(el: HTMLElement, i: number): string {
  const heading = el.querySelector<HTMLElement>("h1, h2");
  // innerText turns <br> into a break, so "enterprise<br/>success" keeps its space.
  const text = (heading?.innerText || heading?.textContent || "").replace(/\s+/g, " ").trim();
  return text || `Section ${i + 1}`;
}

/**
 * Proportional positions spanning the whole rail — the first section sits at
 * the top end, the last at the bottom end, so the line never trails past the
 * numbers — then nudged apart so numbers never collide.
 */
function place(tops: number[], railH: number): number[] {
  const first = tops[0] ?? 0;
  const span = Math.max((tops[tops.length - 1] ?? 0) - first, 1);
  const ys = tops.map((t) => ((t - first) / span) * railH);
  for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + MIN_GAP);
  const last = ys.length - 1;
  if (last >= 0 && ys[last] > railH) {
    ys[last] = railH;
    for (let i = last - 1; i >= 0; i--) ys[i] = Math.min(ys[i], ys[i + 1] - MIN_GAP);
  }
  return ys.map((y) => Math.max(0, y));
}

const pageTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

export default function ScrollRail() {
  const pathname = usePathname();
  const [enabled, setEnabled] = React.useState(false);
  const [marks, setMarks] = React.useState<Mark[]>([]);
  const [active, setActive] = React.useState(0);
  const sections = React.useRef<HTMLElement[]>([]);

  // Only where there's a mouse and room: phones keep their overlay scrollbar.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The rail replaces the native scrollbar while it is showing.
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("has-scroll-rail", enabled);
    return () => root.classList.remove("has-scroll-rail");
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const track = () => {
      const list = sections.current;
      if (!list.length) return;
      const probe = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      list.forEach((el, i) => {
        if (pageTop(el) <= probe) idx = i;
      });
      // At the very bottom the last mark wins, even if its section is short.
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atEnd ? list.length - 1 : idx);
    };

    const measure = () => {
      const list = collectSections();
      sections.current = list;
      const ys = place(list.map(pageTop), railHeight());
      setMarks(list.map((el, i) => ({ label: labelOf(el, i), y: ys[i] })));
      track();
    };

    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          track();
        });
    };

    // Let the new route's content land before reading it.
    const settle = window.setTimeout(measure, 80);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(settle);
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [enabled, pathname]);

  const go = (i: number) => {
    const el = sections.current[i];
    if (!el) return;
    const top = i === 0 ? 0 : pageTop(el) - HEADER;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  };

  if (!enabled || marks.length < 2) return null;
  const activeY = marks[Math.min(active, marks.length - 1)]?.y ?? 0;

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed right-4 top-1/2 z-40 -translate-y-1/2 mix-blend-difference"
    >
      <div className="relative h-[min(32vh,240px)] w-7">
        {/* the rail */}
        <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-white/15" />
        {/* the active bar */}
        <span
          aria-hidden
          className="absolute -left-[0.5px] top-0 h-3.5 w-[2px] rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateY(${activeY - 7}px)` }}
        />
        {marks.map((m, i) => {
          const num = String(i + 1).padStart(2, "0");
          const isActive = i === active;
          return (
            <button
              key={num}
              type="button"
              onClick={() => go(i)}
              aria-label={`${num} — ${m.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group pointer-events-auto absolute left-0 flex -translate-y-1/2 items-center py-0.5"
              style={{ top: m.y }}
            >
              <span
                className={`pl-2.5 font-mono text-[9px] tabular-nums tracking-wider transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/30 group-hover:text-white/70"
                }`}
              >
                {num}
              </span>
              <span className="pointer-events-none absolute right-full mr-2.5 max-w-[12rem] translate-x-1 truncate whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-white/80 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                {m.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
