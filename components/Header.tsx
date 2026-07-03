"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useI18n();
  const links = [
    { href: "#problema", label: t.nav.problema },
    { href: "#gama", label: t.nav.gama },
    { href: "#plataforma", label: t.nav.plataforma },
    { href: "#referencias", label: t.nav.referencias },
    { href: "#descargas", label: t.nav.descargas },
  ];

  // `solid` = el usuario ha salido del hero → cabecera blanca con blur.
  // Mientras está sobre el hero, la cabecera es transparente (deja ver el vídeo).
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");

    // Fallback si no encontramos el hero: umbral de scroll simple.
    if (!hero || typeof IntersectionObserver === "undefined") {
      const onScroll = () => setSolid(window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    // La cabecera pasa a sólida cuando el hero deja de estar bajo ella.
    const io = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Cierra el menú móvil si la ventana pasa a tamaño de escritorio.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const solidLook = solid || mobileOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[60] transition-colors duration-300 ${
        solidLook
          ? "bg-paper/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-4 md:py-5 flex items-center justify-between gap-6">
        <a href="#inicio" className="flex items-center gap-3 relative">
          <Image
            src="/images/avizor-logo.webp"
            alt="AVIZOR"
            width={512}
            height={512}
            priority
            unoptimized
            className={`w-auto transition-[height] duration-300 ${
              solidLook ? "h-11 md:h-14" : "h-16 md:h-[84px]"
            }`}
          />
          <span
            className={`font-medium transition-all duration-300 ${
              solidLook
                ? "text-base text-[#3d454a]"
                : "text-xl md:text-2xl text-white [text-shadow:0_1px_8px_rgba(0,0,0,.5)]"
            }`}
          >
            Fauna
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 justify-end">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-base font-medium transition-colors no-underline ${
                solid
                  ? "text-[#3d454a] hover:text-brand"
                  : "text-white/90 hover:text-white [text-shadow:0_1px_8px_rgba(0,0,0,.5)]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <LanguageSwitcher solid={solid} />
          <a
            href="#contacto"
            className="inline-flex text-[15px] font-semibold text-white bg-brand hover:bg-brand-dark transition-colors px-5 py-2.5 rounded-md no-underline tracking-[.01em] whitespace-nowrap"
          >
            {t.nav.contacto}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className={`md:hidden flex items-center justify-center w-9 h-9 -mr-1.5 transition-colors ${
            solidLook ? "text-[#3d454a]" : "text-white"
          }`}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-paper border-t border-line px-5 py-5 flex flex-col gap-1"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-[#3d454a] text-base font-medium py-3 no-underline border-b border-line last:border-b-0"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4 gap-4">
            <LanguageSwitcher solid />
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold text-white bg-brand hover:bg-brand-dark transition-colors px-4 py-2.5 rounded-md no-underline tracking-[.01em] whitespace-nowrap"
            >
              {t.nav.contacto}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
