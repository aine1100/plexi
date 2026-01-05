"use client";

import React from "react";
import Image from "next/image";

export default function TestimonialSection() {
    return (
        <section className="bg-white py-24 px-6 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
                {/* Branding */}
                <div className="mb-12 flex justify-center grayscale opacity-60">
                    <span className="text-[14px] font-bold tracking-[0.2em] text-black">INTERCOM</span>
                </div>

                {/* Quote */}
                <blockquote className="mb-12">
                    <p className="text-[28px] font-bold leading-tight text-black md:text-[36px] tracking-tight">
                        "Plexi's curated resources completely changed how fast I ship designs. The assets are clean, flexible, and production-ready."
                    </p>
                </blockquote>

                {/* Profile */}
                <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-4">
                    <div className="relative mb-4 h-12 w-12 overflow-hidden rounded-full sm:mb-0">
                        <Image
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                            alt="John Reahm"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="text-[15px] font-bold text-black leading-none">John Reahm</div>
                        <div className="mt-1 text-[13px] font-medium text-[#666]">Success and VC Partnerships at Intercom</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
