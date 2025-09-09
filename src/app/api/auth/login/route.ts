import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        return NextResponse.json(
            { message: err.message || "Invalid credentials" },
            { status: r.status }
        );
    }

    const body = await r.json();
    const token: string | undefined =
        body?.data?.access_token ?? body?.access_token;

    if (!token) {
        return NextResponse.json(
            { message: "Login succeeded but no access_token in response" },
            { status: 500 }
        );
    }

    const res = NextResponse.json({
        status: "success",
        message: body?.message ?? "Login Successful",
    });

    res.cookies.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
    });

    return res;
}
