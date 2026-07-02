import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

// Las tipografías (Archivo + IBM Plex) se cargan desde Google Fonts vía <link>
// en el <head>, igual que en la maqueta original. Esto evita depender de
// next/font en tiempo de build y funciona igual en el navegador final.

export const metadata: Metadata = {
  title: "AVIZOR Fauna · TEVA — Detección y aviso inteligente de fauna en carreteras",
  description:
    "AVIZOR Fauna detecta la presencia de animales en la carretera y la convierte, en tiempo real, en señalización activa, alarma para el conductor y dato útil para la administración. Tecnología española de TEVA.",
  icons: {
    icon: "/images/avizor_logo.png",
    shortcut: "/images/avizor_logo.png",
    apple: "/images/avizor_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
