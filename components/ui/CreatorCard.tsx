"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CreatorCardProps {
    name: string;
    description: string;
    image?: string;
    bgColor?: string;
    link?: string;
}

export default function CreatorCard({ name, description, image, bgColor = "bg-blue-400", link = "#" }: CreatorCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-[16px] bg-white border border-black/5 transition-all hover:border-black/10 aspect-[4/5]">
            {/* Background / Image Container */}
            <div className={`relative h-full w-full ${bgColor} overflow-hidden`}>
                {image && (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}

                {/* Gradient Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Plus/Close Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute bottom-4 right-4 z-30 flex h-8 w-8 items-center justify-center rounded-[60px] bg-black text-white transition-transform hover:scale-110 active:scale-95"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </button>

                {/* Name Tag (Always visible at bottom left when closed) */}
                <div className={`absolute bottom-4 left-4 z-10 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                    <span className="text-[12px] font-bold text-white/80 drop-shadow-sm">
                        {name}
                    </span>
                </div>
            </div>

            {/* Interactive Overlay (40% coverage) */}
            <div
                className={`absolute inset-x-0 bottom-0 z-20 flex flex-col bg-white p-6 transition-transform duration-500 ease-in-out rounded-b-[16px] ${isOpen ? "translate-y-0 h-[50%]" : "translate-y-full h-0"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex-1">
                        <h4 className="mb-2 text-[18px] font-bold text-black">{name}</h4>
                        <p className="text-[14px] font-medium leading-relaxed text-[#666]">
                            {description}
                        </p>
                    </div>

                    {/* Action Link */}
                    <div className="mt-auto pt-6">
                        <Link
                            href={link}
                            className="flex items-center justify-between w-full p-4 rounded-[60px] bg-gray-50 hover:bg-black hover:text-white group/link transition-all"
                        >
                            <span className="text-[14px] font-bold">View Resource</span>
                            <ArrowUpRight className="h-5 w-5 opacity-40 group-hover/link:opacity-100 transition-opacity" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
