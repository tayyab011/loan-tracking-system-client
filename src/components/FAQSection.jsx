import React, { useState } from "react";

const faqs = [
  {
    question: "How long does it take to get approved?",
    answer:
      "Most applications are reviewed within 24-48 hours, and you'll be notified immediately.",
  },
  {
    question: "What documents do I need?",
    answer: "You need a valid ID, proof of income, and proof of residence.",
  },
  {
    question: "Can I repay my loan early?",
    answer: "Yes, early repayment is allowed without any penalty fees.",
  },
  {
    question: "Are there hidden fees?",
    answer:
      "No, all fees and interest rates are clearly displayed before applying.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16  ">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1F887A]  text-center mb-10">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#155C62] text-[#B5F6EB] rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full  text-left px-6 py-4 flex   justify-between items-center font-bold  cursor-pointer"
            >
              {faq.question}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <p className="px-6 py-4  border-t border-[#B5F6EB]">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
