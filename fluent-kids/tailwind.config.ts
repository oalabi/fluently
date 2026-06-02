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
          lavender: "#E8E4F8",
          "lavender-deep": "#D4CCF0",
          purple: "#5B3E96",
          "purple-dark": "#3D2868",
          "purple-light": "#7B5BB8",
          "purple-soft": "#9B7FD4",
          pink: "#F472B6",
          peach: "#FDBA74",
          mint: "#6EE7B7",
          teal: "#2DD4BF",
          blue: "#60A5FA",
          green: "#4ADE80",
          yellow: "#FDE047",
          coral: "#FB7185",
          cream: "#FFFBF5",
          skin: "#C68642",
          "skin-light": "#E8B88A",
          "skin-dark": "#8D5524",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "Nunito", "system-ui", "sans-serif"],
        body: ["var(--font-nunito)", "Nunito", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card: "0 8px 32px rgba(61, 40, 104, 0.12)",
        "avatar-glow": "0 0 0 6px rgba(255,255,255,0.95), 0 0 0 10px rgba(255,255,255,0.5), 0 12px 28px rgba(91, 62, 150, 0.25)",
        "avatar-glow-active":
          "0 0 0 6px rgba(255,255,255,1), 0 0 0 12px rgba(253, 224, 71, 0.6), 0 16px 36px rgba(91, 62, 150, 0.35)",
        soft: "0 4px 20px rgba(91, 62, 150, 0.08)",
      },
      backgroundImage: {
        "ring-purple": "linear-gradient(145deg, #7B5BB8 0%, #5B3E96 100%)",
        "ring-green": "linear-gradient(145deg, #6EE7B7 0%, #34D399 100%)",
        "ring-orange": "linear-gradient(145deg, #FDBA74 0%, #FB923C 100%)",
        "ring-pink": "linear-gradient(145deg, #F9A8D4 0%, #F472B6 100%)",
        "journey-soft":
          "linear-gradient(180deg, #E8E4F8 0%, #C4B5FD 40%, #93C5FD 75%, #A7F3D0 100%)",
      },
      animation: {
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
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
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
