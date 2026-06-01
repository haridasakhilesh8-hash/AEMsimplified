"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="faq-item">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="faq-question cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="pr-4">{item.question}</span>
              <svg
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="faq-answer animate-fade-in">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
