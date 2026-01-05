"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import DiscoverGrid from "@/components/DiscoverGrid";

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <main className="min-h-screen bg-[#FDFCF9]">
            <Navbar />

            <section className="mx-auto max-w-7xl px-6">
                <SearchFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <DiscoverGrid
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                />
            </section>

            <Footer />
        </main>
    );
}
