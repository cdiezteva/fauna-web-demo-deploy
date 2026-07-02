"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cuenta ascendente sobre una CIFRA con formato: extrae el primer número del
 * texto (p. ej. "36.087", "88%", "≈ 1/3", "×2"), lo anima de 0 → valor y
 * conserva el prefijo, el sufijo y el separador de miles (es-ES).
 * Se dispara al entrar en el viewport y respeta prefers-reduced-motion.
 */
export default function AnimatedFigure({
  text,
  duration = 1400,
}: {
  text: string;
  duration?: number;
}) {
  const m = text.match(/^([^\d]*)([\d.,]*\d)?(.*)$/s);
  const prefix = m?.[1] ?? "";
  const numStr = m?.[2] ?? "";
  const suffix = m?.[3] ?? "";
  const hasNumber = numStr.length > 0;
  const grouped = /^\d{1,3}(\.\d{3})+$/.test(numStr); // miles con punto (es-ES)
  const target = hasNumber ? parseInt(numStr.replace(/[.,]/g, ""), 10) : 0;

  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!hasNumber) return;
    const el = ref.current;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setN(target);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setN(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setN(target);
      };
      requestAnimationFrame(tick);
    };

    if (!el || typeof IntersectionObserver === "undefined") {
      run();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, hasNumber]);

  if (!hasNumber) return <span>{text}</span>;

  const val = Math.round(n);
  const shown = grouped ? val.toLocaleString("es-ES") : String(val);

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
