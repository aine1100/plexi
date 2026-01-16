import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Submission, SubmissionStatus } from "@/lib/db/entities/Submission";
import { Resource, Category, Status } from "@/lib/db/entities/Resource";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/submissions/[id]/approve - Approve submission and create resource
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const submissionRepo = dataSource.getRepository(Submission);
    const resourceRepo = dataSource.getRepository(Resource);
    
    const submission = await submissionRepo.findOne({ where: { id } });
    
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }
    
    if (submission.status === SubmissionStatus.APPROVED) {
      return NextResponse.json({ error: "Submission already approved" }, { status: 400 });
    }
    
    // Map submission category to Resource Category enum
    const categoryMap: Record<string, Category> = {
      "Landing": Category.LANDING,
      "SaaS": Category.SAAS,
      "Saas": Category.SAAS,
      "SAAS": Category.SAAS,
      "Mobile": Category.MOBILE,
      "MOBILE": Category.MOBILE,
      "AI": Category.AI,
      "Ai": Category.AI,
    };
    
    const category = categoryMap[submission.resourceCategory] || Category.LANDING;
    
    // Create new resource from submission
    const newResource = resourceRepo.create({
      title: submission.resourceTitle,
      description: submission.resourceDescription,
      url: submission.resourceUrl,
      image: submission.resourceImage,
      category: category,
      status: Status.PUBLISHED,
      views: 0,
      clicks: 0,
    });
    
    await resourceRepo.save(newResource);
    
    // Update submission status
    submission.status = SubmissionStatus.APPROVED;
    await submissionRepo.save(submission);
    
    return NextResponse.json({ 
      success: true, 
      message: "Submission approved and resource created",
      resource: newResource
    });
  } catch (error) {
    console.error("Failed to approve submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
