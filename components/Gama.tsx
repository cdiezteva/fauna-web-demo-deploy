"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import MapaCollserola from "./MapaCollserola";
import { gama } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

// Carrusel automático: avanza cada ADVANCE_MS; al interactuar se pausa y
// se reanuda tras IDLE_MS de inactividad.
const ADVANCE_MS = 4000;
const IDLE_MS = 17000;

export default function Gama() {
  const { t } = useI18n();
  // Combina la estructura (colores, imágenes, códigos) con el texto traducido.
  const items = gama.map((g, i) => ({ ...g, ...t.gama.items[i] }));

  const [active, setActive] = useState(gama[0].id);
  const [auto, setAuto] = useState(true);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeItem = items.find((g) => g.id === active) ?? items[0];

  useEffect(() => {
    if (!auto) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = setInterval(() => {
      setActive((cur) => {
        const i = gama.findIndex((g) => g.id === cur);
        return gama[(i + 1) % gama.length].id;
      });
    }, ADVANCE_MS);
    return () => clearInterval(timer);
  }, [auto]);

  useEffect(() => () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
  }, []);

  // Permite que otras secciones (p. ej. Referencias) abran una solución concreta.
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!gama.some((g) => g.id === id)) return;
      setActive(id);
      setAuto(false);
      if (resumeRef.current) clearTimeout(resumeRef.current);
      resumeRef.current = setTimeout(() => setAuto(true), IDLE_MS);
    };
    window.addEventListener("gama:select", handler as EventListener);
    return () => window.removeEventListener("gama:select", handler as EventListener);
  }, []);

  const pauseAuto = () => {
    setAuto(false);
    if (resumeRef.current) clearTimeout(resumeRef.current);
  };
  const scheduleResume = () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setAuto(true), IDLE_MS);
  };
  const handleSelect = (id: string) => {
    setActive(id);
    pauseAuto();
    scheduleResume();
  };

  // Enlace inverso: abre la tarjeta correspondiente en «Referencias».
  const goToReferencia = (refId: string) => {
    window.dispatchEvent(new CustomEvent("referencias:select", { detail: refId }));
    document.getElementById("referencias-cards")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="gama" className="scroll-mt-[74px] bg-mist border-t border-b border-line">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-16 md:py-[120px]">
        <Reveal>
          <SectionLabel num="02" label={t.gama.label} />
          <h2 className="font-display font-bold text-[26px] md:text-[50px] leading-[1.06] tracking-[-.02em] mb-4 max-w-[760px] balance">
            {t.gama.title}
          </h2>
          <p className="text-base leading-relaxed text-[#4a5257] max-w-[600px] mb-12">
            {t.gama.subtitle}
          </p>
        </Reveal>

        <Reveal delay={120}>
        <div
          id="gama-cards"
          className="scroll-mt-[88px] flex flex-col md:flex-row flex-wrap border border-[#dde2e1] rounded-t-2xl overflow-hidden bg-white shadow-sm"
          onMouseEnter={pauseAuto}
          onMouseLeave={scheduleResume}
        >
          {items.map((g) => {
            const isActive = g.id === active;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => handleSelect(g.id)}
                className="group relative overflow-hidden text-left cursor-pointer text-white border-none font-sans flex flex-col justify-between px-5 py-7 min-w-[130px] min-h-[220px] md:min-h-[500px] border-b md:border-b-0 md:border-r border-white/10 last:border-b-0 md:last:border-r-0 transition-[flex-grow,box-shadow] duration-[450ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2"
                style={{
                  flexGrow: isActive ? 3 : 1,
                  flexShrink: 1,
                  flexBasis: 0,
                  backgroundColor: g.tint,
                  backgroundImage: `${
                    isActive
                      ? "linear-gradient(180deg, transparent 45%, rgba(0,0,0,.7) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.1) 45%, rgba(0,0,0,.55) 100%)"
                  }, url(${g.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: g.id === "sol-li" ? "35% center" : "center",
                  boxShadow: isActive ? "inset 0 0 0 2px #A9BFCF" : "none",
                }}
              >
                {/* Oscurece la imagen de las tarjetas no seleccionadas (el título queda por encima). */}
                {!isActive && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-black/55 group-hover:bg-black/30 transition-colors duration-[450ms]"
                  />
                )}
                <div
                  className={`relative z-10 font-display font-bold tracking-[-.01em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,.8),0_0_2px_rgba(0,0,0,.5)] transition-[font-size] duration-300 ${
                    isActive ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
                  }`}
                >
                  {g.code}
                </div>

                {isActive && (
                  <div className="relative z-10 animate-fadeUp">
                    <div className="text-lg md:text-xl font-semibold leading-snug text-white [text-shadow:0_1px_12px_rgba(0,0,0,.9)]">
                      {g.ambito}
                    </div>
                    <div className="font-mono text-sm text-white/90 tracking-[.02em] mt-2.5 [text-shadow:0_1px_10px_rgba(0,0,0,.9)]">
                      {g.solName}
                    </div>
                    <div className="mt-4 flex items-center gap-2.5 flex-wrap">
                      <span className="inline-block font-mono text-xs tracking-[.1em] uppercase text-white border border-white/40 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {g.tagline}
                      </span>
                      <span className="w-[9px] h-[9px] rounded-full bg-accent" />
                    </div>
                    <div className="h-[3px] bg-accent rounded-full mt-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div
          id="gama-detail"
          onMouseEnter={pauseAuto}
          onMouseLeave={scheduleResume}
          className="scroll-mt-[88px] bg-white border border-t-0 border-[#dde2e1] rounded-b-2xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-stretch">
            <div className="md:flex-[5_1_0%] min-w-0 p-6 md:py-11 md:pl-11 md:pr-8">
              <div className="flex items-center gap-3.5 mb-4 flex-wrap">
                <span className="font-mono text-[13px] font-semibold text-brand bg-brand-light px-3 py-1.5 rounded-md">
                  {activeItem.code}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl tracking-[-.01em] m-0">
                  {activeItem.solName}
                </h3>
              </div>
              <div className="font-mono text-xs text-[#8a9291] tracking-[.02em] mb-4">
                {t.gama.ambitoWord} · {activeItem.ambito}
              </div>
              <p className="text-base leading-relaxed text-[#3d454a] max-w-[600px] mb-5">
                {activeItem.desc}
              </p>
              <ul className="space-y-2">
                {activeItem.specs.map((s) => (
                  <li key={s} className="text-sm text-[#16191b] flex gap-2">
                    <span className="text-brand">·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              {activeItem.refTags && activeItem.refTags.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {activeItem.refTags.map((rt) => (
                    <button
                      key={rt.ref}
                      type="button"
                      onClick={() => goToReferencia(rt.ref)}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[.04em] text-brand bg-brand-light hover:bg-brand hover:text-white px-3 py-1.5 rounded-full cursor-pointer border-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      {rt.label} →
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:flex-[4_1_0%] min-w-0 flex">
              {activeItem.video ? (
                <div
                  className="relative w-full aspect-video md:aspect-auto md:h-full min-h-[220px]"
                  style={{ backgroundColor: activeItem.id === "sol-l" ? "#DEDCD8" : "#0d1211" }}
                >
                  <video
                    key={activeItem.video}
                    className={`absolute inset-0 w-full h-full ${
                      activeItem.id === "sol-l"
                        ? "object-contain"
                        : "object-cover object-[68%_50%]"
                    }`}
                    autoPlay
                    muted
                    playsInline
                    loop={activeItem.id === "sol-fo"}
                    controls={false}
                  >
                    <source src={activeItem.video} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className="relative w-full aspect-video md:aspect-auto md:h-full min-h-[220px] bg-[#f6f8f7] flex items-center justify-center">
                  <span className="font-mono text-[11px] tracking-[.15em] uppercase text-[#9aa2a0]">
                    {t.gama.comingSoon}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        </Reveal>

        <MapaCollserola />
      </div>
    </section>
  );
}
