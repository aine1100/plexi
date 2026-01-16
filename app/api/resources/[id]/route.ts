import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Resource } from "@/lib/db/entities/Resource";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/resources/[id] - Get single resource by ID
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const resourceRepo = dataSource.getRepository(Resource);
    
    const resource = await resourceRepo.findOne({ where: { id } });
    
    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }
    
    return NextResponse.json(resource);
  } catch (error) {
    console.error("Failed to fetch resource:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/resources/[id] - Update resource by ID
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const resourceRepo = dataSource.getRepository(Resource);
    const body = await request.json();
    
    const resource = await resourceRepo.findOne({ where: { id } });
    
    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }
    
    // Update allowed fields
    Object.assign(resource, {
      title: body.title ?? resource.title,
      description: body.description ?? resource.description,
      url: body.url ?? resource.url,
      image: body.image ?? resource.image,
      category: body.category ?? resource.category,
      status: body.status ?? resource.status,
    });
    
    await resourceRepo.save(resource);
    
    return NextResponse.json(resource);
  } catch (error) {
    console.error("Failed to update resource:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/resources/[id] - Delete resource by ID
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const resourceRepo = dataSource.getRepository(Resource);
    
    const resource = await resourceRepo.findOne({ where: { id } });
    
    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }
    
    await resourceRepo.remove(resource);
    
    return NextResponse.json({ success: true, message: "Resource deleted" });
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
