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
        abyss: "#050505",
        graphite: "#101014",
        panel: "#13131a",
        panelSoft: "#181821",
        electric: "#33a8ff",
        neonRed: "#ff4d67",
        neonPurple: "#8b5cf6",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 18px 50px rgba(0,0,0,0.45)",
        red: "0 0 32px rgba(255, 77, 103, 0.16)",
        blue: "0 0 32px rgba(51, 168, 255, 0.16)",
        purple: "0 0 32px rgba(139, 92, 246, 0.16)",
      },
      backgroundImage: {
        "dashboard-grid":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
