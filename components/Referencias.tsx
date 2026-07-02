"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { references } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function Referencias() {
  const { t } = useI18n();
  const [sel, setSel] = useState(0);
  const mobileCardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const items = references.map((r, i) => ({
    ...r,
    name: t.referencias.items[i]?.name ?? r.name,
    scope: t.referencias.items[i]?.scope ?? r.scope,
    points: t.referencias.items[i]?.points,
  }));

  const selected = items[sel];

  // Permite que «La gama» seleccione una tarjeta concreta por su id.
  useEffect(() => {
    const handler = (e: Event) => {
      const refId = (e as CustomEvent<string>).detail;
      const idx = references.findIndex((r) => r.id === refId);
      if (idx >= 0) setSel(idx);
    };
    window.addEventListener("referencias:select", handler as EventListener);
    return () => window.removeEventListener("referencias:select", handler as EventListener);
  }, []);

  // Abre la solución vinculada en «La gama» y desplaza hasta sus tarjetas.
  const goToGama = (target?: string) => {
    if (target) window.dispatchEvent(new CustomEvent("gama:select", { detail: target }));
    document.getElementById("gama-cards")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const others = items
    .map((r, i) => ({ r, i }))
    .filter(({ i }) => i !== sel);

  // En móvil, la tarjeta se expande en su propio sitio; desplazamos lo
  // justo para que quede visible bajo la cabecera fija.
  const selectMobile = (i: number) => {
    setSel(i);
    requestAnimationFrame(() => {
      const el = mobileCardRefs.current[i];
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <section id="referencias" className="scroll-mt-[74px] bg-mist border-t border-line">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-16 md:py-[120px]">
        <SectionLabel num="04" label={t.referencias.label} />
        <h2 className="font-display font-bold text-[26px] md:text-[50px] leading-[1.06] tracking-[-.02em] mb-12 max-w-[720px] balance">
          {t.referencias.title}
        </h2>

        <Reveal>
          {/* Móvil — acordeón: la ficha se despliega bajo la tarjeta pulsada */}
          <div id="referencias-cards" className="scroll-mt-[88px] flex flex-col gap-4 md:hidden">
            {items.map((r, i) => {
              const isSel = i === sel;
              return (
                <div
                  key={r.id}
                  ref={(el) => {
                    mobileCardRefs.current[i] = el;
                  }}
                  className={`bg-white border rounded-xl overflow-hidden transition-[border-color,box-shadow] duration-300 ${
                    isSel ? "border-brand shadow-sm" : "border-line"
                  }`}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSel}
                    onClick={() => selectMobile(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectMobile(i);
                      }
                    }}
                    className="min-h-[100px] flex items-stretch gap-3.5 text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    {r.image ? (
                      <div className="relative w-24 flex-none">
                        <Image src={r.image} alt={r.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 flex-none bg-[#eef1f0] flex items-center justify-center font-mono text-[11px] text-[#7c8483]">
                        {r.sol}
                      </div>
                    )}
                    <div className="flex-1 flex items-center justify-between gap-2 py-3 pr-4 min-w-0">
                      <div className="font-display font-semibold text-sm leading-snug line-clamp-2">
                        {r.name}
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`flex-none text-[#7c8483] transition-transform duration-300 ${
                          isSel ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  {isSel && (
                    <div className="border-t border-line px-4 pt-4 pb-5">
                      <p className="text-sm leading-relaxed text-[#4a5257] mb-3">{r.scope}</p>
                      {r.points && r.points.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {r.points.map((p) => (
                            <li key={p} className="text-sm leading-relaxed text-[#4a5257] flex gap-2.5">
                              <span className="text-brand font-bold flex-none leading-relaxed">·</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToGama(r.target);
                        }}
                        className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-brand hover:text-brand-dark no-underline cursor-pointer bg-transparent border-none p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                      >
                        {r.sol} →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Escritorio — tarjeta seleccionada + columna de miniaturas */}
          <div className="hidden md:flex gap-5">
            {/* Seleccionada — 75% de ancho y altura completa */}
            <div className="md:flex-[3_1_0%] min-w-0">
              <div
                className="flex flex-col md:flex-row-reverse bg-white border border-line rounded-2xl overflow-hidden shadow-sm md:h-[620px] transition-shadow duration-300"
              >
                {selected.image && (
                  <div className="relative md:w-[30%] flex-none h-[220px] md:h-auto">
                    <Image
                      src={selected.image}
                      alt={selected.name}
                      fill
                      className={`object-cover ${
                        selected.id === "ref-a4a44" ? "object-[14%_50%]" : "object-center"
                      }`}
                    />
                    <span className="absolute top-4 left-4 font-mono text-[11px] font-semibold text-white bg-brand/90 px-2.5 py-1 rounded-md tracking-[.04em]">
                      {selected.sol}
                    </span>
                  </div>
                )}
                <div className="md:w-[70%] p-6 md:p-10 flex flex-col">
                  <div className="font-display font-bold text-2xl md:text-3xl tracking-[-.01em] mb-4">
                    {selected.name}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a5257] mb-4">
                    {selected.scope}
                  </p>
                  {selected.points && selected.points.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {selected.points.map((p) => (
                        <li key={p} className="text-sm md:text-base leading-relaxed text-[#4a5257] flex gap-2.5">
                          <span className="text-brand font-bold flex-none leading-relaxed">·</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    type="button"
                    onClick={() => goToGama(selected.target)}
                    className="mt-auto self-start inline-flex items-center gap-2 font-mono text-sm font-semibold text-brand hover:text-brand-dark no-underline cursor-pointer bg-transparent border-none p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    {selected.sol} →
                  </button>
                </div>
              </div>
            </div>

            {/* Resto — columna 1×4 (25%), misma altura que la seleccionada */}
            <div className="md:flex-[1_1_0%] min-w-0 flex flex-col gap-4 md:h-[620px]">
              {others.map(({ r, i }) => (
                <div
                  key={r.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSel(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSel(i);
                    }
                  }}
                  className="md:flex-1 md:min-h-0 min-h-[100px] flex items-stretch gap-3.5 bg-white border border-line rounded-xl overflow-hidden text-left hover:border-brand hover:shadow-sm transition-[border-color,box-shadow] duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                >
                  {r.image ? (
                    <div className="relative w-24 md:w-28 flex-none">
                      <Image src={r.image} alt={r.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-24 md:w-28 flex-none bg-[#eef1f0] flex items-center justify-center font-mono text-[11px] text-[#7c8483]">
                      {r.sol}
                    </div>
                  )}
                  <div className="flex flex-col justify-center py-3 pr-4 min-w-0">
                    <div className="font-display font-semibold text-sm leading-snug line-clamp-2">
                      {r.name}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToGama(r.target);
                      }}
                      className="self-start font-mono text-[11px] text-brand font-semibold mt-1.5 bg-transparent border-none p-0 cursor-pointer hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      {r.sol} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
