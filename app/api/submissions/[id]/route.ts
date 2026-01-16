import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Submission, SubmissionStatus } from "@/lib/db/entities/Submission";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/submissions/[id] - Get single submission by ID
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const submissionRepo = dataSource.getRepository(Submission);
    
    const submission = await submissionRepo.findOne({ where: { id } });
    
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }
    
    return NextResponse.json(submission);
  } catch (error) {
    console.error("Failed to fetch submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/submissions/[id] - Update submission status (approve/reject)
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const submissionRepo = dataSource.getRepository(Submission);
    const { status } = await request.json();
    
    if (!status || !Object.values(SubmissionStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    
    const submission = await submissionRepo.findOne({ where: { id } });
    
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }
    
    submission.status = status;
    await submissionRepo.save(submission);
    
    return NextResponse.json(submission);
  } catch (error) {
    console.error("Failed to update submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/submissions/[id] - Delete submission
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const submissionRepo = dataSource.getRepository(Submission);
    
    const submission = await submissionRepo.findOne({ where: { id } });
    
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }
    
    await submissionRepo.remove(submission);
    
    return NextResponse.json({ success: true, message: "Submission deleted" });
  } catch (error) {
    console.error("Failed to delete submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
