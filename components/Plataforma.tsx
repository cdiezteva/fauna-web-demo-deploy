"use client";

import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import LazyVideo from "./LazyVideo";
import { platformDeployment } from "@/lib/content";
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
        <p className="text-base md:text-[17px] leading-relaxed text-[#4a5257] max-w-[620px] mb-12">
          {t.plataforma.subtitle}
        </p>

        {/* Área grande: demo de AVIZOR Cloud dentro de un marco tipo navegador */}
        <Reveal>
          <div className="rounded-xl border border-[#dde2e1] overflow-hidden shadow-sm bg-white flex flex-col min-h-[380px] md:min-h-[620px]">
            {/* Barra del navegador */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-[#f1f3f5] border-b border-[#e2e5e6] flex-none">
              <div className="flex gap-1.5 flex-none">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex items-center gap-2 bg-white border border-[#e2e5e6] rounded-md px-3 py-1.5 min-w-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8a9291" strokeWidth="2" className="flex-none" aria-hidden="true">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span className="font-mono text-[11px] md:text-xs text-[#6b7378] truncate">
                  {platformDeployment.url}
                </span>
              </div>
            </div>
            {/* Viewport con el vídeo (silenciado, en bucle, sin controles) */}
            <div className="relative flex-1 bg-[#0d1211] min-h-[280px]">
              <LazyVideo
                src="/videos/demoavizorcloud.mp4"
                poster="/images/poster-demo.jpg"
                className="absolute inset-0"
                videoClassName="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-3 pointer-events-none">
                <div className="font-mono text-xs text-accent tracking-[.05em]">
                  {t.plataforma.deployLabel}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Áreas pequeñas: tres vídeos en fila bajo el vídeo principal */}
        <Reveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mt-4 md:mt-5">
            {[
              { src: "/videos/ovejacruza.mp4", poster: "/images/poster-oveja.jpg" },
              { src: "/videos/video-placa-showcase.mp4" },
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
