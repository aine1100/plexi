"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    width?: string | number;
    height?: string | number;
    children: React.ReactNode;
}

export default function Button({
    variant = "primary",
    width,
    height,
    children,
    className = "",
    style,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-[0.97]";

    const variants = {
        primary: "bg-[#1a1a1a] !text-white hover:bg-black",
        secondary: "bg-[#0070f3] !text-white hover:opacity-90",
        outline: "border border-black/10 text-black hover:bg-black/5",
    };

    const customStyle: React.CSSProperties = {
        width: width || style?.width || "auto",
        height: height || style?.height || "auto",
        ...style,
        borderRadius: style?.borderRadius || '10px', // Use pill shape by default as in design
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            style={customStyle}
            {...props}
        >
            {children}
        </button>
    );
}
