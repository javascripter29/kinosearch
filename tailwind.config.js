/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Основная палитра фиолетовых оттенков
        primary: {
          50: "#f0f0ff",
          100: "#e8ebff",
          200: "#e8deff",
          300: "#d8c7ff",
          400: "#b99aff",
          500: "#9b6dff",
          600: "#9146ff",
          700: "#7c40ff",
          800: "#6d2aff",
          900: "#651fff",
        },
        dark: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#000000",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
        bounce: "bounce 1s infinite",
      },
      backdropBlur: {
        xl: "20px",
      },
    },
  },
  plugins: [],
};
