"use client";

import Image from "next/image";
import { contact } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  const claim = t.flujo.steps.map((s) => s.title).join(" - ");
  return (
    <footer className="bg-[#0f1620] text-[#aab6c9]">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-12 md:py-16">
        <div className="flex gap-8 flex-wrap justify-between items-start">
          <div className="max-w-[340px]">
            <a href="#inicio" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/avizor_logo.png"
                alt="AVIZOR"
                width={660}
                height={660}
                className="h-9 w-auto"
              />
              <span className="text-base font-medium text-white">Fauna</span>
            </a>
            <p className="text-sm leading-relaxed m-0 text-[#8793a8]">
              {t.footer.blurb} {t.footer.tagline}
            </p>
            <p className="text-xs mt-4 text-[#5c6a82] font-mono">{claim}</p>
          </div>
          <div className="flex gap-8 md:gap-11 flex-wrap">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] tracking-[.1em] uppercase text-[#5c6a82]">
                {t.footer.navTitle}
              </span>
              <a href="#problema" className="text-sm no-underline text-[#aab6c9] hover:text-white">{t.nav.problema}</a>
              <a href="#gama" className="text-sm no-underline text-[#aab6c9] hover:text-white">{t.nav.gama}</a>
              <a href="#plataforma" className="text-sm no-underline text-[#aab6c9] hover:text-white">{t.nav.plataforma}</a>
              <a href="#referencias" className="text-sm no-underline text-[#aab6c9] hover:text-white">{t.nav.referencias}</a>
              <a href="#descargas" className="text-sm no-underline text-[#aab6c9] hover:text-white">{t.nav.descargas}</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] tracking-[.1em] uppercase text-[#5c6a82]">
                {t.footer.contactTitle}
              </span>
              <a href={`tel:${contact.phoneHref}`} className="text-sm no-underline text-[#aab6c9] hover:text-white">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="text-sm no-underline text-[#aab6c9] hover:text-white">{contact.email}</a>
              <a href={contact.webHref} target="_blank" rel="noreferrer" className="text-sm no-underline text-[#aab6c9] hover:text-white">{contact.web}</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#25324a] mt-11 pt-5 flex justify-between flex-wrap gap-3 font-mono text-[11px] text-[#5c6a82] tracking-[.03em]">
          <span>{t.footer.rights}</span>
          <span>{t.footer.legal}</span>
        </div>
      </div>
    </footer>
  );
}
