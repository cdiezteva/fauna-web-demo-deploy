"use client";

import { useEffect, useRef, useState } from "react";

type Segment = { pct: number; color: string };

/** Oscurece un color hex multiplicando sus canales (f < 1 = más oscuro). */
function shade(hex: string, f: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * f));
  const b = Math.min(255, Math.round((n & 255) * f));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/**
 * Animated donut: the colored segments are drawn statically and revealed in a
 * single pass by an arc-shaped mask that sweeps the whole ring once.
 * One continuous animation (not per-color). Triggers on viewport entry and
 * respects prefers-reduced-motion.
 */
export default function DonutChart({
  data,
  size = 120,
  thickness = 22,
  duration = 1.1,
  activeIndex = null,
}: {
  data: Segment[];
  size?: number;
  thickness?: number;
  duration?: number;
  /** Índice del segmento a resaltar (p. ej. al pasar el ratón por su fila en la leyenda). */
  activeIndex?: number | null;
}) {
  const [on, setOn] = useState(false);
  const [reduce, setReduce] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const c = size / 2;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  const maskId = "donut-reveal";
  let acc = 0;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="flex-none"
      role="img"
      aria-label="Distribución por especies"
    >
      <defs>
        {/* White arc that grows from 0 to the full circumference: reveals the
            colored ring in a single pass. */}
        <mask id={maskId}>
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="#fff"
            strokeWidth={thickness}
            transform={`rotate(-90 ${c} ${c})`}
            style={{
              strokeDasharray: `${C} ${C}`,
              strokeDashoffset: on || reduce ? 0 : C,
              transition: reduce
                ? "none"
                : `stroke-dashoffset ${duration}s cubic-bezier(.33,0,.2,1)`,
            }}
          />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        {data
          .map((s, i) => {
            const len = (s.pct / 100) * C;
            const startDeg = (acc / 100) * 360 - 90; // -90 → starts at the top
            acc += s.pct;
            return { ...s, i, len, startDeg };
          })
          // El segmento activo se dibuja el último para quedar por encima al engrosarse.
          .sort((a, b) => (a.i === activeIndex ? 1 : b.i === activeIndex ? -1 : 0))
          .map((s) => {
            const isActive = s.i === activeIndex;
            const hovering = activeIndex != null;
            const isDimmed = hovering && !isActive;
            // Al pasar el ratón oscurecemos los tonos para que los azules más
            // claros se distingan con nitidez; el resaltado se apoya en el grosor
            // y en una atenuación suave (no en un desvanecido que los borraría).
            const stroke = hovering ? shade(s.color, 0.68) : s.color;
            return (
              <circle
                key={s.i}
                cx={c}
                cy={c}
                r={r}
                fill="none"
                stroke={stroke}
                transform={`rotate(${s.startDeg} ${c} ${c})`}
                strokeDasharray={`${s.len} ${C}`}
                style={{
                  strokeWidth: isActive ? thickness + 6 : thickness,
                  opacity: isDimmed ? 0.7 : 1,
                  transition: "stroke-width .3s cubic-bezier(.2,.7,.2,1), opacity .3s ease, stroke .3s ease",
                }}
              />
            );
          })}
      </g>
    </svg>
  );
}
