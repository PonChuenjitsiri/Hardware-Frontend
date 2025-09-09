import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;
    const { pathname } = req.nextUrl;
    const isAuth = pathname === "/login";

    if (!token && !isAuth && pathname.startsWith("/home")) {
        const url = new URL("/login", req.url);
        url.searchParams.set("next", pathname + (req.nextUrl.search || ""));
        return NextResponse.redirect(url);
    }
    if (token && isAuth) {
        const next = req.nextUrl.searchParams.get("next") || "/home";
        return NextResponse.redirect(new URL(next, req.url));
    }
    return NextResponse.next();
}

export const config = { matcher: ["/login", "/home/:path*"] };