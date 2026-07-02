import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16191b",
        paper: "#f6f7f7",
        dark: {
          DEFAULT: "#0f1514",
          soft: "#131a19",
          line: "#23302d",
          border: "rgba(255,255,255,.12)",
        },
        brand: {
          DEFAULT: "#3B66C2",
          dark: "#2C4EA0",
          light: "#EAF0FA",
        },
        accent: {
          DEFAULT: "#A9BFCF",
          soft: "#C3D2DD",
        },
        mist: "#eef1f0",
        line: "#e2e5e6",
      },
      fontFamily: {
        display: ["Archivo", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["IBM Plex Sans", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-10%)", opacity: "0" },
          "12%": { opacity: ".75" },
          "88%": { opacity: ".75" },
          "100%": { transform: "translateY(560%)", opacity: "0" },
        },
        pulse2: {
          "0%,100%": { opacity: ".35" },
          "50%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scan: "scan 4.5s linear infinite",
        pulse2: "pulse2 1.8s ease-in-out infinite",
        fadeUp: "fadeUp .7s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
