// src/app/api/user/profile/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";        // ensure Node runtime (not edge)
export const dynamic = "force-dynamic"; // never cache this route

export async function GET() {
  const token = (await cookies()).get("access_token")?.value;  // <- no await
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const base = process.env.NEXT_PUBLIC_API_BASE;       // e.g. http://localhost:3001
  if (!base) {
    return NextResponse.json({ message: "NEXT_PUBLIC_API_BASE not set" }, { status: 500 });
  }

  try {
    const r = await fetch(`${base}/user/profile`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });

    const body = await r.json().catch(() => ({}));
    const profile = body?.data ?? body;               // your Nest successResponse
    return NextResponse.json(profile, { status: r.status });
  } catch {
    return NextResponse.json({ message: "Upstream error" }, { status: 502 });
  }
}
