"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

/**
 * Sección compacta (sin numerar) entre "El problema" y "La gama":
 * mosaico Detecta · Alerta · Protege sobre tres losas de vídeo iguales
 * (diseño aprobado en test-flujo/flujo-e-caps.html).
 *
 * Un pulso cometa recorre el raíl punteado y se detiene en cada losa
 * mientras su vídeo se reproduce (a color y sin velo; el resto en gris).
 * La duración de cada fase se lee de los metadatos del vídeo (menos los
 * recortes TRIM y un margen LEAD): se avanza justo antes del final y el
 * vídeo queda congelado en su último fotograma. Al cruzar "Alerta" todo
 * pasa a ámbar, y su círculo sigue animado (.lit) hasta terminar Protege.
 * Arranca al entrar en el viewport y respeta prefers-reduced-motion.
 */

// Vídeo de fondo de cada losa (Detecta · Alerta · Protege).
const FLUJO_VIDEOS = [
  "/videos/roe-deer-detecta.mp4",
  "/videos/Sierra-Francia-Senal.mp4",
  "/videos/roe-deer-protege.mp4",
];

// Recortes por vídeo (s): Detecta salta sus 5 primeros s, Alerta omite sus
// 5 últimos s, Protege salta sus 5 primeros s.
const TRIM = [
  { start: 5, end: 0 },
  { start: 0, end: 5 },
  { start: 5, end: 0 },
];

const TRAVEL_MS = 950; // viaje del pulso entre nodos
const IDLE_MS = 1200; // reposo al final del ciclo
const LEAD_MS = 350; // se avanza este margen antes del final del vídeo

// Detecta: anillo/diana + barrido radar (gira siempre)
const IconDetecta = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="7.5" fill="none" stroke="#4f83db" strokeWidth="2.6" />
    <circle cx="12" cy="12" r="2.4" fill="#9dbdf0" />
  </svg>
);

// Alerta: triángulo con exclamación LED (parpadea en ámbar)
const IconAlerta = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" aria-hidden="true">
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
  <svg width="38" height="40" viewBox="0 0 24 24" aria-hidden="true">
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
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const rail = railRef.current;
    const cols = colRefs.current;
    const vids = videoRefs.current;
    if (!stage || !rail) return;

    let raf = 0;
    let cancelled = false;
    let prevActive = -2;
    let holds = [3600, 3600, 3600];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setActive = (i: number) => {
      stage.classList.toggle("fd-warn", i >= 1);
      if (i === prevActive) return;
      prevActive = i;
      cols.forEach((c, j) => {
        if (!c) return;
        const on = j === i;
        const v = vids[j];
        if (on) {
          // reinicia vídeo (desde su recorte) y barra de progreso
          const pr = c.querySelector<HTMLElement>(".fd-prog");
          if (pr) {
            pr.style.animation = "none";
            void pr.offsetWidth;
            pr.style.animation = "";
            pr.style.animationDuration = `${holds[j]}ms`;
          }
          if (v) {
            try {
              v.currentTime = TRIM[j].start;
            } catch {}
            v.play().catch(() => {});
          }
        } else {
          v?.pause(); // congelado en su último fotograma
        }
        c.classList.toggle("on", on);
      });
      // Alerta permanece encendida mientras dura Protege
      cols[1]?.classList.toggle("lit", i === 2);
    };

    const play = () => {
      holds = vids.map((v, j) => {
        if (!v || !isFinite(v.duration) || v.duration <= 0) return 3600;
        const playable = v.duration - TRIM[j].start - TRIM[j].end;
        return Math.max(800, playable * 1000 - LEAD_MS);
      });
      cols.forEach((c, j) => {
        const pr = c?.querySelector<HTMLElement>(".fd-prog");
        if (pr) pr.style.animationDuration = `${holds[j]}ms`;
      });
      const b = [
        holds[0],
        holds[0] + TRAVEL_MS,
        holds[0] + TRAVEL_MS + holds[1],
        holds[0] + TRAVEL_MS + holds[1] + TRAVEL_MS,
        holds[0] + TRAVEL_MS + holds[1] + TRAVEL_MS + holds[2],
      ];
      const cycle = b[4] + IDLE_MS;
      const t0 = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const e = (now - t0) % cycle;
        let p = 0;
        let active = -1;
        let go = true;
        if (e < b[0]) { p = 0; active = 0; }
        else if (e < b[1]) { p = 0.5 * (e - b[0]) / TRAVEL_MS; active = 0; }
        else if (e < b[2]) { p = 0.5; active = 1; }
        else if (e < b[3]) { p = 0.5 + 0.5 * (e - b[2]) / TRAVEL_MS; active = 1; }
        else if (e < b[4]) { p = 1; active = 2; }
        else { p = 0; active = -1; go = false; }
        rail.style.setProperty("--p", p.toFixed(4));
        rail.classList.toggle("go", go);
        setActive(active);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // Espera a los metadatos (duración) de los tres vídeos antes de arrancar.
    const start = () => {
      Promise.all(
        vids.map(
          (v) =>
            new Promise<void>((res) => {
              if (!v || (v.readyState >= 1 && isFinite(v.duration))) {
                res();
                return;
              }
              v.addEventListener("loadedmetadata", () => res(), { once: true });
              setTimeout(res, 4000);
            })
        )
      ).then(() => {
        if (!cancelled) play();
      });
    };

    const begin = () => {
      if (reduce) {
        rail.style.setProperty("--p", "1");
        cols.forEach((c) => c?.classList.add("on"));
        return;
      }
      start();
    };

    if (typeof IntersectionObserver === "undefined") {
      begin();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          begin();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(stage);
    return () => {
      cancelled = true;
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-[#eef2f7] border-t border-b border-line">
      <div className="max-w-[1000px] mx-auto px-5 md:px-11 pt-16 md:pt-24 pb-10 md:pb-12 text-center">
        <Reveal className="text-center">
          <h2 className="font-display font-bold text-[26px] md:text-[44px] tracking-[-.02em] leading-[1.05] mb-4">
            {t.flujo.title}
          </h2>
          <p className="text-base leading-relaxed text-[#5f7286] max-w-[560px] mx-auto">
            {t.flujo.sub1}
            <span className="text-brand font-medium">AVIZOR</span>
            {t.flujo.sub2}
          </p>
        </Reveal>
      </div>

      <div className="pb-16 md:pb-24">
        <div ref={stageRef} className="fd-stage">
          <div ref={railRef} className="fd-rail">
            <div className="fd-charge" />
            <div className="fd-pulse" />
          </div>

          {t.flujo.steps.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={s.title}
                ref={(el) => {
                  colRefs.current[i] = el;
                }}
                className={`fd-col${i === 1 ? " fd-alerta" : ""}`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  muted
                  playsInline
                  preload="metadata"
                  src={FLUJO_VIDEOS[i]}
                />
                <div className="fd-shade" />
                <div className="fd-lbl font-display">{s.title}</div>
                <div className="fd-bulb">
                  {i === 0 && <div className="fd-sweep" />}
                  <Icon />
                </div>
                <div className="fd-cap font-mono">{s.sub}</div>
                <div className="fd-prog" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
