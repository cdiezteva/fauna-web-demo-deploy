"use client";

import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
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

      </div>
    </section>
  );
}
