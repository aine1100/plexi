"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart3,
    Database,
    Inbox,
    Settings,
    LogOut,
    Sparkles
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Resources", href: "/admin/resources", icon: Database },
    { name: "Submissions", href: "/admin/submissions", icon: Inbox },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-black/5 bg-white p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-10">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Plexi Admin</span>
                </Link>

                {/* Navigation */}
                <nav className="flex flex-col gap-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all ${isActive
                                    ? "bg-black text-white"
                                    : "text-[#666] hover:bg-black/5 hover:text-black"
                                    }`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Logout */}
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-semibold text-[#666] hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100">
                <LogOut className="h-4 w-4" />
                Logout
            </button>
        </aside>
    );
}
