import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";


type Variant = "primary" | "secondary" | "ghost";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}


export default function Button({
    className,
    variant = "primary",
    leftIcon,
    rightIcon,
    children,
    ...props
}: Props) {
    const base =
        "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50";
    const styles: Record<Variant, string> = {
        primary: "bg-black text-white hover:bg-black/90",
        secondary: "bg-white text-gray-900 border hover:bg-gray-50",
        ghost: "text-gray-700 hover:bg-gray-100",
    };


    return (
        <button className={clsx(base, styles[variant], className)} {...props}>
            {leftIcon}
            {children}
            {rightIcon}
        </button>
    );
}