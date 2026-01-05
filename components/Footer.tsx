"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#FDFCF9] pt-24 pb-12 px-6 border-t border-black/5">
            <div className="mx-auto max-w-7xl">
                {/* Top: Logo & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xl">P</div>
                        <span className="text-xl font-bold tracking-tight text-black">Plexi</span>
                    </div>

                    <div className="flex gap-6">
                        <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="h-5 w-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="h-5 w-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Github className="h-5 w-5" /></Link>
                    </div>
                </div>

                {/* Middle: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[14px] font-bold text-black uppercase tracking-wider">Assets</h4>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">UI Kits</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Templates</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Icons & SVGs</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Typography</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-[14px] font-bold text-black uppercase tracking-wider">Tools</h4>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">React Libraries</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">CLI Tools</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Figma Plugins</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Dev Helpers</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-[14px] font-bold text-black uppercase tracking-wider">Community</h4>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Showcase</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Discussions</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Events</Link>
                        <Link href="#" className="text-[14px] font-medium text-[#666] hover:text-black transition-colors">Discord</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-[14px] font-bold text-black uppercase tracking-wider">Stay Updated</h4>
                        <p className="text-[14px] font-medium text-[#666] leading-snug mb-2">Subscribe for weekly curated resource drops.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="bg-white border border-black/5 rounded-lg px-4 py-2 text-[14px] w-full focus:outline-none focus:border-black/10"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom: Big Text Branding */}
                <div className="relative pt-12">
                    <div className="text-center">
                        <h1 className="text-[15vw] font-black leading-none tracking-tighter text-black opacity-80 uppercase select-none pointer-events-none">
                            Plexi
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-4 border-t border-gray-50 pt-8">
                        <p className="text-[13px] font-medium text-[#999]">&copy; 2026 Plexi Inc. All rights reserved.</p>
                        <div className="flex gap-8">
                            <Link href="#" className="text-[13px] font-medium text-[#999] hover:text-black transition-colors">Privacy Policy</Link>
                            <Link href="#" className="text-[13px] font-medium text-[#999] hover:text-black transition-colors">Terms of Service</Link>
                            <Link href="#" className="text-[13px] font-medium text-[#999] hover:text-black transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
