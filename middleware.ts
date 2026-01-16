import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that don't require authentication
const publicRoutes = [
    "/admin/login",
    "/api/admin/login",
    "/api/admin/register",
    "/api/setup",
];

// API routes that require authentication
const protectedApiRoutes = [
    "/api/resources",
    "/api/submissions",
    "/api/settings",
    "/api/analytics",
    "/api/upload",
    "/api/admin/logout",
    "/api/admin/me",
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if it's an admin page route (not API)
    const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/api");

    // Check if it's a protected API route
    const isProtectedApi = protectedApiRoutes.some(route => pathname.startsWith(route));

    // Check if it's a public route
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));

    // Get the auth token from cookies
    const authToken = request.cookies.get("plexi_admin_token")?.value;

    // If accessing admin pages (not login) without auth, redirect to login
    if (isAdminPage && !isPublicRoute && !authToken) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If accessing protected API routes without auth, return 401
    if (isProtectedApi && !authToken) {
        return NextResponse.json(
            { error: "Unauthorized", message: "Authentication required" },
            { status: 401 }
        );
    }

    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        "/admin/:path*",
        "/api/resources/:path*",
        "/api/submissions/:path*",
        "/api/settings/:path*",
        "/api/analytics/:path*",
        "/api/upload/:path*",
        "/api/admin/logout",
        "/api/admin/me",
    ],
};
