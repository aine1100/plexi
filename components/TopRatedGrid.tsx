"use client";

import React, { useState } from "react";
import TemplateCard from "./ui/TemplateCard";
import ResourceModal from "./ui/ResourceModal";
import { templates, Template } from "@/constants/templates";

export default function TopRatedGrid() {
    const [selectedResource, setSelectedResource] = useState<Template | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock "Top Rated" as first 6 resources for demo
    const topRatedTemplates = templates.slice(0, 6);

    const openModal = (resource: Template) => {
        setSelectedResource(resource);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedResource(null), 300); // Clear after animation
    };

    return (
        <section className="py-20">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {topRatedTemplates.map((template) => (
                    <TemplateCard
                        key={template.id}
                        id={template.id}
                        title={template.title}
                        description={template.description}
                        image={template.image}
                        onClick={() => openModal(template)}
                    />
                ))}
            </div>

            {/* Modal */}
            <ResourceModal 
                resource={selectedResource}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
}
