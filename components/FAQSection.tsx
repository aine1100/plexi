"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        question: "How often are new resources added to Plexi?",
        answer: "Our team of curators adds new hand-picked assets, templates, and libraries every week to ensure you always have access to the latest professional tools."
    },
    {
        question: "Can I contribute my own resources to the hub?",
        answer: "Absolutely! We encourage designers and developers to submit their high-quality assets. Once vetted by our community, they will be featured in the central repository."
    },
    {
        question: "Are the resources on Plexi free for commercial use?",
        answer: "Most resources are free for personal and commercial use under the MIT or CC BY 4.0 licenses. However, we always recommend checking the specific license file included with each asset."
    },
    {
        question: "Do you offer support for the technical starters and libraries?",
        answer: "While we provide documentation for all our curated resources, specific technical support is usually handled by the original authors or through our community GitHub discussions."
    },
    {
        question: "How do I download and install the assets?",
        answer: "Each resource page provides direct download links or installation commands (npm, yarn, pnpm) along with clear instructions to get you started in seconds."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-white py-24 px-6 md:py-32">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <h2 className="mb-16 text-center text-[36px] font-bold tracking-tight text-black md:text-[44px]">
                    Questions? <br /> We have answers.
                </h2>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-gray-100 transition-all hover:border-gray-200"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50/50"
                            >
                                <span className="text-[16px] font-bold text-black md:text-[18px]">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-6 pb-6 text-[15px] font-medium leading-relaxed text-[#666]">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
