"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { LANGS, LANG_NAMES } from "@/lib/translations";

export default function LanguageSwitcher({ solid = true }: { solid?: boolean }) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const btnColor = solid
    ? "text-[#3d454a] hover:text-brand"
    : "text-white/90 hover:text-white [text-shadow:0_1px_8px_rgba(0,0,0,.5)]";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Idioma"
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${btnColor}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
        </svg>
        <span className="uppercase">{lang}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 md:left-auto md:right-0 mt-2 min-w-[160px] bg-white rounded-lg border border-line shadow-[0_12px_30px_-10px_rgba(15,25,27,.35)] overflow-hidden z-[70]"
        >
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={l === lang}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-4 hover:bg-mist transition-colors ${
                l === lang ? "text-brand font-semibold" : "text-ink"
              }`}
            >
              {LANG_NAMES[l]}
              <span className="font-mono text-[11px] uppercase text-[#8a9291]">{l}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
