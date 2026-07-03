"use client";

import { useEffect, useRef } from "react";
import { evolutionYears, evolutionSeries } from "@/lib/content";

/**
 * Gráfico de área apilada (Chart.js) con la evolución de siniestros con
 * fauna 2015–2024. Se construye al entrar en el viewport: las capas suben
 * desde cero, escalonadas por especie y por año (animación solo por scroll).
 * Respeta prefers-reduced-motion y se etiqueta con t.problema.chartSpecies.
 */
export default function EvolucionChart({
  labels,
  locale,
  totalLabel,
}: {
  labels: string[];
  locale: string;
  totalLabel: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const built = useRef(false);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let chart: any = null;
    let cancelled = false;

    const build = () => {
      if (built.current) return;
      built.current = true;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      import("chart.js/auto").then(({ default: Chart }) => {
        if (cancelled || !canvasRef.current) return;
        const withAlpha = (hex: string, a: number) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r},${g},${b},${a})`;
        };
        const fmt = (n: number) => n.toLocaleString(locale);
        chart = new Chart(canvasRef.current, {
          type: "line",
          data: {
            labels: evolutionYears,
            datasets: evolutionSeries.map((s, i) => ({
              label: labels[i] ?? "",
              data: s.data,
              borderColor: s.color,
              backgroundColor: withAlpha(s.color, 0.5),
              borderWidth: 2,
              pointRadius: 2.5,
              pointHoverRadius: 5,
              pointBackgroundColor: s.color,
              pointBorderColor: "#fff",
              pointBorderWidth: 1.5,
              tension: 0.3,
              fill: "stack" as const,
            })),
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            animation: reduce
              ? false
              : {
                  duration: 900,
                  easing: "easeOutQuart",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  delay: (ctx: any) =>
                    ctx.type === "data" ? ctx.dataIndex * 55 + ctx.datasetIndex * 350 : 0,
                },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#16191b",
                titleFont: { family: "IBM Plex Mono", size: 11 },
                bodyFont: { family: "IBM Plex Mono", size: 11 },
                padding: 10,
                cornerRadius: 6,
                callbacks: {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  label: (item: any) => `${item.dataset.label}: ${fmt(item.parsed.y)}`,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  footer: (items: any[]) =>
                    `${totalLabel}: ${fmt(items.reduce((s, i) => s + i.parsed.y, 0))}`,
                },
                footerFont: { family: "IBM Plex Mono", size: 11, weight: 500 },
                footerColor: "#9db6e8",
              },
            },
            scales: {
              y: {
                stacked: true,
                beginAtZero: true,
                grid: { color: "rgba(22,25,27,.06)" },
                ticks: {
                  color: "#8a9291",
                  font: { family: "IBM Plex Mono", size: 10 },
                  callback: (v) => fmt(Number(v)),
                },
              },
              x: {
                grid: { display: false },
                ticks: { color: "#8a9291", font: { family: "IBM Plex Mono", size: 11 } },
              },
            },
          },
        });
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      build();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          build();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      chart?.destroy();
    };
  }, [labels, locale, totalLabel]);

  return (
    <div className="relative w-full h-[160px] sm:h-[200px]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="2015→2024: 18.587→36.087"
      />
    </div>
  );
}
