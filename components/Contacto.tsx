"use client";

import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { contact } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function Contacto() {
  const { t } = useI18n();
  const c = t.contacto;

  return (
    <section id="contacto" className="scroll-mt-[74px] bg-mist border-t border-line">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-16 md:py-[120px]">
        <div className="flex gap-10 md:gap-16 flex-wrap items-start md:items-stretch">
          <Reveal className="flex-[1_1_360px] min-w-[280px]">
            <SectionLabel num="06" label={c.label} />
            <h2 className="font-display font-bold text-[26px] md:text-[42px] leading-[1.06] tracking-[-.02em] mb-5 balance">
              {c.title}
            </h2>
            <p className="text-base leading-relaxed text-[#4a5257] max-w-[440px] mb-8">
              {c.subtitle}
            </p>
            <div className="font-mono text-[13px] tracking-[.14em] uppercase text-brand mb-3">
              {c.reachOut}
            </div>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col gap-1 border-t border-[#d3d9d8] pt-3.5">
                <span className="font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291]">
                  {c.phoneLabel}
                </span>
                <a href={`tel:${contact.phoneHref}`} className="text-base text-ink no-underline hover:text-brand">
                  {contact.phone}
                </a>
              </div>
              <div className="flex flex-col gap-1 border-t border-[#d3d9d8] pt-3.5">
                <span className="font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291]">
                  {c.emailLabel}
                </span>
                <a href={`mailto:${contact.email}`} className="text-base text-ink no-underline hover:text-brand break-all">
                  {contact.email}
                </a>
              </div>
              <div className="flex flex-col gap-1 border-t border-[#d3d9d8] pt-3.5">
                <span className="font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291]">
                  {c.addressLabel}
                </span>
                <span className="text-base text-ink">{contact.address}</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
