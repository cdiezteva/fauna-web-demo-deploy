"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

/**
 * Sección compacta (sin numerar) entre "El problema" y "La gama":
 * cadena Detecta · Alerta · Protege en tiempo real, sobre un fondo de 3
 * vídeos en columnas. Un pulso recorre el raíl: llega a un nodo, se queda
 * parado ahí (encendiendo el nodo y ampliando el vídeo correspondiente al
 * 85% del fondo) y, pasado ese tiempo, continúa al siguiente. Al cruzar
 * "Alerta", línea, pulso y nodo pasan a ámbar (estado de aviso). Arranca al
 * entrar en el viewport y respeta prefers-reduced-motion.
 */

// Vídeos de fondo, uno por nodo (Detecta · Alerta · Protege). De momento no
// hay vídeo definitivo: se muestra un color de marca con la etiqueta del
// nodo a modo de placeholder. Para añadir el vídeo real, basta con copiarlo
// a /public/videos/ y poner su ruta aquí — el resto (tamaño, orden) ya está
// preparado y no requiere más cambios.
const FLUJO_VIDEOS: (string | null)[] = [null, null, null];
const FLUJO_PLACEHOLDER_TINTS = ["#1a2740", "#3a2c14", "#123328"];

// Duración de cada fase del ciclo (ms). El pulso viaja hasta un nodo, se
// queda parado HOLD_MS (el vídeo de ese nodo ocupa el 85% del fondo) y
// continúa hacia el siguiente; al llegar a Protege, el raíl se rebobina y
// el ciclo vuelve a empezar por Detecta.
const HOLD_MS = 10000;
const TRAVEL_MS = 1600;
const RESET_MS = 900;
// Los vídeos se despliegan más rápido que lo que tarda el pulso en llegar
// al nodo: alcanzan su tamaño final al principio del viaje y se quedan así.
const VIDEO_MS = 450;

// Peso (ancho) de cada columna de vídeo cuando el nodo i está activo.
const ACTIVE_WEIGHTS = [
  [0.85, 0.075, 0.075],
  [0.075, 0.85, 0.075],
  [0.075, 0.075, 0.85],
];

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const lerpArr = (a: number[], b: number[], p: number) => a.map((v, i) => lerp(v, b[i], p));
const clamp01 = (p: number) => Math.min(1, Math.max(0, p));

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
  const colRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const panel = panelRef.current;
    const charge = chargeRef.current;
    const pulse = pulseRef.current;
    const nodes = nodeRefs.current;
    const cols = colRefs.current;
    if (!panel || !charge || !pulse) return;

    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setCols = (w: number[]) => {
      cols.forEach((c, i) => {
        if (!c) return;
        c.style.flex = `${w[i]} 1 0%`;
        // La etiqueta del placeholder solo se lee bien en la columna ancha
        // (activa); en las estrechas se desvanece para no verse cortada.
        const label = c.querySelector<HTMLElement>("[data-flujo-label]");
        if (label) label.style.opacity = w[i] > 0.5 ? "1" : "0";
      });
    };

    const play = () => {
      // Límites acumulados de cada fase dentro de un ciclo.
      const b0 = HOLD_MS; // fin de la parada en Detecta
      const b1 = b0 + TRAVEL_MS; // fin del viaje Detecta → Alerta
      const b2 = b1 + HOLD_MS; // fin de la parada en Alerta
      const b3 = b2 + TRAVEL_MS; // fin del viaje Alerta → Protege
      const b4 = b3 + HOLD_MS; // fin de la parada en Protege
      const CYCLE = b4 + RESET_MS; // + rebobinado antes de repetir

      const t0 = performance.now();
      const tick = (now: number) => {
        const e = (now - t0) % CYCLE;
        let pos: number;
        let on0 = false, on1 = false, on2 = false, warn = false;
        let pulseOpacity = 1;
        let weights: number[];

        if (e < b0) {
          pos = 0;
          on0 = true;
          weights = ACTIVE_WEIGHTS[0];
        } else if (e < b1) {
          const p = (e - b0) / TRAVEL_MS;
          pos = lerp(0, 0.5, p);
          on0 = true;
          weights = lerpArr(ACTIVE_WEIGHTS[0], ACTIVE_WEIGHTS[1], clamp01((e - b0) / VIDEO_MS));
        } else if (e < b2) {
          pos = 0.5;
          on0 = true;
          on1 = true;
          warn = true;
          weights = ACTIVE_WEIGHTS[1];
        } else if (e < b3) {
          const p = (e - b2) / TRAVEL_MS;
          pos = lerp(0.5, 1, p);
          on0 = true;
          on1 = true;
          warn = true;
          weights = lerpArr(ACTIVE_WEIGHTS[1], ACTIVE_WEIGHTS[2], clamp01((e - b2) / VIDEO_MS));
        } else if (e < b4) {
          pos = 1;
          on0 = true;
          on1 = true;
          on2 = true;
          warn = true;
          weights = ACTIVE_WEIGHTS[2];
        } else {
          // Rebobina el raíl y funde el pulso mientras los vídeos vuelven a Detecta.
          const p = (e - b4) / RESET_MS;
          pos = lerp(1, 0, p);
          pulseOpacity = Math.max(0, 1 - p * 4);
          weights = lerpArr(ACTIVE_WEIGHTS[2], ACTIVE_WEIGHTS[0], clamp01((e - b4) / VIDEO_MS));
        }

        charge.style.transform = `scaleX(${pos})`;
        pulse.style.opacity = String(pulseOpacity);
        pulse.style.left = `calc(${(pos * 100).toFixed(2)}% - 6px)`;
        nodes[0]?.classList.toggle("on", on0);
        nodes[1]?.classList.toggle("on", on1);
        nodes[2]?.classList.toggle("on", on2);
        panel.classList.toggle("fd-warn", warn);
        setCols(weights);

        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduce) {
        nodes.forEach((n) => n?.classList.add("on"));
        charge.style.transform = "scaleX(1)";
        panel.classList.add("fd-warn");
        setCols(ACTIVE_WEIGHTS[2]);
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
    <section className="relative overflow-hidden bg-dark text-white">
      {/* Fondo: 3 columnas de vídeo; la del nodo activo ocupa el 85%. */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {FLUJO_VIDEOS.map((src, i) => (
          <div
            key={i}
            ref={(el) => {
              colRefs.current[i] = el;
            }}
            className="relative h-full overflow-hidden"
            style={{ flex: "1 1 0%" }}
          >
            {src ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                controls={false}
              >
                <source src={src} type="video/mp4" />
              </video>
            ) : (
              <div
                className="hairline-diag absolute inset-0 flex items-end justify-center pb-6"
                style={{ backgroundColor: FLUJO_PLACEHOLDER_TINTS[i] }}
              >
                <span
                  data-flujo-label
                  className="font-mono text-[10px] tracking-[.15em] uppercase text-white/50 whitespace-nowrap transition-opacity duration-300"
                >
                  {t.flujo.steps[i]?.title} · {t.gama.comingSoon}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/65" aria-hidden="true" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-11 py-16 md:py-24 text-center">
        <Reveal className="text-center">
          <h2 className="font-display font-bold text-[26px] md:text-[44px] tracking-[-.02em] leading-[1.05] mb-4 text-white [text-shadow:0_2px_16px_rgba(0,0,0,.55)]">
            {t.flujo.title}
          </h2>
          <p className="text-base leading-relaxed text-white/85 max-w-[560px] mx-auto mb-10 md:mb-14 [text-shadow:0_1px_10px_rgba(0,0,0,.5)]">
            {t.flujo.sub1}
            <span className="text-accent font-medium">AVIZOR</span>
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
