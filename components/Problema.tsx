"use client";

import Reveal from "./Reveal";
import DonutChart from "./DonutChart";
import CountUp from "./CountUp";
import { stats, speciesShare } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

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
const formatThousands = (n: number) => n.toLocaleString("es-ES");

export default function Problema() {
  const { t } = useI18n();

  return (
    <section id="problema" className="scroll-mt-[74px] bg-white">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-16 md:py-[120px]">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3 font-mono text-xs tracking-[.14em] uppercase text-brand mb-6">
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

        <Reveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-14">
            {stats.map((s, i) => {
              const pct = asPercent(s.figure);
              const thousands = asThousands(s.figure);
              return (
              <div
                key={s.figure + i}
                className="bg-white border border-line rounded-xl p-5 md:p-6"
              >
                <div className="font-display font-bold text-[26px] md:text-[32px] tracking-[-.01em] text-brand">
                  {pct !== null ? (
                    <><CountUp value={pct} />%</>
                  ) : thousands !== null ? (
                    <CountUp value={thousands} format={formatThousands} />
                  ) : (
                    s.figure
                  )}
                </div>
                <div className="text-[13px] leading-snug text-[#6b7378] mt-2">
                  {t.problema.statLabels[i]}
                </div>
              </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="border border-line rounded-xl p-6 md:p-9 mt-5">
            <div className="flex items-center gap-8 md:gap-12 flex-wrap">
              <DonutChart data={speciesShare} />

              <div className="font-mono text-[11px] tracking-[.08em] uppercase text-[#8a9291] leading-relaxed max-w-[120px]">
                {t.problema.speciesTitle}
              </div>

              <div className="flex gap-6 md:gap-12 flex-wrap flex-1">
                {speciesShare.map((s, i) => (
                  <div key={s.color + i}>
                    <div className="flex items-center gap-2 text-sm text-[#4a5257] mb-1.5 whitespace-nowrap">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-none"
                        style={{ backgroundColor: s.color }}
                      />
                      {t.problema.species[i]}
                    </div>
                    <div className="font-display font-bold text-2xl text-ink">
                      <CountUp value={s.pct} />%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <p className="text-xs text-center text-[#8a9291] mt-6 font-mono">
          <a
            href="https://www.dgt.es/menusecundario/dgt-en-cifras/dgt-en-cifras-resultados/dgt-en-cifras-detalle/Las-principales-cifras-de-la-siniestralidad-vial-2024/"
            target="_blank"
            rel="noreferrer"
            className="text-[#8a9291] no-underline hover:text-brand hover:underline"
          >
            {t.problema.source}
          </a>
        </p>
      </div>
    </section>
  );
}
