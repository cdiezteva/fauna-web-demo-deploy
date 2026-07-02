import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { architectureNode } from "@/lib/content";

export default function Arquitectura() {
  return (
    <section className="border-t border-b border-line bg-mist">
      <div className="max-w-[1220px] mx-auto px-5 sm:px-8 md:px-11 py-16 sm:py-24 md:py-[120px]">
        <SectionLabel num="02" label="Arquitectura del sistema" />
        <h2 className="font-display font-bold text-[30px] sm:text-[40px] md:text-[50px] leading-[1.06] tracking-[-.02em] mb-4 max-w-[760px] balance">
          Electrónica y comunicaciones propias, fabricadas por TEVA.
        </h2>
        <p className="text-base leading-relaxed text-[#4a5257] max-w-[640px] mb-12">
          Cinco tecnologías de detección distintas convergen en una misma
          tarjeta de control, que decide, activa la señalización y reporta
          a AVIZOR Cloud y al vehículo conectado.
        </p>

        <Reveal>
          <div className="bg-white border border-line rounded-2xl p-3 sm:p-5 shadow-sm overflow-x-auto">
            <Image
              src="/images/diagrama.png"
              alt="Esquema de funcionamiento: equipos de detección, tarjeta de control inteligente TEVA, señalización dinámica, AVIZOR Cloud y vehículo conectado DGT 3.0"
              width={1800}
              height={900}
              className="w-full min-w-[720px]"
            />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <Reveal>
            <div className="bg-dark text-mist rounded-xl p-6 h-full">
              <div className="font-mono text-[11px] uppercase tracking-[.1em] text-accent mb-3">
                {architectureNode.subtitle}
              </div>
              <h3 className="font-display font-bold text-lg mb-4">{architectureNode.title}</h3>
              <ul className="space-y-2">
                {architectureNode.specs.map((s) => (
                  <li key={s} className="text-[13px] text-[#c3ccc9] flex gap-2">
                    <span className="text-accent">·</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="bg-white border border-line rounded-xl p-6 h-full">
              <div className="font-mono text-[11px] uppercase tracking-[.1em] text-[#8a9291] mb-3">
                Entradas · sensórica
              </div>
              <ul className="space-y-2">
                {architectureNode.inputs.map((s) => (
                  <li key={s} className="text-[13px] text-[#3d454a] flex gap-2">
                    <span className="text-brand">·</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex flex-col gap-3">
              {architectureNode.outputs.map((o) => (
                <div key={o.k} className="bg-white border border-line rounded-xl p-4 flex-1">
                  <div className="font-mono text-[11px] text-brand font-semibold mb-1">{o.k}</div>
                  <div className="text-[13px] text-[#4a5257] leading-snug">{o.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <p className="text-[13px] leading-relaxed text-[#6b7378] mt-8 border-t border-[#dde2e1] pt-6">
          {architectureNode.remote}
        </p>
      </div>
    </section>
  );
}
