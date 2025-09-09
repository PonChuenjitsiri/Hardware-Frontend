"use client"

import type { ReactNode } from "react";
import Topbar from "@/components/nav/Topbar";


export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-dvh bg-gray-50">
            <Topbar />
            <main className="mx-auto max-w-7xl p-6">{children}</main>
        </div>
    );
}