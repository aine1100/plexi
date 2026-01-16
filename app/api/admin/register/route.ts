import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Admin, AdminRole } from "@/lib/db/entities/Admin";
import { hashPassword, generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const dataSource = await getDataSource();
        const adminRepo = dataSource.getRepository(Admin);

        // Only allow registration if no admin exists
        const adminCount = await adminRepo.count();
        if (adminCount > 0) {
            return NextResponse.json(
                { error: "Admin already exists. Registration disabled." },
                { status: 403 }
            );
        }

        const { email, password, confirmPassword } = await request.json();

        // Validation
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password required" }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
        }

        // Create admin with hashed password
        const hashedPassword = await hashPassword(password);
        const admin = adminRepo.create({
            email,
            password: hashedPassword,
            role: AdminRole.SUPER_ADMIN,
        });
        await adminRepo.save(admin);

        // Auto-login: Generate JWT and set cookie
        const token = generateToken({
            adminId: admin.id,
            email: admin.email,
            role: admin.role,
        });
        await setAuthCookie(token);

        return NextResponse.json({
            success: true,
            message: "Admin created successfully",
            user: { id: admin.id, email: admin.email, role: admin.role }
        });
    } catch (error) {
        console.error("Registration failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
