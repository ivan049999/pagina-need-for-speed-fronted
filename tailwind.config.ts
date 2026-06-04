import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        nfs: {
          neon: "rgb(var(--nfs-neon-rgb) / <alpha-value>)",
          asphalt: "#0a0a0f",
          chrome: "#c0c5ce",
          heat: "#ff3d00",
          unbound: "#39ff14",
        },
      },
      fontFamily: {
        sans: ["var(--font-nfs)", "system-ui", "sans-serif"],
        display: ["var(--font-nfs)", "system-ui", "sans-serif"],
        body: ["var(--font-nfs)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
