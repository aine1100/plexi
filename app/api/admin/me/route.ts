import { NextResponse } from "next/server";
import { getCurrentAdmin, hashPassword, generateToken, setAuthCookie } from "@/lib/auth";
import { getDataSource } from "@/lib/db/data-source";
import { Admin } from "@/lib/db/entities/Admin";

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

// PATCH /api/admin/me - Update admin profile
export async function PATCH(request: Request) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { email, password } = await request.json();
        const dataSource = await getDataSource();
        const adminRepo = dataSource.getRepository(Admin);

        const admin = await adminRepo.findOne({ where: { id: currentAdmin.adminId } });
        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // Update Email
        if (email && email !== admin.email) {
            // Check if email is already taken
            const existingAdmin = await adminRepo.findOne({ where: { email } });
            if (existingAdmin) {
                return NextResponse.json({ error: "Email already in use" }, { status: 400 });
            }
            admin.email = email;
        }

        // Update Password
        if (password) {
            if (password.length < 8) {
                return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
            }
            admin.password = await hashPassword(password);
        }

        await adminRepo.save(admin);

        // If email changed, we should technically update the token/cookie
        // For simplicity, let's update it so they don't get logged out immediately if email changes
        if (email && email !== currentAdmin.email) {
            const token = generateToken({
                adminId: admin.id,
                email: admin.email,
                role: admin.role,
            });
            await setAuthCookie(token);
        }

        return NextResponse.json({
            success: true,
            user: { id: admin.id, email: admin.email, role: admin.role }
        });

    } catch (error) {
        console.error("Failed to update profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

