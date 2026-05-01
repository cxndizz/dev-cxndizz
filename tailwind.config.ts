import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-thai)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
        ],
        display: [
          "var(--font-display)",
          "var(--font-thai)",
          "var(--font-inter)",
          "Inter",
          "system-ui",
        ],
        thai: ["var(--font-thai)", "system-ui"],
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
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        marqueeReverse: {
          "0%": { transform: "translate3d(-50%, 0, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatY: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
        floatXY: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "33%": { transform: "translate3d(-14px, -10px, 0)" },
          "66%": { transform: "translate3d(12px, 8px, 0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        borderSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        starDrift: "starDrift 36s linear infinite alternate",
        pulseNode: "pulseNode 5s ease-in-out infinite",
        orbit: "orbit 34s linear infinite",
        cardFloat: "cardFloat 8s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        marqueeReverse: "marqueeReverse 38s linear infinite",
        gradientMove: "gradientMove 6s ease-in-out infinite",
        shimmer: "shimmer 3.4s linear infinite",
        floatY: "floatY 7s ease-in-out infinite",
        floatXY: "floatXY 12s ease-in-out infinite",
        glowPulse: "glowPulse 4s ease-in-out infinite",
        borderSpin: "borderSpin 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
