"use client";

import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import LazyVideo from "./LazyVideo";
import { useI18n } from "@/lib/i18n";

export default function Plataforma() {
  const { t } = useI18n();
  return (
    <section id="plataforma" className="scroll-mt-[74px] bg-white text-ink border-t border-line">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-16 md:py-[120px]">
        <SectionLabel num="03" label={t.plataforma.label} />
        <h2 className="font-display font-bold text-[26px] md:text-[50px] leading-[1.06] tracking-[-.02em] mb-5 max-w-[780px] balance">
          {t.plataforma.title}
        </h2>
        <div className="max-w-[720px] mb-12 space-y-5">
          {t.plataforma.subtitle.map((para, i) => (
            <p key={i} className="text-base md:text-[17px] leading-relaxed text-[#4a5257] m-0">
              {para}
            </p>
          ))}
        </div>

        {/* Flujo: la placa recoge el dato en campo, la plataforma lo explota.
            Una única tarjeta partida en dos por una línea divisoria, con una
            flecha circular justo en el centro que marca el sentido del dato.
            En móvil la división y la flecha pasan a vertical. */}
        <Reveal>
          <div className="relative rounded-xl border border-[#dde2e1] overflow-hidden shadow-sm bg-[#0d1211] md:h-[440px]">
            <div className="flex flex-col md:flex-row md:h-full">
              {/* 1 · La placa */}
              <div className="relative flex-1 aspect-video md:aspect-auto border-b md:border-b-0 md:border-r border-white/15">
                <LazyVideo
                  src="/videos/video-placa-showcase.mp4"
                  className="absolute inset-0"
                  videoClassName="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[.1em] uppercase text-white/90 bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {t.plataforma.flowPlacaLabel}
                </span>
              </div>

              {/* 2 · La plataforma */}
              <div className="relative flex-1 aspect-video md:aspect-auto">
                <LazyVideo
                  src="/videos/demoavizorcloud.mp4"
                  poster="/images/poster-demo.jpg"
                  className="absolute inset-0"
                  videoClassName="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[.1em] uppercase text-white/90 bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {t.plataforma.flowPlataformaLabel}
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2.5 pointer-events-none">
                  <div className="font-mono text-[11px] text-accent tracking-[.05em]">
                    {t.plataforma.deployLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Flecha: exactamente en el centro de la tarjeta, sobre la línea divisoria */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-ink shadow-md"
              title={t.plataforma.flowArrowLabel}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-ink rotate-90 md:rotate-0" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
              <span className="sr-only">{t.plataforma.flowArrowLabel}</span>
            </div>
          </div>

          {/* Texto explicativo bajo cada mitad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-14 mt-4">
            <p className="text-[13px] leading-snug text-[#4a5257] m-0">
              {t.plataforma.flowPlacaCaption}
            </p>
            <p className="text-[13px] leading-snug text-[#4a5257] m-0">
              {t.plataforma.flowPlataformaCaption}
            </p>
          </div>
        </Reveal>

        {/* Áreas pequeñas: vídeos de contexto adicionales */}
        <Reveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
            {[
              { src: "/videos/ovejacruza.mp4", poster: "/images/poster-oveja.jpg" },
              { src: "/videos/infrarroja.mp4", poster: "/images/poster-infrarroja.jpg" },
            ].map((v) => (
              <LazyVideo
                key={v.src}
                src={v.src}
                poster={v.poster}
                className="relative min-h-[180px] md:min-h-[200px] rounded-xl overflow-hidden border border-[#dde2e1] bg-[#eef1f0]"
                videoClassName="absolute inset-0 w-full h-full object-cover"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
