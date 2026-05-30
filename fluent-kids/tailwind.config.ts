import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fluent: {
          purple: "#4B2E83",
          "purple-dark": "#2D1B4E",
          "purple-light": "#6B4FA0",
          teal: "#1A6B7A",
          "teal-dark": "#0F4A55",
          blue: "#3B82F6",
          "sky-light": "#7DD3FC",
          green: "#22C55E",
          yellow: "#FACC15",
          coral: "#F87171",
          cream: "#F5F0E8",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "Nunito", "system-ui", "sans-serif"],
        body: ["var(--font-nunito)", "Nunito", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 8px 24px rgba(45, 27, 78, 0.25)",
        glow: "0 0 20px rgba(125, 211, 252, 0.4)",
      },
      animation: {
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
      },
      keyframes: {
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
