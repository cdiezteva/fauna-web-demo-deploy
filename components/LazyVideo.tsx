"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vídeo que solo se monta (y descarga) cuando entra en el viewport. Muestra un
 * póster mientras tanto. Autoplay silencioso en bucle. Reduce datos y mejora
 * el rendimiento frente a vídeos que se cargan siempre al abrir la página.
 */
export default function LazyVideo({
  src,
  poster,
  className = "",
  videoClassName = "",
}: {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {show ? (
        <video
          className={videoClassName}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          controls={false}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" aria-hidden="true" className={videoClassName} />
      ) : null}
    </div>
  );
}
