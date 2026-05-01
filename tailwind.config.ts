import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        void: "#02030a",
        ink: "#070915",
        frost: "rgba(230, 240, 255, 0.72)",
        neon: {
          blue: "#38bdf8",
          violet: "#8b5cf6",
        },
      },
      boxShadow: {
        glow: "0 0 70px rgba(56, 189, 248, 0.22)",
        violet: "0 0 80px rgba(139, 92, 246, 0.2)",
      },
      keyframes: {
        starDrift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-4%, 5%, 0)" },
        },
        pulseNode: {
          "0%, 100%": { opacity: "0.18" },
          "50%": { opacity: "0.62" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        cardFloat: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
      },
      animation: {
        starDrift: "starDrift 36s linear infinite alternate",
        pulseNode: "pulseNode 5s ease-in-out infinite",
        orbit: "orbit 34s linear infinite",
        cardFloat: "cardFloat 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
