"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const LEGEND_COLORS = [
  { key: "fo", swatch: "#dc2626" },
  { key: "e", swatch: "#2563eb" },
  { key: "l", swatch: "#16a34a" },
  { key: "b", swatch: "#7c3aed" },
] as const;

export default function MapaCollserola() {
  const { t, lang } = useI18n();
  const [expanded, setExpanded] = useState(false);
  // El mapa (iframe con WebGL/MapLibre) solo se monta cuando entra en el
  // viewport: así no se descargan tiles ni se crea el contexto WebGL hasta
  // que el usuario llega a esta sección. Mejora el rendimiento y el consumo
  // de datos en cualquier dispositivo, especialmente en móvil.
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <>
      <div className="md:hidden mt-10">
        <h3 className="font-display font-bold text-xl mb-1.5">
          {t.gama.mapTitle}
        </h3>
        <p className="text-sm text-[#6b7378] max-w-[560px] mb-4">
          {t.gama.mapDescMobile}
        </p>

        <div className="relative w-full aspect-[760/655] overflow-hidden rounded-xl border border-line">
          <Image
            src="/images/mapa-collserola-estatico.png"
            alt={t.gama.mapTitle}
            fill
            className="object-cover"
          />
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
          {LEGEND_COLORS.map(({ key, swatch }) => (
            <li key={key} className="flex items-center gap-2 text-[13px] text-[#4a5257]">
              <span
                className="inline-block w-3 h-3 rounded-full flex-none"
                style={{ backgroundColor: swatch }}
                aria-hidden="true"
              />
              {t.gama.mapLegend[key]}
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:block mt-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-5">
          <div>
            <h3 className="font-display font-bold text-xl mb-1.5">
              {t.gama.mapTitle}
            </h3>
            <p className="text-sm text-[#6b7378] max-w-[560px] m-0">
              {t.gama.mapDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="font-mono text-xs font-semibold text-brand hover:text-brand-dark border border-brand/30 hover:border-brand rounded-md px-4 py-2.5 whitespace-nowrap"
          >
            {expanded ? t.gama.collapse : t.gama.expand}
          </button>
        </div>

        <div
          ref={containerRef}
          className={`relative w-full overflow-hidden rounded-xl border border-line bg-dark transition-[height] duration-500 ease-in-out ${
            expanded ? "h-[80vh]" : "h-[440px]"
          }`}
        >
          {visible ? (
            <iframe
              src={`/maps/collserola_maplibre.html?lang=${lang}`}
              title={t.gama.mapTitle}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[11px] tracking-[.2em] uppercase text-accent/70">
                {t.gama.mapLoading}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
