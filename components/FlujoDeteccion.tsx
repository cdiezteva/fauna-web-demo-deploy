"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

/**
 * Sección compacta (sin numerar) entre "El problema" y "La gama":
 * cadena Detecta · Alerta · Protege en tiempo real. Un pulso recorre el
 * raíl encendiendo los nodos; al cruzar "Alerta", línea, pulso y nodo
 * pasan a ámbar (estado de aviso). Arranca al entrar en el viewport y
 * respeta prefers-reduced-motion.
 */

// Detecta: anillo/diana + barrido radar
const IconDetecta = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="7.5" fill="none" stroke="#4f83db" strokeWidth="2.6" />
    <circle cx="12" cy="12" r="2.4" fill="#9dbdf0" />
  </svg>
);

// Alerta: triángulo con exclamación LED (parpadea en ámbar)
const IconAlerta = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 4.5 21 19.5 3 19.5 Z"
      fill="none"
      stroke="#5f8fe0"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <g className="fd-flash">
      <line x1="12" y1="10" x2="12" y2="14.5" stroke="#f5b731" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="17.2" r="1.15" fill="#f5b731" />
    </g>
  </svg>
);

// Protege: escudo con check que se dibuja
const IconProtege = () => (
  <svg width="40" height="42" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3 20 6 V11.5 C20 16.4 16.6 19.7 12 21 C7.4 19.7 4 16.4 4 11.5 V6 Z"
      fill="none"
      stroke="#5f8fe0"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      className="fd-check"
      d="M9 12 11.2 14.2 15 10"
      fill="none"
      stroke="#9dbdf0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ICONS = [IconDetecta, IconAlerta, IconProtege];

export default function FlujoDeteccion() {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const chargeRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const panel = panelRef.current;
    const charge = chargeRef.current;
    const pulse = pulseRef.current;
    const nodes = nodeRefs.current;
    if (!panel || !charge || !pulse) return;

    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = () => {
      const CYCLE = 7400, TRAVEL = 3600, HOLD = 2600; // viaje lento + encendido + reposo
      const t0 = performance.now();
      const tick = (now: number) => {
        const e = (now - t0) % CYCLE;
        if (e < TRAVEL) {
          const p = e / TRAVEL;
          charge.style.transform = `scaleX(${p})`;
          pulse.style.opacity = "1";
          pulse.style.left = `calc(${(p * 100).toFixed(2)}% - 6px)`;
          nodes[0]?.classList.toggle("on", p >= 0);
          nodes[1]?.classList.toggle("on", p >= 0.5);
          nodes[2]?.classList.toggle("on", p >= 0.98);
          panel.classList.toggle("fd-warn", p >= 0.5); // aviso: ámbar desde Alerta
        } else if (e < TRAVEL + HOLD) {
          pulse.style.opacity = "0";
          charge.style.transform = "scaleX(1)";
          nodes.forEach((n) => n?.classList.add("on"));
          panel.classList.add("fd-warn");
        } else {
          charge.style.transform = "scaleX(0)";
          pulse.style.opacity = "0";
          nodes.forEach((n) => n?.classList.remove("on"));
          panel.classList.remove("fd-warn");
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduce) {
        nodes.forEach((n) => n?.classList.add("on"));
        charge.style.transform = "scaleX(1)";
        return;
      }
      play();
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(panel);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-[#eef2f7] border-t border-b border-line">
      <div className="max-w-[1000px] mx-auto px-5 md:px-11 py-16 md:py-24 text-center">
        <Reveal className="text-center">
          <h2 className="font-display font-bold text-[26px] md:text-[44px] tracking-[-.02em] leading-[1.05] mb-4">
            {t.flujo.title}
          </h2>
          <p className="text-base leading-relaxed text-[#5f7286] max-w-[560px] mx-auto mb-10 md:mb-14">
            {t.flujo.sub1}
            <span className="text-brand font-medium">AVIZOR</span>
            {t.flujo.sub2}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div ref={panelRef} className="fd-panel">
            <div className="fd-chain">
              <div className="fd-rail">
                <div ref={chargeRef} className="fd-charge" />
                <div ref={pulseRef} className="fd-pulse" />
              </div>

              {t.flujo.steps.map((s, i) => {
                const Icon = ICONS[i];
                return (
                  <div
                    key={s.title}
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className={`fd-node${i === 1 ? " fd-node-alerta" : ""}`}
                  >
                    <div className="fd-lbl font-display">{s.title}</div>
                    <div className="fd-bulb">
                      {i === 0 && <div className="fd-sweep" />}
                      <Icon />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
