"use client";

import { useState, useEffect } from "react";
import { Bell, Search, User, Sparkles, Inbox, TrendingUp, Clock, FileText } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  desc: string;
  icon: any;
  time: string;
  color: string;
  bg: string;
}

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [admin, setAdmin] = useState<{ email: string } | null>(null);

  useEffect(() => {
    fetchNotifications();
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await fetch("/api/admin/me");
      if (response.ok) {
        const data = await response.json();
        setAdmin(data);
      }
    } catch (error) {
      console.error("Failed to fetch admin:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      // Fetch pending submissions as notifications
      const submissionsRes = await fetch("/api/submissions");
      const submissions = await submissionsRes.json();
      
      const notifs: Notification[] = [];
      
      // Add pending submissions as notifications
      if (Array.isArray(submissions)) {
        const pending = submissions.filter((s: any) => s.status === "PENDING").slice(0, 3);
        pending.forEach((sub: any) => {
          notifs.push({
            id: `sub-${sub.id}`,
            title: "New Submission",
            desc: `${sub.resourceTitle} by ${sub.submitterName || "Anonymous"}`,
            icon: Inbox,
            time: formatTimeAgo(new Date(sub.createdAt)),
            color: "text-orange-500",
            bg: "bg-orange-50"
          });
        });
      }

      // Fetch recent resources as activity
      const resourcesRes = await fetch("/api/resources");
      const resources = await resourcesRes.json();
      
      if (Array.isArray(resources) && resources.length > 0) {
        const recent = resources.slice(0, 2);
        recent.forEach((res: any) => {
          if (res.views > 0) {
            notifs.push({
              id: `res-${res.id}`,
              title: "Resource Activity",
              desc: `${res.title} has ${res.views} views`,
              icon: TrendingUp,
              time: formatTimeAgo(new Date(res.updatedAt || res.createdAt)),
              color: "text-green-500",
              bg: "bg-green-50"
            });
          }
        });
      }

      // If no real notifications, show welcome message
      if (notifs.length === 0) {
        notifs.push({
          id: "welcome",
          title: "Welcome!",
          desc: "No new notifications",
          icon: Sparkles,
          time: "Just now",
          color: "text-blue-500",
          bg: "bg-blue-50"
        });
      }

      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => n.id.startsWith("sub-")).length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

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
            {unreadCount > 0 && (
              <div className="absolute top-2 right-2 h-4 w-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">{unreadCount}</span>
              </div>
            )}
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
                  <button 
                    className="text-[11px] font-bold text-[#999] hover:text-black"
                    onClick={() => fetchNotifications()}
                  >
                    Refresh
                  </button>
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
            <span className="text-[12px] font-bold leading-tight truncate max-w-[150px]">{admin?.email || "Admin User"}</span>
            <span className="text-[10px] font-medium text-[#999] leading-tight">Admin Portal</span>
          </div>
        </div>
      </div>
    </header>
  );
}

