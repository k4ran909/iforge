"use client";

import React from "react";

// Things the ring swells over, and things that keep the native text caret.
const INTERACTIVE = 'a, button, [role="button"], label, summary, select, [data-cursor="hover"]';
const TEXT = 'input, textarea, [contenteditable="true"]';

const DOT_EASE = 0.45; // close to the pointer, just softened
const RING_EASE = 0.16; // trails behind, the "smooth" part
const SCALE_EASE = 0.2;

/**
 * A dot-and-ring cursor that eases after the pointer. The dot stands in for
 * the arrow; the ring trails, swells over anything clickable and pinches on
 * press. Over text fields it steps aside for the native caret. Mouse only,
 * and never for people who prefer reduced motion. Positions are written to
 * the DOM from one rAF loop, so moving the mouse never re-renders React.
 */
export default function SmoothCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-smooth-cursor");

    let x = 0;
    let y = 0;
    let dx = 0;
    let dy = 0;
    let rx = 0;
    let ry = 0;
    let seen = false;
    let hover = false;
    let pressed = false;
    let scale = 1;
    let show = 0;
    let showGoal = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      // First sighting: appear under the pointer instead of swooping in.
      if (!seen) {
        dx = rx = x;
        dy = ry = y;
        seen = true;
      }
      const target = e.target as Element | null;
      hover = !!target?.closest(INTERACTIVE);
      showGoal = target?.closest(TEXT) ? 0 : 1;
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    // Leaving the window hides it; it fades back in on the next move.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) showGoal = 0;
    };

    const tick = () => {
      dx += (x - dx) * DOT_EASE;
      dy += (y - dy) * DOT_EASE;
      rx += (x - rx) * RING_EASE;
      ry += (y - ry) * RING_EASE;
      const scaleGoal = (hover ? 1.75 : 1) * (pressed ? 0.75 : 1);
      scale += (scaleGoal - scale) * SCALE_EASE;
      show += (showGoal - show) * SCALE_EASE;

      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${hover ? 0 : 1})`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.opacity = ring.style.opacity = show.toFixed(3);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-smooth-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-white/70 opacity-0 will-change-transform"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white opacity-0 will-change-transform"
      />
    </div>
  );
}
