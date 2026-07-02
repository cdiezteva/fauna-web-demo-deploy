"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vídeos de fondo del hero, en orden de reproducción.
 *
 * Para añadir uno nuevo: cópialo a /public/videos/ y añade su ruta a esta
 * lista. No hace falta tocar nada más — el carrusel se adapta automáticamente
 * al número de vídeos: se reproducen en bucle, uno tras otro, con una
 * transición suave (fundido) al terminar cada uno.
 */
const HERO_VIDEOS = ["/videos/jabali-cruzando.mp4", "/videos/aviso-avizor.mp4"];

/** Opacidad de la capa de superposición (negra) sobre los vídeos (0–1). */
const OVERLAY_OPACITY = 0.4;

/** Velocidad de reproducción (1 = normal). Ligeramente más lenta para un fondo más sereno. */
const PLAYBACK_RATE = 0.8;

export default function HeroVideoBackground() {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Reproduce solo el vídeo visible; pausa y rebobina el resto.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === current) {
        video.currentTime = 0;
        video.playbackRate = PLAYBACK_RATE;
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current]);

  const goToNext = () => {
    setCurrent((i) => (i + 1) % HERO_VIDEOS.length);
  };

  const handleEnded = (i: number) => {
    // Con un solo vídeo, vuelve a empezar (bucle continuo).
    if (HERO_VIDEOS.length === 1) {
      const video = videoRefs.current[i];
      if (video) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      }
      return;
    }
    goToNext();
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-dark" aria-hidden="true">
      {HERO_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          autoPlay={i === 0}
          muted
          playsInline
          controls={false}
          preload={i === 0 ? "auto" : "metadata"}
          tabIndex={-1}
          onEnded={() => handleEnded(i)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      {/* Capa negra de superposición sobre los vídeos */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: OVERLAY_OPACITY }}
      />

      {/* Degradado inferior para reforzar el contraste del texto y los logos */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
    </div>
  );
}
