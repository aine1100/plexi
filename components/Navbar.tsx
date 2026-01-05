"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SubmitModal from "@/components/ui/SubmitModal";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Discover", href: "/discover" },
        { name: "Top Rated", href: "/top-rated" },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white/80 py-6 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-end px-6">
                {/* Desktop Menu (Everything on the right) */}
                <div className="hidden items-center gap-12 md:flex">
                    <div className="flex items-center gap-10">
                        {/* Logo */}
                        <Link href="/" className="text-[20px] font-bold tracking-tight text-black">
                            Plexi
                        </Link>
                        
                        {/* Links */}
                        <div className="flex items-center gap-8 border-l border-black/5 pl-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    style={{ fontSize: "15px" }}
                                    className="font-medium text-[#444] transition-colors hover:text-black"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    <Button
                        variant="primary"
                        width={122}
                        height={35}
                        style={{ fontSize: "13px" }}
                        onClick={() => setIsSubmitModalOpen(true)}
                    >
                        Submit
                    </Button>
                </div>

                {/* Mobile Logo (Left side) */}
                <div className="flex w-full items-center justify-between md:hidden">
                    <Link href="/" className="text-xl font-bold tracking-tight text-black">
                        Plexi
                    </Link>
                    
                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-black focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute left-0 top-full w-full bg-white border-b border-black/5 p-6 shadow-xl md:hidden">
                    <div className="mb-6 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                style={{ fontSize: "15px" }}
                                className="font-medium text-[#444] transition-colors hover:text-black"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <Button
                        variant="primary"
                        width="100%"
                        height={45}
                        style={{ fontSize: "15px" }}
                        onClick={() => {
                            setIsSubmitModalOpen(true);
                            setIsMenuOpen(false);
                        }}
                    >
                        Submit
                    </Button>
                </div>
            )}
        </nav>
        {/* Submit Modal */}
        <SubmitModal 
            isOpen={isSubmitModalOpen} 
            onClose={() => setIsSubmitModalOpen(false)} 
        />
    </>
);
}
