"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

/**
 * Sección compacta (sin numerar) entre "El problema" y "La gama":
 * flujo Detecta · Alerta · Protege con animación de información
 * desplazándose de izquierda a derecha.
 */

// Detecta: anillo/diana (antes era el icono de Alerta)
const IconDetecta = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="7.5" fill="none" stroke="#4f83db" strokeWidth="3.4" />
    <circle cx="12" cy="12" r="2.6" fill="#9dbdf0" />
  </svg>
);

// Alerta: triángulo con signo de exclamación
const IconAlerta = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 4.5 21 19.5 3 19.5 Z"
      fill="none"
      stroke="#5f8fe0"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <line x1="12" y1="10" x2="12" y2="14.5" stroke="#9dbdf0" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="17.2" r="1.15" fill="#9dbdf0" />
  </svg>
);

// Protege: escudo
const IconProtege = () => (
  <svg width="42" height="44" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3 20 6 V11.5 C20 16.4 16.6 19.7 12 21 C7.4 19.7 4 16.4 4 11.5 V6 Z"
      fill="none"
      stroke="#5f8fe0"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M9 12 11.2 14.2 15 10" fill="none" stroke="#9dbdf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = [IconDetecta, IconAlerta, IconProtege];
const ACTIVE = [false, true, false];

export default function FlujoDeteccion() {
  const { t } = useI18n();
  const steps = t.flujo.steps.map((s, i) => ({
    n: i + 1,
    title: s.title,
    sub: s.sub,
    Icon: ICONS[i],
    active: ACTIVE[i],
  }));
  return (
    <section className="bg-[#eef2f7] border-t border-b border-line">
      <div className="max-w-[1000px] mx-auto px-5 md:px-11 py-16 md:py-24 text-center">
        <Reveal className="text-center">
          <h2 className="font-display font-bold text-[26px] md:text-[44px] tracking-[-.02em] leading-[1.05] mb-4">
            {t.flujo.title}
          </h2>
          <p className="text-base leading-relaxed text-[#5f7286] max-w-[560px] mx-auto mb-10 md:mb-16">
            {t.flujo.sub1}
            <span className="text-brand font-medium">AVIZOR</span>
            {t.flujo.sub2}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative flex items-start justify-between gap-4 max-w-[820px] mx-auto">
            {/* Línea discontinua + puntos animados (detrás de los círculos) */}
            <div className="pointer-events-none absolute left-[15%] right-[15%] top-10 md:top-14 z-0">
              <div className="relative border-t-2 border-dashed border-[#c3d0dd]">
                <span className="flow-dot absolute -top-[6px] block w-3 h-3 rounded-full bg-brand shadow-[0_0_12px_3px_rgba(59,102,194,.55)]" />
                <span className="flow-dot-2 absolute -top-[6px] block w-3 h-3 rounded-full bg-brand shadow-[0_0_12px_3px_rgba(59,102,194,.55)]" />
              </div>
            </div>

            {steps.map((s) => (
              <div key={s.n} className="relative z-10 flex flex-col items-center flex-1 min-w-0">
                <div className="relative">
                  {/* Halo del paso activo */}
                  {s.active && (
                    <span className="absolute -inset-[7px] rounded-full border-[6px] border-white shadow-[0_0_22px_rgba(59,102,194,.22)]" />
                  )}
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#0f2038] flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(15,32,56,.5)]">
                    <s.Icon />
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand text-white text-xs font-semibold flex items-center justify-center border-2 border-[#eef2f7]">
                      {s.n}
                    </span>
                  </div>
                </div>
                <div className="font-display font-bold text-base md:text-xl mt-5">
                  {s.title}
                </div>
                <div className="font-mono text-xs text-[#8a9291] mt-2 tracking-[.02em]">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
