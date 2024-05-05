import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#DCE8F2",

          "secondary": "#B4E2DF",

          "accent": "#41699A",

          "neutral": "#2a323c",

          "base-100": "#f3f4f6",

          "info": "#00b5ff",

          "success": "#4ade80",

          "warning": "#ffbe00",

          "error": "#ff5861",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
};
export default config;
