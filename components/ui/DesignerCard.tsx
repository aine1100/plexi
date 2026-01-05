"use client";

import React from "react";
import Image from "next/image";
import { Dribbble, Instagram, Twitter } from "lucide-react";

export interface Designer {
    name: string;
    color: string;
    designs: number;
    years: number;
    image: string;
    socials: {
        x: string;
        dribbble: string;
        instagram: string;
    };
}

interface DesignerCardProps {
    designer: Designer;
}

export default function DesignerCard({ designer }: DesignerCardProps) {
    return (
        <div className="group perspective-1000 h-[257px] w-[188px] cursor-pointer">
            <div className="preserve-3d relative h-full w-full transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front Face */}
                <div
                    className="backface-hidden absolute inset-0 z-20 flex flex-col items-start overflow-hidden rounded-[16px] border border-black/5"
                    style={{ backgroundColor: designer.color }}
                >
                    <div className="p-4 w-full">
                        <span className="text-[14px] font-bold text-black/80">{designer.name}</span>
                    </div>

                    {/* Mock Hero Image as Showcase - Full Width */}
                    <div className="relative mt-auto h-[150px] w-full translate-y-3">
                        <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
                            <Image
                                src={designer.image}
                                alt={designer.name}
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="backface-hidden rotate-y-180 absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[16px] p-4 text-center border border-black/5"
                    style={{ backgroundColor: designer.color }}
                >
                    <div className="flex flex-col items-center">
                        <span className="mb-3 text-[15px] font-bold text-black leading-tight">{designer.name}</span>
                        
                        <div className="mb-5 flex flex-col gap-4">
                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold text-black/90 leading-none">{designer.designs}</span>
                                <span className="mt-1 text-[8px] font-bold uppercase tracking-widest text-black/40">Total Designs</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold text-black/90 leading-none">{designer.years}</span>
                                <span className="mt-1 text-[8px] font-bold uppercase tracking-widest text-black/40">Years Contrib.</span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <a href={designer.socials.x} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-all hover:bg-black hover:text-white" target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-4 w-4 text-white" />
                            </a>
                            <a href={designer.socials.dribbble} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-all hover:bg-black hover:text-white" target="_blank" rel="noopener noreferrer">
                                <Dribbble className="h-4 w-4 text-white" />
                            </a>
                            <a href={designer.socials.instagram} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-all hover:bg-black hover:text-white" target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-4 w-4 text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
      
