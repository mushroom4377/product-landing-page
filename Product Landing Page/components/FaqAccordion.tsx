"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { product } from "@/lib/product";

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-shell/10 rounded-lg border border-shell/10 bg-shell/7">
      {product.faqs.map((faq, index) => (
        <div key={faq.q}>
          <button
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-shell"
            onClick={() => setOpen(open === index ? -1 : index)}
            type="button"
          >
            {faq.q}
            <ChevronDown
              className={`h-5 w-5 shrink-0 transition ${open === index ? "rotate-180 text-yolk" : ""}`}
            />
          </button>
          {open === index ? <p className="px-5 pb-5 text-sm leading-7 text-shell/70">{faq.a}</p> : null}
        </div>
      ))}
    </div>
  );
}
