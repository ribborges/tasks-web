import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Skip middleware for specific routes (static files, API routes, etc.)
    if (
        request.nextUrl.pathname.startsWith("/_next") ||
        request.nextUrl.pathname.startsWith("/api") ||
        request.nextUrl.pathname.startsWith("/favicon.ico") ||
        request.nextUrl.pathname.startsWith("/icon.png") ||
        request.nextUrl.pathname.startsWith("/icon.svg")
    ) {
        return NextResponse.next();
    }

    const token = request.cookies.get("token");
    const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
    const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

    if (!token && !isAuthPage) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (token && !isDashboardPage) {
        // Redirect to dashboard if authenticated and trying to access auth page
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/dashboard/:path*", "/auth", "/"],
};