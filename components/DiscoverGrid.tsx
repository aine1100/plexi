"use client";

import React from "react";
import TemplateCard from "./ui/TemplateCard";
import { templates, Template } from "@/constants/templates";

interface DiscoverGridProps {
    searchQuery: string;
    selectedCategory: string;
}

export default function DiscoverGrid({ searchQuery, selectedCategory }: DiscoverGridProps) {
    const filteredTemplates = templates.filter((template) => {
        const matchesSearch =
            template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (filteredTemplates.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center py-20">
                <p className="text-[18px] font-bold text-black">No results found</p>
                <p className="text-[14px] font-medium text-[#666]">
                    Try adjusting your search or filters to find what you're looking for.
                </p>
            </div>
        );
    }

    // Split templates into rows to maintain the staggered layout pattern
    const rows = [];
    for (let i = 0; i < filteredTemplates.length; i += 2) {
        rows.push(filteredTemplates.slice(i, i + 2));
    }

    return (
        <div className="flex flex-col gap-8 pb-24">
            {rows.map((row, index) => (
                <div
                    key={index}
                    className={`grid grid-cols-1 gap-8 ${index % 2 === 0 ? "lg:grid-cols-[1.5fr_1fr]" : "lg:grid-cols-[1fr_1.5fr]"
                        }`}
                >
                    {row.map((template) => (
                        <TemplateCard
                            key={template.id}
                            id={template.id}
                            title={template.title}
                            description={template.description}
                            image={template.image}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
