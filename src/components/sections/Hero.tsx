"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
            <Container className="py-16 sm:py-20 lg:py-28">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-gray-700">
                            HardwareLab
                        </span>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                            Hardware OHaUAD
                        </h1>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Hardware OHaUAD is your P Pon Chuenjit Sud Lor mak mak
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/login"
                                className="inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/90"
                            >
                                Get started
                            </Link>
                            <Link
                                href="#about"
                                className="inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative aspect-[16/9] w-full">
                            <Image
                                src="/images/hardwarelab.jpg"   
                                alt="Hardware Lab"
                                fill
                                sizes="100vw"
                                className="object-cover rounded-2xl shadow-lg"
                            />
                        </div>

                        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-100 via-transparent to-teal-100 blur-2xl" />
                    </div>
                </div>
            </Container>
        </section>
    );
}
