import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

// GET /api/admin/me - Get current authenticated admin
export async function GET() {
    try {
        const admin = await getCurrentAdmin();

        if (!admin) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        return NextResponse.json({
            id: admin.adminId,
            email: admin.email,
            role: admin.role,
        });
    } catch (error) {
        console.error("Failed to get current admin:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
