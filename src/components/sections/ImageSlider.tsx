"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";

type Slide = { src: string; alt: string };

export default function ImageSlider({
  slides = [
    { src: "/images/hardwarelab1.jpg", alt: "" },
    { src: "/images/hardwarelab2.png", alt: "" },
    { src: "/images/hardwarelab3.jpg", alt: "" },
    { src: "/images/hardwarelab4.jpg", alt: "" },
  ],
  intervalMs = 3500,
}: { slides?: Slide[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    timer.current && window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [slides.length, intervalMs]);

  function pause() { if (timer.current) { window.clearInterval(timer.current); timer.current = null; } }
  function resume() {
    if (!timer.current) {
      timer.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, intervalMs);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      setIndex((i) => (dx < 0 ? (i + 1) % slides.length : (i - 1 + slides.length) % slides.length));
    }
    touchStartX.current = null;
  }

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div
          className="relative overflow-hidden rounded-2xl border bg-white shadow-sm"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="HardwareLab gallery"
          ref={containerRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={s.src} className="relative aspect-[16/9] w-full shrink-0">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <button
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border bg-white/80 px-3 py-2 text-sm shadow hover:bg-white"
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border bg-white/80 px-3 py-2 text-sm shadow hover:bg-white"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
          >
            ›
          </button>

          <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full border bg-white/80 shadow ${i === index ? "scale-110 bg-white" : "opacity-60"}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
