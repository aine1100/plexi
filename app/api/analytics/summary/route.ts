import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { AnalyticsEvent } from "@/lib/db/entities/AnalyticsEvent";
import { Between } from "typeorm";

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const eventRepo = dataSource.getRepository(AnalyticsEvent);

    // Get stats for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const events = await eventRepo.find({
      where: {
        timestamp: Between(thirtyDaysAgo, new Date())
      }
    });

    // Group by day for the chart
    const dailyStats = events.reduce((acc: any, event) => {
      const date = event.timestamp.toISOString().split('T')[0];
      if (!acc[date]) acc[date] = { views: 0, clicks: 0 };
      if (event.type === 'VIEW') acc[date].views++;
      else if (event.type === 'CLICK') acc[date].clicks++;
      return acc;
    }, {});

    return NextResponse.json({
        total: events.length,
        daily: dailyStats,
        lastThirty: events.filter(e => e.timestamp > thirtyDaysAgo).length
    });
  } catch (error) {
    console.error("Failed to fetch analytics summary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
