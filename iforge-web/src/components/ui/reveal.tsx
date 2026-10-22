"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  /** Slide-in direction before fading to rest. Defaults to "up". */
  direction?: RevealDirection;
  /** Seconds to wait before animating. Useful for manual sequencing. */
  delay?: number;
  /** Travel distance in px. Defaults to 24. */
  distance?: number;
  /** Animation duration in seconds. Defaults to 0.6. */
  duration?: number;
  /** Re-run the reveal every time it scrolls into view. Defaults to false. */
  repeat?: boolean;
  className?: string;
  /** Render element. Defaults to a div. */
  as?: "div" | "section" | "span" | "li" | "article";
}

const OFFSET: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered fade/slide. The single motion primitive across the site —
 * sections and cards wrap their content in <Reveal> so every entrance reads the
 * same. Honours prefers-reduced-motion by rendering content statically.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  distance = 24,
  duration = 0.6,
  repeat = false,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const off = OFFSET[direction];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, x: off.x * distance, y: off.y * distance },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  /** Seconds between each child's entrance. Defaults to 0.08. */
  gap?: number;
  /** Seconds before the first child. Defaults to 0. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "ul";
}

/**
 * Wrap a set of <RevealItem> children to have them cascade in on scroll.
 * The parent controls timing; each item only declares its own transform.
 */
export function Stagger({ children, gap = 0.08, delay = 0, className, as = "div" }: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  distance?: number;
  className?: string;
  as?: "div" | "li" | "article" | "span";
}

/** A single child inside <Stagger>. */
export function RevealItem({
  children,
  direction = "up",
  distance = 20,
  className,
  as = "div",
}: RevealItemProps) {
  const reduced = useReducedMotion();
  const off = OFFSET[direction];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, x: off.x * distance, y: off.y * distance },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
