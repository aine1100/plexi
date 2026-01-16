"use client";

import { 
  Database, 
  Eye, 
  Inbox, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  Plus,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import AddResourceModal from "@/components/admin/AddResourceModal";

export default function AdminDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [stats, setStats] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
        const [resResp, subResp] = await Promise.all([
            fetch("/api/resources"),
            fetch("/api/submissions")
        ]);
        const resources = await resResp.json();
        const subs = await subResp.json();
        
        setSubmissions(subs.slice(0, 3)); // Only top 3 for dashboard
        
        // Compute stats from data
        const totalViews = resources.reduce((acc: number, r: any) => acc + (r.views || 0), 0);
        setStats([
          { label: "Total Resources", value: resources.length, icon: Database, trend: "+10%", color: "bg-blue-500" },
          { label: "Total Views", value: totalViews >= 1000 ? `${(totalViews/1000).toFixed(1)}k` : totalViews, icon: Eye, trend: "+15%", color: "bg-purple-500" },
          { label: "Submissions", value: subs.length, icon: Inbox, trend: "+5%", color: "bg-orange-500" },
          { label: "Recent Activity", value: "Active", icon: TrendingUp, trend: "Live", color: "bg-green-500" },
        ]);
    } catch (error) {
        console.error("Dashboard fetch failed:", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Welcome Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-black">Dashboard Overview</h1>
          <p className="text-[#666] font-medium mt-1">Here's what's happening with Plexi today.</p>
        </div>
        <Button 
          variant="primary" 
          height={48} 
          className="px-6 rounded-2xl gap-2 font-bold text-[14px]"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add New Resource
        </Button>
      </div>

      <AddResourceModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`h-12 w-12 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center text-black`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-600 text-[11px] font-bold">
                <ArrowUpRight className="h-3 w-3" />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#999]">{stat.label}</p>
              <h3 className="text-3xl font-black mt-1 leading-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-black/5 p-8 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight">Recent Submissions</h2>
            <button className="text-[13px] font-bold text-black/40 hover:text-black transition-colors underline underline-offset-4 decoration-2">
              View all queue
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {isLoading ? (
               <div className="flex flex-col gap-4 animate-pulse">
                   {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-3xl"></div>)}
               </div>
            ) : submissions.length === 0 ? (
                <div className="p-10 text-center text-[#999] font-medium italic">No recent submissions found.</div>
            ) : (
                submissions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-4 rounded-3xl border border-black/2 bg-[#FDFCF9] hover:bg-white hover:shadow-lg hover:shadow-black/2 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-black/5 flex items-center justify-center">
                        <Database className="h-5 w-5 text-[#666]" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold">{sub.resourceTitle}</h4>
                        <p className="text-[12px] font-semibold text-[#999]">{sub.resourceCategory} • {new Date(sub.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                      sub.status === 'APPROVED' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {sub.status}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="bg-black rounded-[40px] p-8 text-white flex flex-col justify-between overflow-hidden relative group">
          <div className="relative z-10">
            <Sparkles className="h-10 w-10 text-white/40 mb-6" />
            <h2 className="text-2xl font-black tracking-tight leading-tight mb-3">Admin Tips for You</h2>
            <p className="text-white/60 text-[14px] font-medium leading-relaxed">
              Resources with high-quality thumbnails perform 4x better on the landing page. Check your latest uploads!
            </p>
          </div>
          
          <button className="relative z-10 w-full h-14 bg-white text-black rounded-2xl font-black text-[14px] mt-8 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
            Get more insights
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Abstract decor */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        </div>
      </div>
    </div>
  );
}

