import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { AnalyticsEvent } from "@/lib/db/entities/AnalyticsEvent";
import { Resource } from "@/lib/db/entities/Resource";
import { Submission } from "@/lib/db/entities/Submission";
import { Between } from "typeorm";

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const eventRepo = dataSource.getRepository(AnalyticsEvent);
    const resourceRepo = dataSource.getRepository(Resource);
    const submissionRepo = dataSource.getRepository(Submission);

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

    // Get top performing resources by views and clicks
    const resources = await resourceRepo.find({
      order: { views: "DESC" },
      take: 5
    });

    const topResources = resources.map(r => ({
      id: r.id,
      name: r.title,
      views: r.views,
      clicks: r.clicks,
      conversion: r.views > 0 ? ((r.clicks / r.views) * 100).toFixed(1) + "%" : "0%"
    }));

    // Get total views and clicks from all resources
    const allResources = await resourceRepo.find();
    const totalViews = allResources.reduce((sum, r) => sum + r.views, 0);
    const totalClicks = allResources.reduce((sum, r) => sum + r.clicks, 0);

    // Get submission counts
    const pendingSubmissions = await submissionRepo.count({ where: { status: "PENDING" as any } });
    const totalSubmissions = await submissionRepo.count();

    return NextResponse.json({
      total: events.length,
      daily: dailyStats,
      lastThirty: events.filter(e => e.timestamp > thirtyDaysAgo).length,
      topResources,
      totalViews,
      totalClicks,
      pendingSubmissions,
      totalSubmissions,
      conversionRate: totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0"
    });
  } catch (error) {
    console.error("Failed to fetch analytics summary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

