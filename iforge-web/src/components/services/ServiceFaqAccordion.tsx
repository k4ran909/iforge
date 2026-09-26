"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ServiceFaq } from "@/data/siteData";

interface Props {
  faqs: ServiceFaq[];
}

export default function ServiceFaqAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-black hover:text-[#E61E32] transition-colors cursor-pointer"
            >
              <span className="text-sm sm:text-base pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#E61E32]" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
