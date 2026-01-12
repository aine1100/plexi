"use client";

import { useState } from "react";
import {
    Inbox,
    Search,
    Check,
    X,
    User,
    Globe,
    Mail,
    ExternalLink,
    MessageSquare
} from "lucide-react";

const mockSubmissions = [
    {
        id: 1,
        name: "Plexi Dark UI",
        email: "sarah@design.co",
        url: "https://figma.com/community/123",
        category: "SaaS",
        desc: "A sleek dark mode UI kit for modern dashboards.",
        time: "2h ago"
    },
    {
        id: 2,
        name: "Ecom Pro Kit",
        email: "mike@ecom.io",
        url: "https://dribbble.com/mike",
        category: "Mobile",
        desc: "Mobile-first commerce template with 50+ screens.",
        time: "1d ago"
    },
    {
        id: 3,
        name: "Studio Portfolio",
        email: "hello@studio.com",
        url: "https://studio.com",
        category: "Landing",
        desc: "Minimalist landing page for creative studios.",
        time: "2d ago"
    },
];

export default function AdminSubmissions() {
    const [submissions, setSubmissions] = useState(mockSubmissions);

    const handleAction = (id: number, approved: boolean) => {
        // In a real app, this would call an API
        setSubmissions(submissions.filter(s => s.id !== id));
        alert(approved ? "Resource approved and listed!" : "Submission rejected.");
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Top Bar */}
            <div>
                <h1 className="text-3xl font-black tracking-tight text-black">Submissions Queue</h1>
                <p className="text-[#666] font-medium mt-1">Review and verify community contributions.</p>
            </div>

            {/* Submissions List */}
            <div className="flex flex-col gap-6">
                {submissions.map((sub) => (
                    <div key={sub.id} className="bg-white rounded-[40px] border border-black/5 p-8 flex flex-col md:flex-row gap-10 shadow-sm hover:shadow-xl transition-all duration-300">
                        {/* Left: Info */}
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-black">{sub.name}</h3>
                                        <span className="px-3 py-1 rounded-full bg-black/5 text-[11px] font-black uppercase tracking-wider text-[#666]">
                                            {sub.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[13px] font-bold text-[#999]">
                                        <span className="flex items-center gap-1.5">
                                            <User className="h-3.5 w-3.5" />
                                            {sub.email}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Globe className="h-3.5 w-3.5" />
                                            {sub.url.split('://')[1]}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[12px] font-bold text-[#999] bg-[#FDFCF9] px-3 py-1 rounded-full border border-black/2">
                                    {sub.time}
                                </span>
                            </div>

                            <div className="bg-[#FDFCF9] rounded-3xl p-5 border border-black/2 relative">
                                <MessageSquare className="absolute -left-2 -top-2 h-6 w-6 text-black/5 fill-black/5" />
                                <p className="text-[14px] font-medium text-[#444] leading-relaxed italic">
                                    "{sub.desc}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-2">
                                <a
                                    href={sub.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-[13px] font-black text-black hover:text-[#0070f3] transition-colors underline underline-offset-4 decoration-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    View Original Submission
                                </a>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex flex-col gap-3 justify-center min-w-[200px]">
                            <button
                                onClick={() => handleAction(sub.id, true)}
                                className="h-14 w-full bg-black text-white rounded-2xl font-black text-[14px] hover:bg-black/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                            >
                                <Check className="h-5 w-5" />
                                Approve & List
                            </button>
                            <button
                                onClick={() => handleAction(sub.id, false)}
                                className="h-14 w-full bg-white text-[#999] hover:text-red-500 border border-black/5 rounded-2xl font-black text-[14px] hover:bg-red-50 hover:border-red-100 transition-all flex items-center justify-center gap-2"
                            >
                                <X className="h-5 w-5" />
                                Reject
                            </button>
                        </div>
                    </div>
                ))}

                {submissions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border border-dashed border-black/10">
                        <div className="h-20 w-20 rounded-[32px] bg-green-50 flex items-center justify-center mb-6">
                            <Inbox className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-black">All Caught Up!</h3>
                        <p className="text-[#999] font-medium mt-2">There are no pending submissions in the queue.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
