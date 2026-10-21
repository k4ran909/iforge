"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ServiceFaq } from "@/data/siteData";

interface Props {
  faqs: ServiceFaq[];
}

export default function ServiceFaqAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="border-t border-hairline">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border-b border-hairline">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-4">
                <span className="mt-0.5 font-mono text-xs tabular-nums text-[#E61E32]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-base font-medium transition-colors sm:text-lg ${
                    isOpen ? "text-foreground" : "text-foreground group-hover:text-[#E61E32]"
                  }`}
                >
                  {faq.question}
                </span>
              </span>
              <span
                className={`shrink-0 text-2xl leading-none text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-[#E61E32]" : ""
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-10 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
