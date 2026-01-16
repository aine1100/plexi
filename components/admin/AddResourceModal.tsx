"use client";

import React, { useState } from "react";
import { X, Globe, Type, MessageSquare, Tag, ChevronDown, Check, Loader2, Image as ImageIcon, Upload } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface AddResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories = [
    { label: "Landing Page", value: "Landing" },
    { label: "SaaS Website", value: "Saas" },
    { label: "Mobile App", value: "Mobile" },
    { label: "AI Interface", value: "Ai" }
];

export default function AddResourceModal({ isOpen, onClose }: AddResourceModalProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<{ label: string, value: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        image: "",
        description: ""
    });

    const handleImageUpload = async (file: File) => {
        setIsUploading(true);
        
        // Convert to base64
        const toBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
            });
        };

        try {
            const base64 = await toBase64(file);
            setImagePreview(base64);
            
            // Upload to Cloudinary
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64 }),
            });
            
            if (!response.ok) throw new Error("Upload failed");
            
            const data = await response.json();
            // Use functional update to avoid stale closure
            setFormData(prev => ({ ...prev, image: data.url }));
            toast.success("Image uploaded to Cloudinary!");
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload image");
            setImagePreview("");
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!formData.name || !formData.url || !selectedCategory) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/resources", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.name,
                    description: formData.description,
                    url: formData.url,
                    image: formData.image || "/placeholder.jpg",
                    category: selectedCategory.value.toUpperCase(),
                    status: "PUBLISHED",
                }),
            });

            if (!response.ok) throw new Error("Failed to create resource");

            toast.success("Resource added successfully!");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Failed to add resource:", error);
            toast.error("Failed to add resource. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-xl rounded-[40px] bg-[#FDFCF9] border border-black/5 p-10 flex flex-col gap-8 animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-[28px] font-black tracking-tight text-black">Add New Resource</h2>
                        <p className="mt-1 text-[15px] font-medium text-[#666]">
                            Fill in the details to list a new template on Plexi.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[#666] transition-all hover:bg-black hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] font-extrabold uppercase tracking-widest text-black/40 px-1">Resource Name</label>
                        <div className="relative group">
                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Plexi Pro Kit"
                                className="h-14 w-full rounded-2xl border border-black/5 bg-white pl-12 pr-4 text-[14px] font-semibold text-black outline-none transition-all focus:border-black/10 focus:ring-4 focus:ring-black/2"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] font-extrabold uppercase tracking-widest text-black/40 px-1">Category</label>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex h-14 w-full items-center justify-between rounded-2xl border bg-white px-4 text-[14px] font-semibold transition-all ${isDropdownOpen ? 'border-black/10 ring-4 ring-black/2' : 'border-black/5'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Tag className={`h-4 w-4 ${selectedCategory ? 'text-black' : 'text-gray-400'}`} />
                                    <span className={selectedCategory ? 'text-black' : 'text-gray-400'}>
                                        {selectedCategory ? selectedCategory.label : 'Select Category'}
                                    </span>
                                </div>
                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute left-0 top-16 z-20 w-full overflow-hidden rounded-2xl border border-black/5 bg-white py-2 shadow-2xl shadow-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="flex w-full items-center justify-between px-4 py-3 text-[14px] font-semibold transition-colors hover:bg-black/5"
                                        >
                                            <span className={selectedCategory?.value === cat.value ? 'text-black' : 'text-[#666]'}>
                                                {cat.label}
                                            </span>
                                            {selectedCategory?.value === cat.value && <Check className="h-4 w-4 text-black" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* URL */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] font-extrabold uppercase tracking-widest text-black/40 px-1">Resource URL</label>
                        <div className="relative group">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                placeholder="https://..."
                                className="h-14 w-full rounded-2xl border border-black/5 bg-white pl-12 pr-4 text-[14px] font-semibold text-black outline-none transition-all focus:border-black/10 focus:ring-4 focus:ring-black/2"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] font-extrabold uppercase tracking-widest text-black/40 px-1">Cover Image</label>
                        <div
                            className={`relative group h-14 w-full rounded-2xl border-2 border-dashed ${isUploading ? 'border-blue-500 bg-blue-50' : 'border-black/5 bg-white'} flex items-center justify-center cursor-pointer hover:border-black/10 hover:bg-black/[0.02] transition-all overflow-hidden`}
                            onClick={() => {
                                if (isUploading) return;
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) handleImageUpload(file);
                                };
                                input.click();
                            }}
                        >
                            {isUploading ? (
                                <div className="flex items-center gap-3 text-blue-500">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-[13px] font-bold">Uploading...</span>
                                </div>
                            ) : formData.image || imagePreview ? (
                                <div className="absolute inset-0 flex items-center gap-3 px-4 bg-white">
                                    <div className="h-8 w-8 rounded-lg overflow-hidden border border-black/5">
                                        <img src={imagePreview || formData.image} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <span className="text-[13px] font-bold truncate flex-1 text-green-600">Image uploaded ✓</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, image: "" }); setImagePreview(""); }}
                                        className="text-[11px] font-extrabold text-[#999] hover:text-red-500 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 text-gray-400 group-hover:text-black transition-colors">
                                    <ImageIcon className="h-4 w-4" />
                                    <span className="text-[13px] font-bold">Upload image to Cloudinary</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-extrabold uppercase tracking-widest text-black/40 px-1">Description</label>
                    <div className="relative group">
                        <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the resource features and benefits..."
                            className="h-32 w-full rounded-2xl border border-black/5 bg-white pl-12 pr-4 pt-4 text-[14px] font-semibold text-black outline-none resize-none transition-all focus:border-black/10 focus:ring-4 focus:ring-black/2"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-2">
                    <Button
                        variant="primary"
                        width="100%"
                        height={64}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="rounded-2xl text-[16px]"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Publish Resource"}
                    </Button>
                    <Button
                        variant="outline"
                        width={180}
                        height={64}
                        onClick={onClose}
                        className="rounded-2xl border-none bg-black/5 text-black hover:bg-black/10"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
