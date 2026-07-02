import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { dgtIntegration, advantages } from "@/lib/content";

export default function Ventajas() {
  return (
    <section className="bg-white">
      <div className="max-w-[1220px] mx-auto px-5 sm:px-8 md:px-11 py-16 sm:py-24 md:py-[120px]">
        <SectionLabel num="05" label="Integración y ventajas" />
        <div className="flex gap-10 md:gap-16 flex-wrap items-start mb-16">
          <Reveal className="flex-[1_1_380px] min-w-[280px]">
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] md:text-[44px] leading-[1.08] tracking-[-.02em] mb-5 balance">
              Integración con DGT 3.0 y vehículo conectado.
            </h2>
            <p className="text-base leading-relaxed text-[#4a5257] max-w-[520px]">
              Cada incidente se transmite a las plataformas de vehículo
              conectado (V2V / C-ITS) tipo DGT 3.0, dirigiendo el aviso de
              forma selectiva al conductor en su navegador o vehículo.
            </p>
          </Reveal>
          <Reveal className="flex-[1_1_380px] min-w-[280px]" delay={100}>
            <ul className="space-y-3">
              {dgtIntegration.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-[#16191b] border-b border-line pb-3 last:border-0">
                  <span className="text-brand font-semibold">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <h3 className="font-display font-bold text-2xl mb-8">
          Ventajas frente a las tecnologías tradicionales
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <div className="border border-line rounded-xl p-6 h-full hover:border-brand/50 transition-colors">
                <h4 className="font-display font-bold text-lg mb-2.5">{a.title}</h4>
                <p className="text-sm leading-relaxed text-[#4a5257] m-0">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
