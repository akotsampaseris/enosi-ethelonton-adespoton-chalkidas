"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";

interface FAQ {
  _id: string;
  question: string;
  answer: any; // PortableText content
  category: string;
  order: number;
}

interface FAQByCategory {
  [key: string]: FAQ[];
}

interface FAQAccordionProps {
  faqsByCategory: FAQByCategory;
  categoryLabels: Record<string, { label: string; emoji: string }>;
}

const portableTextComponents = {
  block: {
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h3>
    ),
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-pink-700 underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
  },
};

export default function FAQAccordion({
  faqsByCategory,
  categoryLabels,
}: FAQAccordionProps) {
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());

  const toggleFAQ = (id: string) => {
    setOpenFAQs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-12">
      {Object.entries(faqsByCategory).map(([category, faqs]) => (
        <div key={category}>
          {/* Category Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-4xl">
                {categoryLabels[category]?.emoji}
              </span>
              {categoryLabels[category]?.label}
            </h2>
            <div className="mt-2 h-1 w-20 bg-pink-500 rounded-full"></div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-2xl">
                Δεν υπάρχουν ερωτήσεις σε αυτή την κατηγορία ακόμα.
              </div>
            ) : (
              faqs.map((faq) => (
                <div
                  key={faq._id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-pink-300 transition-colors overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq._id)}
                    className="w-full flex items-start justify-between gap-4 p-6 text-left"
                  >
                    <h3 className="flex-1 text-lg font-bold text-gray-900">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`flex-shrink-0 text-pink-500 transition-transform ${openFAQs.has(faq._id) ? "rotate-180" : ""}`}
                      size={24}
                    />
                  </button>

                  <AnimatePresence>
                    {openFAQs.has(faq._id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="text-gray-700 leading-relaxed">
                            <PortableText
                              value={faq.answer}
                              components={portableTextComponents}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
