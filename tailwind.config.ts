// tailwind.config.ts
import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C6E0FF",
        secondary: "#9ECAFF",
        accent: "#FFF5DB",
      },
      fontFamily: {
        bubble: ['Rubik', 'sans-serif'],
      },
    },
  }
};

export default config;
