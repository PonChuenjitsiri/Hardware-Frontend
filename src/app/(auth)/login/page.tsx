"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";


const Schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "At least 6 characters"),
    remember: z.boolean().optional(),
});


type FormValues = z.infer<typeof Schema>;


export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const search = useSearchParams();
    const next = decodeURIComponent(search.get("next") || "/home");


    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(Schema),
        defaultValues: { email: "", password: "", remember: true },
    });


    const onSubmit = async (values: FormValues) => {
        setError(null);
        setLoading(true);
        try {
            const r = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!r.ok) {
                const j = await r.json().catch(() => ({}));
                throw new Error(j.message || "Login failed");
            }
            router.replace(next);
            router.refresh();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
                <h1 className="text-2xl font-semibold">Sign in</h1>
                <p className="text-sm text-gray-500 mb-6">Use your account credentials</p>


                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
                            placeholder="••••••••"
                            {...register("password")}
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                    </div>


                    <div className="flex items-center justify-between">
                        <label className="inline-flex items-center gap-2 text-sm">
                            <input type="checkbox" className="size-4" {...register("remember")} />
                            Remember me
                        </label>
                        <a className="text-sm text-blue-600 hover:underline" href="#">Forgot password?</a>
                    </div>


                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>


                <p className="mt-6 text-center text-sm text-gray-500">
                    Don’t have an account? <a className="text-blue-600 hover:underline" href="#">Contact admin</a>
                </p>
            </div>
        </main>
    );
}