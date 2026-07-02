/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,

  },
  // Permite abrir el servidor de desarrollo desde el móvil por la IP de la
  // red local (p. ej. http://192.168.0.17:3000). Sin esto, Next.js bloquea
  // las peticiones de assets/HMR que no vienen de localhost y el JS del
  // cliente nunca termina de arrancar (menú sin tap, secciones invisibles).
  allowedDevOrigins: ["192.168.0.17", "192.168.0.*", "192.168.1.*"],
};

export default nextConfig;
