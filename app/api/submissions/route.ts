import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Submission } from "@/lib/db/entities/Submission";

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const submissionRepo = dataSource.getRepository(Submission);
    const submissions = await submissionRepo.find({
      order: { createdAt: "DESC" }
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const dataSource = await getDataSource();
    const submissionRepo = dataSource.getRepository(Submission);
    const body = await request.json();
    
    const newSubmission = submissionRepo.create(body);
    await submissionRepo.save(newSubmission);
    
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error("Failed to create submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
