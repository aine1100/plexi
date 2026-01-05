"use client";

import React from "react";
import Image from "next/image";
import Button from "./ui/Button";

export default function CTASection() {
    return (
        <section className="relative bg-white py-32 px-6 overflow-hidden">
            {/* Background element */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/cta.png"
                    alt="Background"
                    fill
                    className="object-contain opacity-60"
                    priority
                />
            </div>

            <div className="mx-auto max-w-4xl text-center relative z-10">
                {/* Badge */}
                <div className="mb-8 flex justify-center">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-[12px] font-bold text-green-700 border border-green-100">
                        Live on Plexi.io
                    </span>
                </div>

                {/* Heading */}
                <h2 className="mb-6 text-[40px] font-bold tracking-tight text-black md:text-[52px] leading-[1.1]">
                    Start exploring our <br /> curated collection today
                </h2>

                {/* Subtext */}
                <p className="mb-10 text-[16px] font-medium text-[#666]">
                    with 80% lower CPC than LinkedIn Ads*
                </p>

                {/* Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        width={220}
                        height={49}
                        variant="primary"
                        className="rounded-full"
                    >
                        Explore Resources
                    </Button>
                    <Button
                        width={220}
                        height={49}
                        variant="secondary"
                        className="rounded-full"
                    >
                        Contribute Assets
                    </Button>
                </div>
            </div>
        </section>
    );
}
