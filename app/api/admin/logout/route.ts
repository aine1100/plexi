import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearAuthCookie();
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
