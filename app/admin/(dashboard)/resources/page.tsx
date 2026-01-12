"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowRight,
  Database,
  Globe,
  Tag,
  Edit2,
  Trash2,
  ExternalLink
} from "lucide-react";
import Button from "@/components/ui/Button";
import { templates } from "@/constants/templates";
import AddResourceModal from "@/components/admin/AddResourceModal";

export default function AdminResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTemplates = templates.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Top Bar */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-black">Manage Resources</h1>
          <p className="text-[#666] font-medium mt-1">Manage, edit, or remove resources from the live feed.</p>
        </div>
        <Button 
          variant="primary" 
          height={48} 
          className="px-6 rounded-2xl gap-2 font-bold text-[14px]"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
      </div>

      <AddResourceModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* Filters & Actions */}
      <div className="flex items-center justify-between pb-2 border-b border-black/5">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-64 bg-transparent pl-9 text-[13px] font-bold outline-none border-b border-transparent focus:border-black transition-all"
            />
          </div>
          
          <button className="flex items-center gap-2 text-[13px] font-bold text-[#666] hover:text-black transition-colors">
            <Filter className="h-3.5 w-3.5" />
            All Categories
          </button>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-[12px] font-bold text-[#999]">Showing {filteredTemplates.length} resources</p>
        </div>
      </div>

      {/* Resource Table/List */}
      <div className="flex flex-col gap-3">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="group flex items-center justify-between p-5 bg-white rounded-[28px] border border-black/5 hover:border-black/10 hover:shadow-xl hover:shadow-black/2 transition-all">
            <div className="flex items-center gap-6">
              {/* Thumbnail Mini */}
              <div className="h-14 w-14 rounded-2xl bg-black/5 overflow-hidden border border-black/5">
                <img src={template.image} alt="" className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-black">{template.title}</h3>
                  <div className="px-2 py-0.5 rounded-full bg-black/5 text-[10px] font-black uppercase tracking-wider text-[#666]">
                    {template.category}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[12px] font-semibold text-[#999]">
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    plexi.com/preview/{template.id}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Added Jan 12, 2026
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10">
              {/* Post Analytics */}
              <div className="hidden xl:flex items-center gap-8 mr-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#999]">Views</span>
                  <span className="text-[14px] font-black">{Math.floor(Math.random() * 5000) + 1000}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#999]">Clicks</span>
                  <span className="text-[14px] font-black">{Math.floor(Math.random() * 800) + 200}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#999]">Conv.</span>
                  <span className="text-[14px] font-black">{(Math.random() * 15 + 5).toFixed(1)}%</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button title="Visit Site" className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-black/5 text-[#666] hover:text-black transition-all">
                  <ExternalLink className="h-4 w-4" />
                </button>
                <button title="Edit Resource" className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-black/5 text-[#666] hover:text-black transition-all">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button title="Delete Resource" className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-red-50 text-[#666] hover:text-red-500 transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-black/10">
            <div className="h-16 w-16 rounded-3xl bg-black/5 flex items-center justify-center mb-4">
              <Database className="h-8 w-8 text-[#999]" />
            </div>
            <h3 className="text-xl font-black">No resources found</h3>
            <p className="text-[#999] font-medium mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
