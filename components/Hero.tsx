"use client";

import Image from "next/image";
import HeroVideoBackground from "./HeroVideoBackground";
import { trustLogos } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();
  return (
    <section
      id="inicio"
      style={{ minHeight: "100dvh" }}
      className="relative overflow-hidden bg-dark text-white min-h-screen flex items-center pt-[76px]"
    >
      <HeroVideoBackground />

      <div className="relative z-10 w-full max-w-[900px] mx-auto px-5 md:px-8 py-10 md:py-12 text-center">
        <div className="font-mono text-[11px] md:text-xs tracking-[.16em] uppercase text-accent mb-6 [text-shadow:0_1px_8px_rgba(0,0,0,.5)]">
          {t.hero.eyebrow}
        </div>
        <h1 className="font-display font-bold text-[32px] md:text-[64px] leading-[1.05] tracking-[-.02em] mb-6 balance text-white [text-shadow:0_2px_18px_rgba(0,0,0,.55)]">
          {t.hero.titleA}{" "}
          <span className="text-amber-400">{t.hero.titleB}</span>
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-white/90 max-w-[620px] mx-auto mb-9 [text-shadow:0_1px_12px_rgba(0,0,0,.5)]">
          {t.hero.subtitle}
        </p>
        <div className="flex gap-3.5 flex-wrap justify-center mb-14 md:mb-20">
          <a
            href="#contacto"
            className="text-[15px] font-semibold text-white bg-brand hover:bg-brand-dark transition-colors px-7 py-3.5 rounded-lg no-underline"
          >
            {t.hero.ctaContact}
          </a>
          <a
            href="#gama"
            className="text-[15px] font-semibold text-ink bg-white border border-[#cfd5d4] hover:border-brand hover:text-brand transition-colors px-7 py-3.5 rounded-lg no-underline"
          >
            {t.hero.ctaSolutions}
          </a>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="font-mono text-[11px] tracking-[.14em] uppercase text-white/70 mb-6 [text-shadow:0_1px_8px_rgba(0,0,0,.5)]">
            {t.hero.trust}
          </div>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-5 md:gap-x-12 gap-y-4">
            {trustLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={260}
                height={84}
                className="h-8 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
