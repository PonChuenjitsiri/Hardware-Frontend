import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }


    const apiBase = process.env.NEXT_PUBLIC_API_BASE!;
    const cookieName = process.env.JWT_COOKIE_NAME || "auth_token";


    try {
        // Call NestJS login endpoint (expects { access_token, user })
        const r = await fetch(`${apiBase}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });


        if (!r.ok) {
            const err = await r.json().catch(() => ({}));
            return NextResponse.json({ message: err.message || "Invalid credentials" }, { status: r.status });
        }


        const { access_token, user } = await r.json();


        const res = NextResponse.json({ user });
        // Set secure, httpOnly cookie so JS can’t read it
        res.cookies.set(cookieName, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60, // 1 hour
        });


        return res;
    } catch (e) {
        return NextResponse.json({ message: "Auth server unavailable" }, { status: 502 });
    }
}