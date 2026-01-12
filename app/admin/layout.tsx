import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plexi - Admin Portal",
  description: "Management portal for Plexi high-fidelity templates.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFCF9] font-sans antialiased text-black">
      {children}
    </div>
  );
}
