import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        primaryDark: "#1E40AF",
        secondary: "#FACC15",
        background: "#FFFFFF",
      },
    },
  },
  plugins: [],
} satisfies Config;