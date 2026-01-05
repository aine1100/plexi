"use client";

import React from "react";
import Image from "next/image";

export default function WorkflowSection() {
    return (
        <section className="bg-white py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-24 text-center">
                    <h2 className="mb-6 text-[36px] font-bold tracking-tight text-black md:text-[44px]">
                        Resource discovery is evolving
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-[#666]">
                        Professionals no longer hunt through broken links and unvetted lists. 
                        Modern teams rely on a singular, curated hub for verified high-end assets.
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
                    {/* The Old Way */}
                    <div className="flex flex-col">
                        <div className="mb-6 flex items-center gap-2">
                            <h3 className="text-[20px] font-bold text-black opacity-40">manual hunting</h3>
                            <span className="text-[14px] font-bold text-red-500 uppercase tracking-widest">(THE OLD WAY)</span>
                        </div>
                        <h2 className="mb-8 text-[32px] font-bold leading-tight tracking-tight text-black md:text-[40px]">
                            Endless searching, <br />
                            broken links.
                        </h2>
                        <div className="relative aspect-[4/3] w-[140%] -ml-[20%] overflow-hidden">
                            <Image
                                src="/old-way-screenshots.png"
                                alt="Manual resource hunting"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* The New Way */}
                    <div className="flex flex-col">
                        <div className="mb-6 flex items-center gap-2">
                            <h3 className="text-[20px] font-bold text-[#0070f3]">Plexi Hub</h3>
                            <span className="text-[14px] font-bold text-[#0070f3] uppercase tracking-widest">(THE NEW WAY)</span>
                        </div>
                        <h2 className="mb-8 text-[32px] font-bold leading-tight tracking-tight text-black md:text-[40px]">
                            Curated, verified, <br />
                            and ready to use.
                        </h2>
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                            <Image
                                src="/workflowbanner.png"
                                alt="Plexi Curated Hub"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}