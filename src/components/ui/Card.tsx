import type { ReactNode } from "react";
import clsx from "clsx";


export function Card({ className, children }: { className?: string; children: ReactNode }) {
    return <div className={clsx("rounded-2xl border bg-white p-5 shadow-sm", className)}>{children}</div>;
}


export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="mb-4">
            <h3 className="text-base font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
    );
}


export function CardContent({ children }: { children: ReactNode }) {
    return <div className="space-y-3">{children}</div>;
}


export function CardFooter({ children }: { children: ReactNode }) {
    return <div className="mt-4 flex items-center justify-end gap-2">{children}</div>;
}