"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopRatedGrid from "@/components/TopRatedGrid";

export default function TopRatedPage() {
    return (
        <main className="min-h-screen bg-[#FDFCF9]">
            <Navbar />
            
            <section className="mx-auto max-w-7xl px-6 py-24">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-[42px] font-black tracking-tight text-black md:text-[64px]">
                        Top Rated Resources
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-[18px] font-medium leading-relaxed text-[#666]">
                        Our community's favorite tools, assets, and templates. 
                        Hand-picked and verified for professional excellence.
                    </p>
                </div>

                {/* Grid with Modal Logic */}
                <TopRatedGrid />
            </section>

            <Footer />
        </main>
    );
}
