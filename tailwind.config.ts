import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "strongOrange":"#E03616",
        "hoverOrange":"#cf2404",
        "gray-100":"#F7FAFC",
        "gray-200":"#EFF2F4",
        "gray-300":"#DEE2E7",
        "gray-400":"#BDC4CD",
        "gray-500":"#8B96A5",
        "gray-600":"#505050",
        "dark":"#1C1C1C",
        "starYellow":"#ffbe0b",
        "blue":"#0D6EFD",
        "pendingYellow":"#ffc738",
        "blue-500":"#00F",
        "orange-500":"#f90",
        "red-500": "#F00",
        "green-500": "#0F0",
        "yellow-500": "#FF0",
        "purple-500": "#800080",
        "pink-500": "#FFC0CB",
        "teal-500": "#008080",
        "cyan-500": "#00FFFF",
        "brown-500": "#A52A2A"
      }
    },
  },
  plugins: [],
};
export default config;
