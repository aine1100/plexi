"use client";

import React from "react";
import Image from "next/image";

export default function CreatorsSection() {
    return (
        <section className="bg-[#FDFCF9] py-24 px-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <h2 className="mb-16 text-center text-[36px] font-bold tracking-tight text-black md:text-[44px]">
                    Essential resources for <br className="hidden md:block" /> modern professionals.
                </h2>

                {/* Grid */}
                <div className="flex flex-col gap-6">
                    {/* Top Row: 2 Cards */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
                        {/* Designer-first templates */}
                        <div className="flex flex-col rounded-[24px] bg-white p-8 border border-black/5">
                            <div className="relative mb-8 h-[240px] w-full overflow-hidden rounded-xl bg-blue-50">
                                <Image
                                    src="/hero.png"
                                    alt="Designer-first templates"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-black">Designer-first templates</h3>
                            <p className="max-w-md text-[14px] font-medium leading-relaxed text-[#666]">
                                Every template is built with designers in mind—clean structure, scalable layouts, and pixel-perfect spacing.
                            </p>
                        </div>

                        {/* Ready to customize */}
                        <div className="flex flex-col rounded-[24px] bg-white p-8 border border-black/5">
                            <div className="relative mb-8 h-[240px] w-full overflow-hidden rounded-xl bg-blue-50">
                                <Image
                                    src="/hero.png"
                                    alt="Ready to customize"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-black">Ready to customize</h3>
                            <p className="text-[14px] font-medium leading-relaxed text-[#666]">
                                Easily adapt colors, typography, and components to match your brand without rebuilding layouts.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row: 3 Cards */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Built for real projects */}
                        <div className="flex flex-col rounded-[24px] bg-white p-8 border border-black/5">
                            <div className="relative mb-8 h-[240px] w-full overflow-hidden rounded-xl bg-blue-50">
                                <Image
                                    src="/hero.png"
                                    alt="Built for real projects"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-black">Built for real projects</h3>
                            <p className="text-[14px] font-medium leading-relaxed text-[#666]">
                                From portfolios to SaaS websites, templates are production-ready and optimized for real-world use.
                            </p>
                        </div>

                        {/* Consistent by design */}
                        <div className="flex flex-col rounded-[24px] bg-white p-8 border border-black/5">
                            <div className="relative mb-8 h-[240px] w-full overflow-hidden rounded-xl bg-blue-50">
                                <Image
                                    src="/hero.png"
                                    alt="Consistent by design"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-black">Consistent by design</h3>
                            <p className="text-[14px] font-medium leading-relaxed text-[#666]">
                                Maintain design consistency across pages and projects using a unified template system.
                            </p>
                        </div>

                        {/* Recommendation Ai */}
                        <div className="flex flex-col rounded-[24px] bg-white p-8 border border-black/5">
                            <div className="relative mb-8 h-[240px] w-full overflow-hidden rounded-xl bg-blue-50">
                                <Image
                                    src="/hero.png"
                                    alt="Resource AI Search"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="mb-2 flex items-center gap-3 text-xl font-bold text-black">
                                Resource AI Search
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">Coming Soon</span>
                            </h3>
                            <p className="text-[14px] font-medium leading-relaxed text-[#666]">
                                Our AI evaluates and summarizes the best tools and assets - no more digging through GitHub.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
