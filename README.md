# AVIZOR Fauna · sitio web

Sitio en Next.js 14 (App Router) + Tailwind CSS para AVIZOR Fauna (TEVA):
detección y aviso inteligente de fauna en carreteras.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

Para producción:

```bash
npm run build
npm run start
```

## Estructura

- `app/` — layout y página principal (App Router).
- `components/` — una sección por componente (Hero, Problema, Proceso,
  Arquitectura, Gama, Plataforma, Ventajas, Referencias, Contacto, Footer).
- `lib/content.ts` — todo el contenido textual del sitio (estadísticas,
  especificaciones de producto, referencias, datos de contacto). Editar
  este archivo para actualizar textos sin tocar el JSX.
- `public/images` — fotografías e imágenes reales optimizadas (WebP).
- `public/videos` — vídeos reales comprimidos para web (hero, demo de
  detección, render de baliza).
- `public/docs` — dossier técnico en PDF, enlazado desde la sección de
  contacto.

## Pendiente antes de publicar

- Sustituir el logo placeholder ("TEVA" en un recuadro punteado) por el
  logotipo real en `components/Header.tsx` y `components/Footer.tsx`.
- Revisar/conectar el formulario de contacto: actualmente simula el envío
  en el cliente (`components/Contacto.tsx`); conectarlo a un backend o
  servicio de formularios (p. ej. una API route en `app/api/contacto`).
- Verificar los datos de contacto en `lib/content.ts` (persona, teléfono,
  email, dirección) antes de publicar.
