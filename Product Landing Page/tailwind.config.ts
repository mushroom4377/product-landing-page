import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        coal: "#080907",
        moss: "#27351f",
        leaf: "#7fa650",
        yolk: "#f6a623",
        shell: "#f5eee3",
        copper: "#b86f36"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(246, 166, 35, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
