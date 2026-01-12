"use client";

import { useState } from "react";
import { Bell, Search, User, Sparkles, Inbox, TrendingUp, Clock } from "lucide-react";

const notifications = [
  { id: 1, title: "New Submission", desc: "Studio Portfolio by Alex", icon: Inbox, time: "2m ago", color: "text-orange-500", bg: "bg-orange-50" },
  { id: 2, title: "Traffic Spike", desc: "Views increased by 15%", icon: TrendingUp, time: "1h ago", color: "text-green-500", bg: "bg-green-50" },
  { id: 3, title: "System Update", desc: "New features are live", icon: Sparkles, time: "3h ago", color: "text-blue-500", bg: "bg-blue-50" },
];

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-20 border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      {/* Search Bar */}
      <div className="relative w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
        <input 
          type="text" 
          placeholder="Search resources, creators..."
          className="h-11 w-full bg-black/5 rounded-2xl pl-11 pr-4 text-[13px] font-medium outline-none border border-transparent focus:border-black/5 focus:bg-white transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`h-11 w-11 flex items-center justify-center rounded-2xl bg-black/5 border border-transparent hover:border-black/5 hover:bg-white transition-all relative ${showNotifications ? 'bg-white border-black/5' : ''}`}
          >
            <Bell className="h-4 w-4 text-[#666]" />
            <div className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>

          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-14 z-50 w-80 bg-white rounded-[32px] border border-black/5 shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[15px] font-black tracking-tight">Notifications</h3>
                  <button className="text-[11px] font-bold text-[#999] hover:text-black">Mark all read</button>
                </div>
                <div className="flex flex-col gap-4">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex gap-4 p-2 rounded-2xl hover:bg-black/2 transition-all cursor-pointer group">
                      <div className={`h-10 w-10 shrink-0 rounded-xl ${notif.bg} flex items-center justify-center ${notif.color}`}>
                        <notif.icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-[13px] font-bold leading-tight">{notif.title}</h4>
                        <p className="text-[12px] font-medium text-[#999] leading-tight truncate w-44">{notif.desc}</p>
                        <span className="text-[10px] font-bold text-[#CCC] mt-1">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 rounded-2xl bg-black/5 text-[12px] font-black hover:bg-black/10 transition-all">
                  View All Activity
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="h-11 flex items-center gap-3 px-3 rounded-2xl bg-black/5 border border-transparent hover:border-black/5 hover:bg-white transition-all cursor-pointer">
          <div className="h-7 w-7 rounded-full bg-black flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold leading-tight">Admin User</span>
            <span className="text-[10px] font-medium text-[#999] leading-tight">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
