"use client";

import React from "react";
import Image from "next/image";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import Button from "./Button";
import { Template } from "@/constants/templates";

interface ResourceModalProps {
    resource: Template | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ResourceModal({ resource, isOpen, onClose }: ResourceModalProps) {
    if (!isOpen || !resource) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[32px] bg-[#FDFCF9] border border-black/5 flex flex-col lg:flex-row h-auto max-h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-black/5 text-[#666] transition-all hover:bg-black hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Left: Product Showcase */}
                <div className="relative h-[300px] lg:h-auto lg:w-[1.2fr] bg-white border-r border-black/5 overflow-hidden">
                    <Image
                        src={resource.image}
                        alt={resource.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Right: Details Section */}
                <div className="flex flex-1 flex-col overflow-y-auto p-8 lg:p-12">
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block rounded-full bg-[#0070f3]/10 px-4 py-1.5 text-[12px] font-bold text-[#0070f3]">
                                {resource.category}
                            </span>
                            <h2 className="mt-4 text-[32px] font-bold tracking-tight text-black">
                                {resource.title}
                            </h2>
                            <p className="mt-4 text-[16px] font-medium leading-relaxed text-[#666]">
                                {resource.description} Professional high-end design assets and
                                frontend libraries optimized for modern workflows.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4">
                            <h3 className="text-[14px] font-bold uppercase tracking-wider text-black/30">Key Features</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {["Responsive Layout", "Clean Codebase", "Modular Design", "Documentation"].map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-[14px] font-bold text-[#444]">
                                        <CheckCircle2 className="h-4 w-4 text-[#0070f3]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-3 gap-8 py-6 border-t border-black/5">
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-wider text-black/30">Format</p>
                                <p className="mt-1 text-[14px] font-bold text-black">Figma, React</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-wider text-black/30">Version</p>
                                <p className="mt-1 text-[14px] font-bold text-black">1.0.4</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-wider text-black/30">Updated</p>
                                <p className="mt-1 text-[14px] font-bold text-black">Jan 2026</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 pt-4">
                            <Button width="100%" height={56} variant="primary" className="rounded-[16px]">
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Live Preview
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
