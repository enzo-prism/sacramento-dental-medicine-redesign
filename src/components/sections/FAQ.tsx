"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        return (
          <div key={faq.q} className="border-b border-line">
            <h4>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left md:py-6"
              >
                <span className="font-display text-lg font-medium text-ink md:text-xl">
                  {faq.q}
                </span>
                <span
                  aria-hidden
                  className={`grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,border-color,color] duration-300 ${
                    isOpen
                      ? "rotate-45 border-brand-deep text-brand-deep"
                      : "border-line text-ink-soft"
                  }`}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h4>
            <div
              id={panelId}
              aria-hidden={!isOpen}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 text-pretty text-sm leading-7 text-ink-soft md:text-base md:leading-8">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
