import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "strongOrange":"#E03616",
        "gray-100":"#F7FAFC",
        "gray-200":"#EFF2F4",
        "gray-300":"#DEE2E7",
        "gray-400":"#BDC4CD",
        "gray-500":"#8B96A5",
        "gray-600":"#505050",
        "dark":"#1C1C1C"
      }
    },
  },
  plugins: [],
};
export default config;
