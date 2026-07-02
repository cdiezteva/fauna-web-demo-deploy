"use client";

import { useEffect, useRef, useState } from "react";

type Segment = { pct: number; color: string };

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
}: {
  data: Segment[];
  size?: number;
  thickness?: number;
  duration?: number;
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
        {data.map((s, i) => {
          const len = (s.pct / 100) * C;
          const startDeg = (acc / 100) * 360 - 90; // -90 → starts at the top
          acc += s.pct;
          return (
            <circle
              key={i}
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              transform={`rotate(${startDeg} ${c} ${c})`}
              strokeDasharray={`${len} ${C}`}
            />
          );
        })}
      </g>
    </svg>
  );
}
