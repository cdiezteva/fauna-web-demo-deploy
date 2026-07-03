"use client";

import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { downloads } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function Descargas() {
  const { t } = useI18n();
  const d = t.descargas;

  return (
    <section id="descargas" className="scroll-mt-[74px] bg-white border-t border-line">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-16 md:py-[120px]">
        <SectionLabel num="05" label={d.label} />
        <h2 className="font-display font-bold text-[26px] md:text-[46px] leading-[1.08] tracking-[-.02em] mb-4 max-w-[720px] balance">
          {d.title}
        </h2>
        <p className="text-base leading-relaxed text-[#4a5257] max-w-[560px] mb-12">
          {d.subtitle} {d.contactPrompt}
          <a href="#contacto" className="text-brand font-medium no-underline hover:underline">
            {d.contactLink}
          </a>
          .
        </p>

        {/* Dos columnas de filas finas y rectangulares: dossier PDF + vídeos.
            Placeholder: sin enlace de descarga por ahora (se muestran como
            "Próximamente"); las rutas reales siguen en content.ts → downloads. */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          <Reveal className="h-full">
            <div
              aria-disabled
              className="flex items-center gap-4 h-full border border-line rounded-lg px-5 py-4 text-ink bg-white"
            >
              <div className="w-10 h-10 rounded-md bg-brand/10 text-brand flex items-center justify-center flex-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M14 3v5h5M9 13h6M9 17h6" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-[15px] leading-snug truncate">
                  {d.dossierTitle}
                </div>
                <div className="font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291] mt-0.5">
                  PDF · {downloads.dossier.size}
                </div>
              </div>
              <span className="flex-none font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291] bg-mist rounded-full px-3 py-1.5">
                {t.gama.comingSoon}
              </span>
            </div>
          </Reveal>

          {downloads.videos.map((v, i) => (
            <Reveal key={v.href} delay={60 + i * 60} className="h-full">
              <div
                aria-disabled
                className="flex items-center gap-4 h-full border border-line rounded-lg px-5 py-4 text-ink bg-white"
              >
                <div className="w-10 h-10 rounded-md bg-brand/10 text-brand flex items-center justify-center flex-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-[15px] leading-snug truncate">
                    {d.videos[i]}
                  </div>
                  <div className="font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291] mt-0.5">
                    {d.videoTag} · MP4 · {v.size}
                  </div>
                </div>
                <span className="flex-none font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291] bg-mist rounded-full px-3 py-1.5">
                  {t.gama.comingSoon}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
