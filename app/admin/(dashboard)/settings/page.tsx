"use client";

import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Globe,
  Mail,
  Smartphone,
  Check
} from "lucide-react";
import Button from "@/components/ui/Button";
import toast, { Toaster } from "react-hot-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [settings, setSettings] = useState<any>(null);
  const [adminProfile, setAdminProfile] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, adminRes] = await Promise.all([
        fetch("/api/settings"),
        fetch("/api/admin/me")
      ]);
      
      const settingsData = await settingsRes.json();
      setSettings(settingsData);

      if (adminRes.ok) {
        const adminData = await adminRes.json();
        setAdminProfile(prev => ({ ...prev, email: adminData.email }));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Save Site Settings
      const settingsResponse = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      // 2. Save Admin Profile (if changed)
      let profileUpdated = false;
      if (adminProfile.email || adminProfile.password) {
         const profileResponse = await fetch("/api/admin/me", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: adminProfile.email,
            password: adminProfile.password || undefined // Only send if set
          }),
        });
        
        if (!profileResponse.ok) {
           const errorData = await profileResponse.json();
           throw new Error(errorData.error || "Failed to update profile");
        }
        profileUpdated = true;
      }

      if (!settingsResponse.ok) throw new Error("Failed to save settings");

      toast.success(profileUpdated ? "Settings and profile updated!" : "Settings saved successfully!");
      
      // Clear password field after successful update
      if (profileUpdated && adminProfile.password) {
        setAdminProfile(prev => ({ ...prev, password: "" }));
      }

    } catch (error: any) {
      console.error("Failed to save:", error);
      toast.error(error.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = ["General", "Security", "Notifications", "Team"];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-black">Settings</h1>
          <p className="text-[#666] font-medium mt-1">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-black">Settings</h1>
        <p className="text-[#666] font-medium mt-1">Manage your platform preferences and security.</p>
      </div>

      {/* Settings Layout */}
      <div className="flex gap-12">
        {/* Left: Tab Menu */}
        <aside className="w-48 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-extrabold transition-all ${activeTab === tab
                  ? "bg-black text-white"
                  : "text-[#666] hover:bg-black/5 hover:text-black"
                }`}
            >
              {tab === "General" && <User className="h-4 w-4" />}
              {tab === "Security" && <Lock className="h-4 w-4" />}
              {tab === "Notifications" && <Bell className="h-4 w-4" />}
              {tab === "Team" && <Shield className="h-4 w-4" />}
              {tab}
            </button>
          ))}
        </aside>

        {/* Right: Settings Content */}
        <div className="flex-1 max-w-2xl bg-white rounded-[40px] border border-black/5 p-10 shadow-sm">
          <div className="flex flex-col gap-10">
            {activeTab === "General" && (
              <section className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-black">Admin Profile</h3>
                    <p className="text-[13px] font-medium text-[#999] mt-1">Global account settings.</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-[32px] bg-black flex items-center justify-center">
                      <User className="h-10 w-10 text-white" />
                    </div>
                     <div className="flex-1 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                           <label className="text-[11px] font-extrabold uppercase tracking-widest text-black/40 px-1">Email Address</label>
                           <input 
                              type="email" 
                              value={adminProfile.email} 
                              onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})} 
                              className="h-12 w-full bg-[#F9F9F9] rounded-2xl px-4 text-[14px] font-semibold outline-none border-2 border-transparent focus:border-black/5 focus:bg-white transition-all" 
                           />
                        </div>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-widest text-black/40 px-1">Site Name</label>
                      <input type="text" value={settings?.siteName || ""} onChange={(e) => setSettings({...settings, siteName: e.target.value})} className="h-12 w-full bg-[#F9F9F9] rounded-2xl px-4 text-[14px] font-semibold outline-none border-2 border-transparent focus:border-black/5 focus:bg-white transition-all" />
                    </div>
                     <div className="flex flex-col gap-2">
                       <label className="text-[11px] font-extrabold uppercase tracking-widest text-black/40 px-1">New Password (Optional)</label>
                       <input 
                          type="password" 
                          value={adminProfile.password} 
                          onChange={(e) => setAdminProfile({...adminProfile, password: e.target.value})}
                          placeholder="Leave blank to keep current" 
                          className="h-12 w-full bg-[#F9F9F9] rounded-2xl px-4 text-[14px] font-semibold outline-none border-2 border-transparent focus:border-black/5 focus:bg-white transition-all" 
                        />
                     </div>
                  </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-widest text-black/40 px-1">Support Email</label>
                      <input type="email" value={settings?.supportEmail || ""} onChange={(e) => setSettings({...settings, supportEmail: e.target.value})} className="h-12 w-full bg-[#F9F9F9] rounded-2xl px-4 text-[14px] font-semibold outline-none border-2 border-transparent focus:border-black/5 focus:bg-white transition-all" />
                    </div>
                </div>

                <hr className="border-black/5" />

                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-black">Site Settings (SEO)</h3>
                    <p className="text-[13px] font-medium text-[#999] mt-1">Configure how Plexi appears on Google.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-widest text-black/40 px-1">Meta Title</label>
                      <input type="text" value={settings?.metaTitle || ""} onChange={(e) => setSettings({...settings, metaTitle: e.target.value})} className="h-12 w-full bg-[#F9F9F9] rounded-2xl px-4 text-[14px] font-semibold outline-none border-2 border-transparent focus:border-black/5 focus:bg-white transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-widest text-black/40 px-1">Meta Description</label>
                      <textarea value={settings?.metaDescription || ""} onChange={(e) => setSettings({...settings, metaDescription: e.target.value})} className="h-24 w-full bg-[#F9F9F9] rounded-2xl p-4 text-[14px] font-semibold outline-none border-2 border-transparent focus:border-black/5 focus:bg-white transition-all resize-none" />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Security" && (
              <section className="flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-black">Security & Access</h3>
                  <p className="text-[13px] font-medium text-[#999] mt-1">Manage passwords and 2FA.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-[#F9F9F9]">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black">Multi-factor Authentication</span>
                      <span className="text-[12px] font-bold text-[#999]">Extra layer of security.</span>
                    </div>
                    <div className="h-6 w-11 bg-black/10 rounded-full cursor-pointer relative">
                      <div className="h-4 w-4 bg-white rounded-full absolute left-1 top-1"></div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Notifications" && (
              <section className="flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-black">Notifications</h3>
                  <p className="text-[13px] font-medium text-[#999] mt-1">Manage how you receive alerts.</p>
                </div>
                <div className="flex flex-col gap-2">
                  {['New submission alerts', 'Weekly traffic reports', 'Platform updates', 'Security alerts'].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 bg-[#F9F9F9] rounded-2xl">
                      <span className="text-[14px] font-bold">{item}</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-black shadow-sm" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="pt-4 flex items-center justify-between">
              <Button variant="primary" height={56} onClick={handleSave} disabled={isSaving} className="px-10 rounded-2xl font-black text-[15px] shadow-xl shadow-black/10 transition-all hover:scale-[1.02]">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-[13px] font-bold">Settings synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

