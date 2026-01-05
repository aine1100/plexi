"use client";

import React from "react";
import CreatorCard from "./ui/CreatorCard";
import { Github, Wind, Figma, Atom, Boxes, Type, Terminal, Zap } from "lucide-react";

const resources = [
    {
        name: "Plexi UI",
        description: "The core design system used to build high-fidelity Plexi templates.",
        bgColor: "bg-[#00D1FF]",
        link: "https://github.com/plexi/ui",
        logo: (
            <div className="h-24 w-24 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-6xl">P</div>
        )
    },
    {
        name: "Tailwind Kit",
        description: "A collection of production-ready Tailwind CSS components and utilities.",
        bgColor: "bg-[#00D1FF]",
        link: "https://tailwindui.com",
        logo: <Wind className="h-24 w-24 text-[#38bdf8]" />
    },
    {
        name: "Figma Pro",
        description: "Advanced Figma variables and auto-layout masters for fast prototyping.",
        bgColor: "bg-[#5DDB94]",
        link: "https://figma.com/",
        logo: <Figma className="h-24 w-24 text-[#F24E1E]" />
    },
    {
        name: "React Libs",
        description: "Our hand-picked list of the best React libraries for frontend developers.",
        bgColor: "bg-[#00D1FF]",
        link: "https://react.dev",
        logo: <Atom className="h-24 w-24 text-[#61dafb]" />
    },
    {
        name: "Icon Sets",
        description: "Curated collection of SVG icons for modern web interfaces.",
        bgColor: "bg-[#00D1FF]",
        link: "https://lucide.dev",
        logo: <Boxes className="h-24 w-24 text-black" />
    },
    {
        name: "Font Hub",
        description: "A directory of the best free and premium typography for digital design.",
        bgColor: "bg-[#00D1FF]",
        link: "https://fonts.google.com",
        logo: <Type className="h-24 w-24 text-[#4285f4]" />
    },
    {
        name: "Dev Tools",
        description: "Essential browser extensions and CLI tools for modern frontend workflows.",
        bgColor: "bg-[#5DDB94]",
        link: "https://github.com/trending",
        logo: <Github className="h-24 w-24 text-black" />
    },
    {
        name: "Assets Pack",
        description: "High-resolution mockups and textures for professional presentations.",
        bgColor: "bg-[#00D1FF]",
        link: "https://unblast.com",
        logo: <Zap className="h-24 w-24 text-[#ffcc00]" />
    },
];

export default function TopCreators() {
    return (
        <section className="bg-white py-24 px-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <h3 className="mb-16 text-center text-[32px] font-bold text-black md:text-[40px]">
                    Top Resources
                </h3>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {resources.map((resource, index) => (
                        <CreatorCard
                            key={index}
                            name={resource.name}
                            description={resource.description}
                            bgColor={resource.bgColor}
                            link={resource.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
