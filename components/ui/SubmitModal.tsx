"use client";

import React, { useState } from "react";
import { X, Globe, Type, MessageSquare, Tag, ChevronDown, Check, Loader2, PartyPopper, Mail, Image as ImageIcon } from "lucide-react";
import Button from "./Button";

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories = [
    { label: "Landing Page", value: "Landing" },
    { label: "SaaS Website", value: "Saas" },
    { label: "Mobile App", value: "Mobile" },
    { label: "AI Interface", value: "Ai" }
];

export default function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<{ label: string, value: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        url: "",
        image: "",
        description: ""
    });

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.url || !selectedCategory) return;

        setIsSubmitting(true);
        // Mock submission delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);

        // Auto close after success
        setTimeout(() => {
            handleClose();
        }, 3000);
    };

    const handleClose = () => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", url: "", image: "", description: "" });
        setSelectedCategory(null);
        onClose();
    };

    const modalWrapper = (content: React.ReactNode) => (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden pointer-events-none">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity pointer-events-auto"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div
                className="relative z-10 w-full max-w-md rounded-[28px] bg-[#FDFCF9] border border-black/5 p-6 md:p-8 flex flex-col gap-5 animate-in fade-in zoom-in duration-300 pointer-events-auto overflow-y-auto max-h-[90vh]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style dangerouslySetInnerHTML={{ __html: `.relative::-webkit-scrollbar { display: none; }` }} />
                {content}
            </div>
        </div>
    );

    if (isSuccess) {
        return modalWrapper(
            <div className="flex flex-col items-center text-center gap-6 py-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <PartyPopper className="h-8 w-8 text-green-600" />
                </div>
                <div>
                    <h2 className="text-[22px] font-black tracking-tight text-black">Successfully Submitted!</h2>
                    <p className="mt-2 text-[14px] font-medium text-[#666]">
                        Thanks for contributing! Our team will review your submission and list it shortly.
                    </p>
                </div>
                <Button width="100%" height={52} variant="primary" onClick={handleClose} className="rounded-[14px]">
                    Back to browsing
                </Button>
            </div>
        );
    }

    return modalWrapper(
        <>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-[20px] font-black tracking-tight text-black leading-tight">Submit Resource</h2>
                    <p className="mt-0.5 text-[13px] font-medium text-[#666]">
                        Share your work with the community.
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-[#666] transition-all hover:bg-black hover:text-white"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
                {/* Resource Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-black/40 px-1">Resource Name</label>
                    <div className="relative group">
                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Plexi UI Kit"
                            className="h-[46px] w-full rounded-xl border border-black/5 bg-white pl-10 pr-4 text-[13px] font-medium text-black outline-none transition-all focus:border-black/10 focus:ring-2 focus:ring-black/2"
                        />
                    </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-black/40 px-1">Your Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@example.com"
                            className="h-[46px] w-full rounded-xl border border-black/5 bg-white pl-10 pr-4 text-[13px] font-medium text-black outline-none transition-all focus:border-black/10 focus:ring-2 focus:ring-black/2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {/* Category - Custom Dropdown */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-black/40 px-1">Category</label>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex h-[46px] w-full items-center justify-between rounded-xl border bg-white px-3 text-[13px] font-medium transition-all ${isDropdownOpen ? 'border-black/10 ring-2 ring-black/2' : 'border-black/5'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <Tag className={`h-3.5 w-3.5 ${selectedCategory ? 'text-black' : 'text-gray-400'}`} />
                                    <span className={selectedCategory ? 'text-black' : 'text-gray-400'}>
                                        {selectedCategory ? selectedCategory.label : 'Select'}
                                    </span>
                                </div>
                                <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute left-0 top-[52px] z-20 w-full overflow-hidden rounded-xl border border-black/5 bg-white py-1 shadow-lg shadow-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="flex w-full items-center justify-between px-3 py-2 text-[13px] font-medium transition-colors hover:bg-black/5"
                                        >
                                            <span className={selectedCategory?.value === cat.value ? 'text-black' : 'text-[#666]'}>
                                                {cat.label}
                                            </span>
                                            {selectedCategory?.value === cat.value && <Check className="h-3.5 w-3.5 text-black" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Link */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-black/40 px-1">Resource URL</label>
                        <div className="relative group">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                placeholder="https://..."
                                className="h-[46px] w-full rounded-xl border border-black/5 bg-white pl-10 pr-4 text-[13px] font-medium text-black outline-none transition-all focus:border-black/10 focus:ring-2 focus:ring-black/2"
                            />
                        </div>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-black/40 px-1">Resource Thumbnail</label>
                    <div
                        className="relative group h-[46px] w-full rounded-xl border border-dashed border-black/10 bg-white flex items-center justify-center cursor-pointer hover:border-black/20 hover:bg-black/[0.01] transition-all overflow-hidden"
                        onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) setFormData({ ...formData, image: URL.createObjectURL(file) });
                            };
                            input.click();
                        }}
                    >
                        {formData.image ? (
                            <div className="absolute inset-0 flex items-center gap-3 px-3 bg-white">
                                <div className="h-7 w-7 rounded-md overflow-hidden border border-black/5">
                                    <img src={formData.image} alt="" className="h-full w-full object-cover" />
                                </div>
                                <span className="text-[12px] font-bold truncate flex-1">Image ready</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, image: "" }); }}
                                    className="text-[10px] font-black text-[#999] hover:text-red-500 transition-colors"
                                >
                                    Change
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-gray-400 group-hover:text-black transition-colors">
                                <ImageIcon className="h-3.5 w-3.5" />
                                <span className="text-[12px] font-bold">Select or drop image</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Short Description */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-black/40 px-1">Short Description</label>
                    <div className="relative group">
                        <MessageSquare className="absolute left-4 top-3.5 h-3.5 w-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="What makes this resource special?"
                            className="h-[76px] w-full rounded-xl border border-black/5 bg-white pl-10 pr-4 pt-3 text-[13px] font-medium text-black outline-none resize-none transition-all focus:border-black/10 focus:ring-2 focus:ring-black/2"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col gap-2.5 pt-1">
                <Button
                    width="100%"
                    height={50}
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.url || !selectedCategory}
                    className="rounded-[14px] disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                        </div>
                    ) : "Submit for Verification"}
                </Button>
                <p className="text-center text-[11px] font-medium text-[#999]">
                    All submissions are manually verified within 24h.
                </p>
            </div>
        </>
    );
}
