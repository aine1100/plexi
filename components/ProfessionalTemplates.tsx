"use client";

import React from "react";
import TemplateCard from "./ui/TemplateCard";
import { templates } from "@/constants/templates";

export default function ProfessionalTemplates() {
    // Show only the first 4 templates on the home page
    const featuredTemplates = templates.slice(0, 4);

    return (
        <section className="bg-[#FDFCF9] py-24 px-6 md:py-32">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <h2 className="mb-16 text-center text-[36px] font-bold tracking-tight text-black md:text-[44px]">
                    Templates designed <br className="hidden md:block" /> for professionals
                </h2>

                {/* Grid - Staggered Row 1 */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] mb-8">
                    {featuredTemplates.slice(0, 2).map((template, index) => (
                        <TemplateCard
                            key={template.id}
                            id={template.id}
                            title={template.title}
                            image={template.image}
                            description={template.description}
                        />
                    ))}
                </div>

                {/* Grid - Staggered Row 2 */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.5fr]">
                    {featuredTemplates.slice(2, 4).map((template, index) => (
                        <TemplateCard
                            key={template.id}
                            id={template.id}
                            title={template.title}
                            image={template.image}
                            description={template.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
