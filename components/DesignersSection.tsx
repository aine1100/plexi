import React from "react";
import DesignerCard, { Designer } from "./ui/DesignerCard";
import CountUp from "./ui/CountUp";

const designers: Designer[] = [
    {
        name: "Marc Dan",
        color: "#0070f3",
        designs: 124,
        years: 4,
        image: "/1.png",
        socials: { x: "#", dribbble: "#", instagram: "#" }
    },
    {
        name: "Chris Ben",
        color: "#f35b63",
        designs: 89,
        years: 3,
        image: "/2.png",
        socials: { x: "#", dribbble: "#", instagram: "#" }
    },
    {
        name: "Yessir",
        color: "#f38e1a",
        designs: 210,
        years: 6,
        image: "/3.png",
        socials: { x: "#", dribbble: "#", instagram: "#" }
    },
    {
        name: "Luffy",
        color: "#52ad85",
        designs: 56,
        years: 2,
        image: "/4.png",
        socials: { x: "#", dribbble: "#", instagram: "#" }
    },
    {
        name: "InDesigns",
        color: "#6de49a",
        designs: 145,
        years: 5,
        image: "/5.png",
        socials: { x: "#", dribbble: "#", instagram: "#" }
    },
    {
        name: "Dimarco",
        color: "#b983f3",
        designs: 78,
        years: 3,
        image: "/6.png",
        socials: { x: "#", dribbble: "#", instagram: "#" }
    },
    {
        name: "Devin",
        color: "#ec14d3ff",
        designs: 78,
        years: 3,
        image: "/3.png",
        socials: { x: "#", dribbble: "#", instagram: "#" }
    },
];

export default function DesignersSection() {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="mb-6 text-[40px] font-bold leading-tight tracking-tight text-black md:text-[52px]">
                        Curated assets for <br />
                        design excellence
                    </h2>
                    <p className="mx-auto max-w-2xl text-[16px] font-medium text-[#666]">
                        Direct access to high-fidelity design systems, UI kits, and component libraries
                        vetted by the Plexi community.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="mb-16 grid grid-cols-2 gap-8 py-12 md:grid-cols-4 border-y border-gray-100">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1.5 text-[32px] font-bold text-black md:text-[40px]">
                            <CountUp end={50000} />
                            <span className="text-black">+</span>
                        </div>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Premium Assets</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-[32px] font-bold text-black md:text-[40px]">
                            <CountUp end={1200000} suffix="+" />
                        </div>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Components</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-[32px] font-bold text-black md:text-[40px]">
                            <CountUp end={99} suffix="%" />
                        </div>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Quality Score</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-[32px] font-bold text-black md:text-[40px]">
                            <CountUp end={500} suffix="+" />
                        </div>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Top Authors</p>
                    </div>
                </div>

                {/* Designers Grid */}
                <div className="flex w-full flex-wrap xl:flex-nowrap justify-center gap-3">
                    {designers.map((designer) => (
                        <DesignerCard key={designer.name} designer={designer} />
                    ))}
                </div>
            </div>
        </section>
    );
}
