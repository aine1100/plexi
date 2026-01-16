"use client";

import { useState, useEffect } from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  MousePointer2, 
  Clock, 
  TrendingUp, 
  Globe, 
  Download,
  Target,
  Inbox
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function AnalyticsPage() {
  const [dbStats, setDbStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
        const response = await fetch("/api/analytics/summary");
        const data = await response.json();
        setDbStats(data);
    } catch (error) {
        console.error("Failed to fetch analytics:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const topResources = [
    { name: "Plexi Starter", views: "2.4k", conversion: "18%", growth: "+12%" },
    { name: "UI Foundry", views: "1.8k", conversion: "15%", growth: "+5%" },
    { name: "Clean Stack", views: "1.2k", conversion: "12%", growth: "-2%" },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-black">Growth Analytics</h1>
          <p className="text-[#666] font-medium mt-1">Deep dive into Plexi's platform performance.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="h-12 px-6 rounded-2xl border border-black/5 bg-white text-[13px] font-bold hover:bg-black/5 transition-all">
                Last 30 Days
            </button>
            <Button variant="primary" height={48} className="px-6 rounded-2xl gap-2 font-bold text-[13px]">
                <Download className="h-4 w-4" />
                Export Data
            </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: "Total Visitors", value: dbStats?.lastThirty || "0", growth: "+14.2%", icon: Users },
          { label: "Resource Clicks", value: dbStats?.total || "0", growth: "+8.4%", icon: MousePointer2 },
          { label: "Conv. Rate", value: "8.2%", growth: "+1.2%", icon: Target },
          { label: "New Submissions", value: "12", growth: "+2", icon: Inbox },
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-white rounded-[40px] border border-black/5 hover:border-black/10 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-2xl bg-black/5 flex items-center justify-center text-[#666] group-hover:bg-black group-hover:text-white transition-all">
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-[12px] font-black text-green-500 bg-green-500/5 px-3 py-1 rounded-full">{stat.growth}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[32px] font-black tracking-tight">{isLoading ? "..." : stat.value}</span>
              <span className="text-[13px] font-bold text-[#999] tracking-tight">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart (Minimalist SVG) */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-black/5 p-8 flex flex-col gap-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-black" />
                <h2 className="text-xl font-black tracking-tight">Visitor Growth</h2>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-black"></div>
                    <span className="text-[12px] font-bold text-[#999]">This Month</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-black/10"></div>
                    <span className="text-[12px] font-bold text-[#999]">Last Month</span>
                </div>
            </div>
          </div>

          <div className="h-72 w-full relative group mt-4">
            <svg viewBox="0 0 800 240" className="w-full h-full overflow-visible">
              {[0, 60, 120, 180, 240].map((y) => (
                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="black" strokeOpacity="0.03" strokeWidth="1" />
              ))}
              
              <path 
                d="M0 240 L0 180 C 100 170, 200 210, 300 130 S 400 50, 500 110 S 600 180, 700 70 S 800 40, 800 40 L 800 240 Z" 
                fill="black" 
                fillOpacity="0.03"
              />
              <path 
                d="M0 180 C 100 170, 200 210, 300 130 S 400 50, 500 110 S 600 180, 700 70 S 800 40, 800 40" 
                fill="none" 
                stroke="black" 
                strokeOpacity="0.1"
                strokeWidth="2" 
                strokeDasharray="8 8"
              />

              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="black" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="black" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M0 240 L0 160 C 80 140, 160 190, 240 100 S 320 20, 400 60 S 480 140, 560 30 S 640 10, 720 50 S 800 20, 800 20 L 800 240 Z" 
                fill="url(#chartGradient)" 
              />
              <path 
                d="M0 160 C 80 140, 160 190, 240 100 S 320 20, 400 60 S 480 140, 560 30 S 640 10, 720 50 S 800 20, 800 20" 
                fill="none" 
                stroke="black" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
              />

              {[
                { x: 240, y: 100 },
                { x: 400, y: 60 },
                { x: 560, y: 30 },
                { x: 800, y: 20 }
              ].map((pt, i) => (
                <g key={i} className="cursor-pointer group/pt">
                  <circle cx={pt.x} cy={pt.y} r="8" fill="white" className="shadow-sm" />
                  <circle cx={pt.x} cy={pt.y} r="4" fill="black" />
                  
                  <g className="opacity-0 group-hover/pt:opacity-100 transition-opacity duration-200">
                    <rect x={pt.x - 40} y={pt.y - 45} width="80" height="32" rx="10" fill="black" />
                    <text x={pt.x} y={pt.y - 25} textAnchor="middle" fill="white" fontSize="11" fontWeight="900" className="pointer-events-none">
                      {Math.floor(Math.random() * 500) + 1200}
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day} className="text-center text-[11px] font-black text-[#999] uppercase tracking-wider">{day}</span>
            ))}
          </div>
        </div>

        {/* Top Performing */}
        <div className="bg-white rounded-[40px] border border-black/5 p-8 flex flex-col gap-6 shadow-sm">
          <h2 className="text-xl font-black tracking-tight">Top Performing</h2>
          <div className="flex flex-col gap-4">
            {topResources.map((res) => (
              <div key={res.name} className="p-4 rounded-3xl border border-black/2 bg-[#FDFCF9] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-black">{res.name}</h4>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                        res.growth.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}>
                        {res.growth}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#999] uppercase tracking-wider">Views</span>
                        <span className="text-[14px] font-black">{res.views}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] font-bold text-[#999] uppercase tracking-wider">Conversion</span>
                        <span className="text-[14px] font-black">{res.conversion}</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
          <button className="text-[13px] font-bold text-black border-b-2 border-black/5 pb-1 self-start hover:border-black transition-all">
            See performance report
          </button>
        </div>
      </div>

      {/* Geo Distribution */}
      <div className="bg-white rounded-[40px] border border-black/5 p-8 flex flex-col gap-8 shadow-sm">
        <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <h2 className="text-xl font-black tracking-tight">Geographic Reach</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
                { country: "United States", value: "34%", color: "bg-black" },
                { country: "United Kingdom", value: "18%", color: "bg-black/80" },
                { country: "Germany", value: "12%", color: "bg-black/60" },
                { country: "Canada", value: "9%", color: "bg-black/40" },
            ].map(item => (
                <div key={item.country} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[14px] font-bold">{item.country}</span>
                        <span className="text-[14px] font-black">{item.value}</span>
                    </div>
                    <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: item.value }}></div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
