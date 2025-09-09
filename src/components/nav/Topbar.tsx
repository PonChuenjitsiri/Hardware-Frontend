// src/components/nav/Topbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

type Profile = { email?: string; userName?: string } | null;

export default function Topbar() {
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/user/profile", { cache: "no-store" })
      .then(async (r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (mounted) setProfile(data);
      })
      .catch(() => {
        if (mounted) setProfile(null);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/images/hardware-logo.png" alt="Hardware Lab" width={28} height={28} priority />
          <span className="font-semibold">Hardware Lab</span>
        </Link>

        {/* your nav (optional) */}
        {/* <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/dashboard">Home</Link>
          <Link className="hover:underline" href="#">Orders</Link>
          <Link className="hover:underline" href="#">Inventory</Link>
        </nav> */}

        <div className="flex items-center gap-3 text-sm">
          {loading ? (
            <span className="text-gray-500">…</span>
          ) : profile ? (
            <>
              <span className="text-gray-600">{profile.userName ?? profile.email}</span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="hover:underline">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
