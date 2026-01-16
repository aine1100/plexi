import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { AnalyticsEvent, EventType } from "@/lib/db/entities/AnalyticsEvent";
import { Resource } from "@/lib/db/entities/Resource";

export async function POST(request: Request) {
  try {
    const dataSource = await getDataSource();
    const eventRepo = dataSource.getRepository(AnalyticsEvent);
    const resourceRepo = dataSource.getRepository(Resource);
    const { type, resourceId, metadata } = await request.json();

    if (!type || !Object.values(EventType).includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    const event = eventRepo.create({
      type: type as EventType,
      resourceId,
      metadata,
    });
    await eventRepo.save(event);

    // Increment resource counters if applicable
    if (resourceId) {
      if (type === EventType.VIEW) {
        await resourceRepo.increment({ id: resourceId }, "views", 1);
      } else if (type === EventType.CLICK) {
        await resourceRepo.increment({ id: resourceId }, "clicks", 1);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track analytics:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
