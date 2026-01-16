import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Admin } from "@/lib/db/entities/Admin";
import { Settings } from "@/lib/db/entities/Settings";

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const adminRepo = dataSource.getRepository(Admin);
    const settingsRepo = dataSource.getRepository(Settings);

    // Check if any admin exists
    const adminCount = await adminRepo.count();

    // Initial Settings
    const settings = await settingsRepo.findOne({ where: { id: "singleton" } });
    if (!settings) {
      const defaultSettings = settingsRepo.create({
        id: "singleton",
        siteName: "Plexi",
        metaTitle: "Plexi - High-Fidelity Web Templates",
        metaDescription: "The curated gallery for high-fidelity web templates.",
        supportEmail: "hi@plexi.com",
      });
      await settingsRepo.save(defaultSettings);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database initialized",
      needsAdmin: adminCount === 0
    });
  } catch (error) {
    console.error("Setup failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


