"use client";

import Link from "next/link";
import Image from "next/image";

interface TemplateCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    onClick?: () => void;
}

export default function TemplateCard({ id, title, description, image, onClick }: TemplateCardProps) {
    const cardContent = (
        <>
            {/* Visual Header */}
            <div className="relative mb-6 flex h-[260px] w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <h3 className="mb-2 text-xl font-bold text-black">{title}</h3>
                <p className="text-[14px] font-medium leading-relaxed text-[#666]">
                    {description}
                </p>
            </div>
        </>
    );

    const baseClasses = "group flex flex-col items-start text-left overflow-hidden rounded-[24px] bg-white pt-6 px-6 pb-4 border border-black/5 transition-all hover:border-black/10 cursor-pointer w-full";

    if (onClick) {
        return (
            <button onClick={onClick} className={baseClasses}>
                {cardContent}
            </button>
        );
    }

    return (
        <Link href={`/discover/${id}`} className={baseClasses}>
            {cardContent}
        </Link>
    );
}
