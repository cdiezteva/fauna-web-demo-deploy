"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import DonutChart from "./DonutChart";
import CountUp from "./CountUp";
import EvolucionChart from "./EvolucionChart";
import {
  stats,
  speciesShare,
  lynx,
  lynxSourceUrl,
  evolutionTotals,
  evolutionSourceUrl,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/translations";

const LOCALES: Record<Lang, string> = {
  es: "es-ES",
  en: "en-GB",
  pt: "pt-PT",
  ca: "ca-ES",
};

// Iconos alineados con el orden de speciesShare: Jabalíes, Corzos, Caninos, Otras especies.
const speciesIcons = [
  "/images/icons/jabali.png",
  "/images/icons/corzo.png",
  "/images/icons/perro.png",
  "/images/icons/conejo.png",
];

// Iconos de cada cifra (mismo orden que `stats`), teñidos del azul de marca (#3B66C2).
const statIcons: string[] = [
  "/images/icons/accidente-fauna.png",
  "/images/icons/autovia.png",
  "/images/icons/road.png",
  "/images/icons/uptrend.png",
];

// Solo animamos las cifras puramente numéricas: porcentajes (p. ej. "88%")
// y enteros con separador de miles (p. ej. "36.087"); "≈ 1/3" y "×2" se
// muestran tal cual.
function asPercent(figure: string): number | null {
  const m = /^(\d+)%$/.exec(figure);
  return m ? Number(m[1]) : null;
}
function asThousands(figure: string): number | null {
  const m = /^\d{1,3}(\.\d{3})+$/.exec(figure);
  return m ? Number(figure.replace(/\./g, "")) : null;
}

/** Gauge radial del lince: el arco se dibuja al entrar en el viewport. */
function LinceGauge({ label, locale }: { label: string; locale: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const R = 70;
  const C = 2 * Math.PI * R;
  const pct = lynx.pctTenths / 1000; // 0.779

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setOn(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

  return (
    <div ref={ref} className="relative w-[170px] h-[170px] flex-none">
      <svg width="170" height="170" viewBox="0 0 170 170" className="-rotate-90">
        <circle cx="85" cy="85" r={R} fill="none" stroke="#EAF0FA" strokeWidth="16" />
        <circle
          cx="85"
          cy="85"
          r={R}
          fill="none"
          stroke="#3B66C2"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={on ? `${(pct * C).toFixed(1)} ${C}` : `0 ${C}`}
          style={{ transition: "stroke-dasharray 1.6s cubic-bezier(.2,.7,.2,1) .3s" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <b className="font-display font-bold text-[34px] tracking-[-.02em] text-brand">
          <CountUp
            value={lynx.pctTenths}
            format={(n) =>
              (n / 10).toLocaleString(locale, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })
            }
          />
          %
        </b>
        <span className="font-mono text-[9.5px] tracking-[.1em] uppercase text-[#8a9291] mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Problema() {
  const { t, lang } = useI18n();
  const locale = LOCALES[lang];
  const formatLocale = (n: number) => n.toLocaleString(locale);
  const [hoveredSpecies, setHoveredSpecies] = useState<number | null>(null);

  return (
    <section id="problema" className="scroll-mt-[74px] bg-white">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-16 md:py-[120px]">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3 font-mono text-[17px] tracking-[.12em] uppercase text-brand mb-6">
            <span>01</span>
            <span className="text-[#c6cccb]">/</span>
            <span>{t.problema.label}</span>
          </div>
          <h2 className="font-display font-bold text-[26px] md:text-[46px] leading-[1.1] tracking-[-.02em] mb-5 max-w-[760px] mx-auto balance">
            {t.problema.title}
          </h2>
          <p className="text-base leading-relaxed text-[#4a5257] max-w-[620px] mx-auto">
            {t.problema.subtitle}
          </p>
        </Reveal>

        {/* Top 4 · tarjetas de cifras (iconos igualados por alto) */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-14">
            {stats.map((s, i) => {
              const pct = asPercent(s.figure);
              const thousands = asThousands(s.figure);
              return (
                <div
                  key={s.figure + i}
                  className="group bg-white border border-line rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-[0_10px_30px_-12px_rgba(59,102,194,.25)] motion-safe:hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={statIcons[i]}
                      alt=""
                      aria-hidden
                      width={64}
                      height={64}
                      className="flex-none h-10 md:h-11 w-auto transition-transform duration-300 ease-out motion-safe:group-hover:scale-110"
                    />
                    <div className="font-display font-bold text-[26px] md:text-[32px] tracking-[-.01em] text-brand transition-colors duration-300 group-hover:text-brand-dark">
                      {pct !== null ? (
                        <><CountUp value={pct} />%</>
                      ) : thousands !== null ? (
                        <CountUp value={thousands} format={formatLocale} />
                      ) : (
                        s.figure
                      )}
                    </div>
                  </div>
                  <div className="text-[13px] leading-snug text-[#6b7378] mt-2">
                    {t.problema.statLabels[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Medio · especies + lince */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
          <Reveal delay={160} className="h-full">
            <div className="group/card border border-line rounded-xl p-6 md:p-8 h-full transition-all duration-300 hover:border-brand/30 hover:shadow-[0_10px_30px_-12px_rgba(59,102,194,.2)] motion-safe:hover:-translate-y-1">
              <div className="font-mono text-[11px] tracking-[.14em] uppercase text-[#8a9291] mb-6">
                {t.problema.speciesTitle}
              </div>
              <div className="flex items-center gap-6 md:gap-8 flex-wrap">
                <div className="transition-transform duration-500 ease-out motion-safe:group-hover/card:scale-105">
                  <DonutChart data={speciesShare} size={180} thickness={26} activeIndex={hoveredSpecies} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
                  {speciesShare.map((s, i) => (
                    <div
                      key={s.color + i}
                      onMouseEnter={() => setHoveredSpecies(i)}
                      onMouseLeave={() => setHoveredSpecies(null)}
                      className="group/row grid grid-cols-[26px_1fr_auto] items-center gap-2.5 rounded-lg px-2 -mx-2 py-1 transition-colors duration-200 hover:bg-mist/70"
                    >
                      <Image
                        src={speciesIcons[i]}
                        alt=""
                        width={32}
                        height={32}
                        className="w-[26px] h-[26px] object-contain transition-transform duration-300 ease-out motion-safe:group-hover/row:scale-125"
                      />
                      <span className="flex items-center gap-2 text-sm text-[#4a5257]">
                        <span
                          className="w-[9px] h-[9px] rounded-full flex-none transition-transform duration-300 motion-safe:group-hover/row:scale-125"
                          style={{ backgroundColor: s.color }}
                        />
                        {t.problema.species[i]}
                      </span>
                      <span
                        className="font-display font-bold text-lg transition-transform duration-300 motion-safe:group-hover/row:scale-110"
                        style={{
                          color:
                            s.color === "#d8dcdb"
                              ? "#9aa19f"
                              : s.color === "#A9BFCF"
                              ? "#8ba4b6"
                              : s.color,
                        }}
                      >
                        <CountUp value={s.pct} />%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={220} className="h-full">
            <div className="group/card border border-line rounded-xl p-6 md:p-8 h-full transition-all duration-300 hover:border-brand/30 hover:shadow-[0_10px_30px_-12px_rgba(59,102,194,.2)] motion-safe:hover:-translate-y-1">
              <div className="font-mono text-[11px] tracking-[.14em] uppercase text-[#8a9291] mb-6">
                {t.problema.linceTag}
              </div>
              <div className="flex items-center gap-6 md:gap-8 flex-wrap">
                <div className="transition-transform duration-500 ease-out motion-safe:group-hover/card:scale-105">
                  <LinceGauge label={t.problema.linceGauge} locale={locale} />
                </div>
                <div className="flex-1 min-w-[210px]">
                  <div className="flex items-baseline gap-3 py-3 border-b border-mist">
                    <b className="font-display font-bold text-[26px] text-ink min-w-[64px]">
                      <CountUp value={lynx.deaths} />
                    </b>
                    <span className="text-[13px] leading-snug text-[#6b7378]">
                      {t.problema.linceDeaths}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 py-3">
                    <b className="font-display font-bold text-[26px] text-ink min-w-[64px]">
                      <CountUp value={lynx.roadkill} />
                    </b>
                    <span className="text-[13px] leading-snug text-[#6b7378]">
                      {t.problema.linceRoadkill}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Abajo · evolución 2015–2024 (mismo ancho que las tarjetas, animación por scroll) */}
        <Reveal delay={120}>
          <div className="border border-line rounded-xl p-6 md:p-10 mt-4 md:mt-5 bg-white">
            <div className="font-mono text-[11px] tracking-[.14em] uppercase text-[#8a9291]">
              {t.problema.evoTitle}
            </div>
            <div className="font-display font-bold text-[21px] md:text-[26px] tracking-[-.02em] mt-2.5 mb-1.5">
              {t.problema.evoDe}{" "}
              <span className="text-brand">
                <CountUp value={evolutionTotals.from} format={formatLocale} />
              </span>{" "}
              {t.problema.evoA}{" "}
              <span className="text-brand">
                <CountUp value={evolutionTotals.to} format={formatLocale} />
              </span>{" "}
              {t.problema.evoTail}
            </div>
            <div className="flex flex-wrap font-mono text-xs text-[#4a5257] mt-3 mb-4">
              {[3, 2, 0, 1].map((i) => (
                <span key={i} className="inline-flex items-center gap-1.5 mr-4 mb-1">
                  <span
                    className="w-[11px] h-[11px] rounded-[3px] inline-block"
                    style={{
                      backgroundColor: ["#A9BFCF", "#d8dcdb", "#6F93D6", "#1F4A9E"][i],
                    }}
                  />
                  {t.problema.chartSpecies[i]}
                </span>
              ))}
            </div>
            <EvolucionChart
              labels={t.problema.chartSpecies}
              locale={locale}
              totalLabel="Total"
            />
          </div>
        </Reveal>

        <p className="text-xs text-center text-[#8a9291] mt-6 font-mono leading-loose">
          <a
            href="https://www.dgt.es/menusecundario/dgt-en-cifras/dgt-en-cifras-resultados/dgt-en-cifras-detalle/Las-principales-cifras-de-la-siniestralidad-vial-2024/"
            target="_blank"
            rel="noreferrer"
            className="text-[#8a9291] no-underline hover:text-brand hover:underline"
          >
            {t.problema.source}
          </a>
          <br />
          <a
            href={evolutionSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#8a9291] no-underline hover:text-brand hover:underline"
          >
            {t.problema.sourceEvolucion}
          </a>
          <br />
          <a
            href={lynxSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#8a9291] no-underline hover:text-brand hover:underline"
          >
            {t.problema.sourceMiteco}
          </a>
        </p>
      </div>
    </section>
  );
}
