import type { ReactNode } from "react";


export default function Section({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                {actions}
            </div>
            {children}
        </section>
    );
}