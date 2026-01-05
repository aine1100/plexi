"use client";

import React from "react";
import { Search } from "lucide-react";
import { templates, TemplateCategory } from "@/constants/templates";

interface SearchFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const categories: (TemplateCategory | "All")[] = ["All", "Landing", "Saas", "Mobile", "Ai"];

export default function SearchFilters({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
}: SearchFiltersProps) {
    // Calculate counts for each category
    const getCount = (category: string) => {
        if (category === "All") return templates.length;
        return templates.filter((t) => t.category === category).length;
    };

    return (
        <div className="flex flex-col gap-10 py-16">
            {/* Title Section */}
            <div className="text-center">
                <h1 className="text-[42px] font-bold tracking-tight text-black md:text-[52px]">
                    Find the perfect <br className="md:hidden" /> resource
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-[16px] font-medium text-[#666]">
                    Browse through our curated collection of high-fidelity design systems, 
                    UI kits, and component libraries.
                </p>
            </div>

            {/* Search and Filters Horizontal Container */}
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 lg:flex-row lg:justify-between">
                {/* Search Bar */}
                <div className="group relative w-full lg:max-w-md">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 transition-colors group-focus-within:text-black" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-[52px] w-full rounded-lg border border-black/5 bg-white pl-12 pr-6 text-[14px] font-medium text-black  outline-none transition-all placeholder:text-gray-400 focus:border-black/10 focus:ring-4 focus:ring-black/2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-3">
                    {categories.map((category) => {
                        const isActive = selectedCategory === category;
                        const count = getCount(category);
                        
                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-bold transition-all border ${
                                    isActive
                                        ? "bg-black text-white "
                                        : "bg-white text-[#666] border-black/5 hover:bg-gray-50/80"
                                }`}
                            >
                                {category}
                                {category !== "All" && (
                                    <span className={`text-[11px] font-medium -mt-2 opacity-50 ${isActive ? "text-white" : "text-black"}`}>
                                        {count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
