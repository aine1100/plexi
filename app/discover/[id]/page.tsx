"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { templates } from "@/constants/templates";

export default function ResourceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const resource = templates.find((t) => t.id === id);

    if (!resource) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFCF9]">
                <h1 className="text-2xl font-bold">Resource not found</h1>
                <Link href="/discover" className="mt-4 text-[#0070f3] hover:underline">
                    Back to Discovery
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FDFCF9]">
            <Navbar />

            <div className="mx-auto max-w-7xl px-6 py-12">
                {/* Navigation Header */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-[14px] font-bold text-[#666] transition-colors hover:text-black"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to resources
                </button>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
                    {/* Left: Product Showcase */}
                    <div className="space-y-8">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] border border-black/5 bg-white">
                            <Image
                                src={resource.image}
                                alt={resource.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="space-y-6 px-2">
                            <h2 className="text-[24px] font-bold text-black">About {resource.title}</h2>
                            <p className="text-[16px] leading-[1.6] text-[#666] font-medium">
                                {resource.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>

                    {/* Right: Product Sidebar */}
                    <div className="flex flex-col gap-8">
                        <div className="rounded-[32px] border border-black/5 bg-white p-8 space-y-8">
                            <div>
                                <span className="inline-block rounded-full bg-[#0070f3]/10 px-4 py-1.5 text-[12px] font-bold text-[#0070f3]">
                                    {resource.category}
                                </span>
                                <h1 className="mt-4 text-[32px] font-bold tracking-tight text-black">
                                    {resource.title}
                                </h1>
                                <p className="mt-2 text-[15px] font-medium text-[#666]">
                                    Direct access to high-fidelity design systems and UI kits.
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="space-y-4">
                                <h3 className="text-[14px] font-bold uppercase tracking-wider text-black/30">Features</h3>
                                <ul className="space-y-3">
                                    {["Responsive Layout", "Clean Codebase", "Modular Design", "Documentation"].map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-[14px] font-bold text-[#444]">
                                            <CheckCircle2 className="h-4 w-4 text-[#0070f3]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 pt-4">
                                <Button width="100%" height={56} variant="primary" className="rounded-[16px]">
                                    <ExternalLink className="mr-2 h-5 w-5" />
                                    Live Preview
                                </Button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="rounded-[32px] border border-black/5 bg-white p-8">
                            <h3 className="mb-6 text-[14px] font-bold uppercase tracking-wider text-black/30">Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[14px] font-bold">
                                    <span className="text-[#666]">Format</span>
                                    <span className="text-black">Figma, React</span>
                                </div>
                                <div className="flex justify-between text-[14px] font-bold">
                                    <span className="text-[#666]">Version</span>
                                    <span className="text-black">1.0.4</span>
                                </div>
                                <div className="flex justify-between text-[14px] font-bold">
                                    <span className="text-[#666]">Last Update</span>
                                    <span className="text-black">Jan 05, 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
