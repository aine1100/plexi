"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Users, 
  MousePointer2, 
  TrendingUp, 
  Globe, 
  Download,
  Target,
  Inbox,
  Eye
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

  const topResources = dbStats?.topResources || [];

  // Generate chart data from daily stats
  const chartData = useMemo(() => {
    if (!dbStats?.daily) return [];
    
    // Get last 7 days
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const stats = dbStats.daily[dateStr] || { views: 0, clicks: 0 };
      days.push({ date: dateStr, dayName, ...stats });
    }
    return days;
  }, [dbStats]);

  // Generate SVG path from chart data
  const generateChartPath = (data: any[], key: 'views' | 'clicks', chartHeight = 200) => {
    if (data.length === 0) return { path: "", points: [], fillPath: "" };
    
    const maxValue = Math.max(...data.map(d => d[key]), 1);
    const width = 800;
    const step = width / (data.length - 1 || 1);
    
    const points = data.map((d, i) => ({
      x: i * step,
      y: chartHeight - (d[key] / maxValue) * (chartHeight - 20) - 10,
      value: d[key]
    }));
    
    if (points.length === 0) return { path: "", points: [], fillPath: "" };
    
    let path = `M${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp1x = points[i-1].x + step / 3;
      const cp1y = points[i-1].y;
      const cp2x = points[i].x - step / 3;
      const cp2y = points[i].y;
      path += ` C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
    }
    
    const fillPath = `M${points[0].x} ${chartHeight} L${points[0].x} ${points[0].y}` + 
      path.substring(path.indexOf(' ')) + 
      ` L${points[points.length-1].x} ${chartHeight} Z`;
    
    return { path, points, fillPath };
  };

  const viewsChart = useMemo(() => generateChartPath(chartData, 'views'), [chartData]);
  const clicksChart = useMemo(() => generateChartPath(chartData, 'clicks'), [chartData]);

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
          { label: "Total Views", value: dbStats?.totalViews || "0", growth: "+14.2%", icon: Users },
          { label: "Total Clicks", value: dbStats?.totalClicks || "0", growth: "+8.4%", icon: MousePointer2 },
          { label: "Conv. Rate", value: (dbStats?.conversionRate || "0") + "%", growth: "+1.2%", icon: Target },
          { label: "Pending Submissions", value: dbStats?.pendingSubmissions || "0", growth: "+" + (dbStats?.pendingSubmissions || "0"), icon: Inbox },
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
            <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible">
              {/* Grid lines */}
              {[0, 50, 100, 150, 200].map((y) => (
                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="black" strokeOpacity="0.03" strokeWidth="1" />
              ))}
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="black" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="black" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Fill area */}
              {viewsChart.fillPath && (
                <path d={viewsChart.fillPath} fill="url(#chartGradient)" />
              )}
              
              {/* Line */}
              {viewsChart.path && (
                <path 
                  d={viewsChart.path} 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
                />
              )}

              {/* Data points with hover tooltips */}
              {viewsChart.points.map((pt: any, i: number) => (
                <g key={i} className="cursor-pointer group/pt">
                  <circle cx={pt.x} cy={pt.y} r="8" fill="white" className="shadow-sm" />
                  <circle cx={pt.x} cy={pt.y} r="4" fill="black" />
                  
                  <g className="opacity-0 group-hover/pt:opacity-100 transition-opacity duration-200">
                    <rect x={pt.x - 35} y={pt.y - 45} width="70" height="32" rx="10" fill="black" />
                    <text x={pt.x} y={pt.y - 25} textAnchor="middle" fill="white" fontSize="11" fontWeight="900" className="pointer-events-none">
                      {pt.value} views
                    </text>
                  </g>
                </g>
              ))}
              
              {/* Empty state message */}
              {viewsChart.points.length === 0 && (
                <text x="400" y="100" textAnchor="middle" fill="#999" fontSize="14" fontWeight="700">
                  No analytics data yet - views will appear here
                </text>
              )}
            </svg>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {chartData.length > 0 ? chartData.map(day => (
                <span key={day.date} className="text-center text-[11px] font-black text-[#999] uppercase tracking-wider">{day.dayName}</span>
            )) : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day} className="text-center text-[11px] font-black text-[#999] uppercase tracking-wider">{day}</span>
            ))}
          </div>
        </div>

        {/* Top Performing */}
        <div className="bg-white rounded-[40px] border border-black/5 p-8 flex flex-col gap-6 shadow-sm">
          <h2 className="text-xl font-black tracking-tight">Top Performing</h2>
          <div className="flex flex-col gap-4">
            {topResources.length === 0 ? (
              <div className="text-center py-8 text-[#999]">
                <p className="text-[13px] font-bold">No resources yet</p>
              </div>
            ) : topResources.map((res: any) => (
              <div key={res.id || res.name} className="p-4 rounded-3xl border border-black/2 bg-[#FDFCF9] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-black">{res.name}</h4>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                        {res.clicks} clicks
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
