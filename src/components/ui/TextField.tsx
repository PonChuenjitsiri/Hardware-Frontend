import type { InputHTMLAttributes } from "react";
import clsx from "clsx";


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
}


export default function TextField({ label, hint, className, ...props }: Props) {
    return (
        <label className="block">
            {label && <span className="mb-1 block text-sm text-gray-700">{label}</span>}
            <input
                {...props}
                className={clsx(
                    "w-full rounded-lg border px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10",
                    className
                )}
            />
            {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
        </label>
    );
}