import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Admin } from "@/lib/db/entities/Admin";
import { verifyPassword, generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const dataSource = await getDataSource();
        const adminRepo = dataSource.getRepository(Admin);
        const { email, password } = await request.json();

        const admin = await adminRepo.findOne({ where: { email } });

        if (!admin) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Verify password with bcrypt
        const isValidPassword = await verifyPassword(password, admin.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = generateToken({
            adminId: admin.id,
            email: admin.email,
            role: admin.role,
        });

        // Set HTTP-only cookie
        await setAuthCookie(token);

        return NextResponse.json({
            success: true,
            user: { id: admin.id, email: admin.email, role: admin.role }
        });
    } catch (error) {
        console.error("Login failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

