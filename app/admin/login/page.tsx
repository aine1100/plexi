"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Optional: Ensure DB is initialized (for demo purposes)
            await fetch("/api/setup");

            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push("/admin");
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please check your connection.");
        } finally {
            setIsLoading(true); // Keep it loading for transition
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCF9] p-6">
            <div className="w-full max-w-md">
                {/* Logo & Branding */}
                <div className="flex flex-col items-center gap-6 mb-12">
                    <div className="h-16 w-16 rounded-[24px] bg-black flex items-center justify-center shadow-2xl shadow-black/10">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-black tracking-tight text-black">Admin Portal</h1>
                        <p className="text-[#666] font-medium mt-2">Welcome back. Please sign in to continue.</p>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-5 bg-white p-8 rounded-[32px] border border-black/5 shadow-xl shadow-black/2">
                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-extrabold uppercase tracking-widest text-black/40 px-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@plexi.com"
                                    className="h-14 w-full bg-[#F9F9F9] rounded-2xl pl-12 pr-4 text-[14px] font-semibold outline-none border-2 border-transparent focus:border-black/5 focus:bg-white transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-extrabold uppercase tracking-widest text-black/40 px-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="h-14 w-full bg-[#F9F9F9] rounded-2xl pl-12 pr-4 text-[14px] font-semibold outline-none border-2 border-transparent focus:border-black/5 focus:bg-white transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            width="100%"
                            height={56}
                            disabled={isLoading}
                            className="rounded-2xl mt-4"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>Sign In</span>
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            )}
                        </Button>
                    </div>

                    <div className="text-center">
                        <button type="button" className="text-[13px] font-bold text-[#999] hover:text-black transition-colors">
                            Oops, I forgot my password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
