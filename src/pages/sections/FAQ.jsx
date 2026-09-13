import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What membership plans do you offer?",
    answer:
      "We offer flexible membership plans for different fitness goals and durations. You can choose a plan based on your preferred duration, access, and facilities.",
  },
  {
    question: "Can beginners join the gym?",
    answer:
      "Absolutely. Our gym is suitable for beginners as well as experienced members. Our trainers can guide you with proper exercises, techniques, and workout routines.",
  },
  {
    question: "Do you provide personal training?",
    answer:
      "Yes. Our professional trainers can provide personalized training and guidance based on your fitness goals and experience level.",
  },
  {
    question: "What facilities are available at the gym?",
    answer:
      "Our gym provides access to facilities such as cardio equipment, weight training equipment, lockers, and other fitness areas depending on your membership plan.",
  },
  {
    question: "Can I change or upgrade my membership plan?",
    answer:
      "Yes. You can contact our gym management to discuss changing or upgrading your membership plan based on availability and the terms of your current membership.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#100b09] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">

        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            FAQ
          </span>

          <h2 className="mt-2 text-3xl font-black uppercase text-white md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Everything you need to know about our gym, memberships,
            trainers, and facilities.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-orange-500/40 bg-[#211613]"
                    : "border-[#3a2b27] bg-[#1b1210]"
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-gray-200 ">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-orange-500 text-white"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    <ChevronDown size={17} />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[#3a2b27] px-5 pb-5 pt-4 text-sm leading-6 text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;