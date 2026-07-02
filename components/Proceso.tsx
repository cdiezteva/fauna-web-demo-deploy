import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { steps, comparison } from "@/lib/content";

export default function Proceso() {
  return (
    <section id="proceso" className="scroll-mt-[74px]">
      <div className="max-w-[1220px] mx-auto px-5 sm:px-8 md:px-11 py-16 sm:py-24 md:py-[120px]">
        <SectionLabel num="02" label="Cómo funciona" />
        <h2 className="font-display font-bold text-[30px] sm:text-[40px] md:text-[50px] leading-[1.06] tracking-[-.02em] mb-10 md:mb-16 max-w-[720px] balance">
          Cuatro pasos, un mismo objetivo: llegar antes que el impacto.
        </h2>

        <div className="flex gap-10 md:gap-14 flex-wrap items-start mb-16 md:mb-20">
          <Reveal className="flex-[1_1_540px] min-w-[280px]">
            <div className="relative aspect-video rounded-xl border border-line overflow-hidden bg-[#eef1f0]">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/demo-deteccion.mp4" type="video/mp4" />
              </video>
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-dark/80 backdrop-blur px-3 py-1.5 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse2" />
                <span className="font-mono text-[10px] text-mist tracking-[.06em] uppercase">
                  Analítica de vídeo en operación real
                </span>
              </div>
            </div>
            <p className="text-xs text-[#6b7378] mt-3 font-mono">
              Grabación real del sistema de analítica de vídeo AVIZOR Fauna-E detectando e identificando fauna en un tramo de prueba.
            </p>
          </Reveal>

          <Reveal className="flex-[1_1_380px] min-w-[280px]" delay={100}>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-line rounded-xl p-5">
                <div className="font-mono text-[11px] uppercase tracking-[.08em] text-[#8a9291] mb-3">
                  Solución tradicional
                </div>
                <ul className="space-y-2.5">
                  {comparison.traditional.map((t) => (
                    <li key={t} className="text-[13px] leading-snug text-[#4a5257] flex gap-2">
                      <span className="text-[#c6cccb]">–</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-brand/30 bg-brand-light/40 rounded-xl p-5">
                <div className="font-mono text-[11px] uppercase tracking-[.08em] text-brand mb-3">
                  AVIZOR Fauna
                </div>
                <ul className="space-y-2.5">
                  {comparison.avizor.map((t) => (
                    <li key={t} className="text-[13px] leading-snug text-[#16191b] flex gap-2">
                      <span className="text-brand">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((p, i) => (
            <Reveal key={p.num} delay={i * 80}>
              <article className="h-full bg-white border border-line rounded-xl p-7 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[13px] text-brand font-semibold">
                    {p.num}
                  </span>
                  <span className="w-[38px] h-[38px] rounded-lg bg-brand-light flex items-center justify-center font-mono text-[9px] text-brand tracking-[.04em] text-center px-1">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl tracking-[-.01em] mb-3">
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#4a5257]">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
