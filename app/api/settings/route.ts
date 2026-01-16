import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Settings } from "@/lib/db/entities/Settings";

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const settingsRepo = dataSource.getRepository(Settings);
    let settings = await settingsRepo.findOne({ where: { id: "singleton" } });
    
    if (!settings) {
        // Fallback or setup call
        return NextResponse.json({ error: "Settings not initialized" }, { status: 404 });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const dataSource = await getDataSource();
    const settingsRepo = dataSource.getRepository(Settings);
    const body = await request.json();
    
    let settings = await settingsRepo.findOne({ where: { id: "singleton" } });
    if (!settings) {
        settings = settingsRepo.create({ id: "singleton" });
    }
    
    Object.assign(settings, body);
    await settingsRepo.save(settings);
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
