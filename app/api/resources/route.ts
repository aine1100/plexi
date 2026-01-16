import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Resource } from "@/lib/db/entities/Resource";

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const resourceRepo = dataSource.getRepository(Resource);
    const resources = await resourceRepo.find({
      order: { createdAt: "DESC" }
    });
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const dataSource = await getDataSource();
    const resourceRepo = dataSource.getRepository(Resource);
    const body = await request.json();
    
    const newResource = resourceRepo.create(body);
    await resourceRepo.save(newResource);
    
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error("Failed to create resource:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
