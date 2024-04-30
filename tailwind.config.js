/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        a: '#348D48',
        b: '#232C33',
        c: '#F2F5EA',
        d: '#E5E7EB',
        e: '#374151',
        f: '#727375',
        border: ' #A4A4A4',
        input: '#e6e6e6',
        ring: "#f2f2f2",
        background: '#F2F5EA',
        foreground: '#f2f2f2',
        primary: {
          DEFAULT: '#348D48',
          foreground: '#f2f2f2',
        },
        secondary: {
          DEFAULT: '#232C33',
          foreground: '#f2f2f2',
        },
        destructive: {
          DEFAULT: '#d9534f',
          foreground: '#f2f2f2',
        },
        muted: {
          DEFAULT: '#f4f4f4',
          foreground: '#757575',
        },
        accent: {
          DEFAULT: '#f4f4f4',
          foreground: '#191e1f',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#232C33',
        },
        card: {
          DEFAULT: '#F2F5EA',
          foreground: '#f2f2f2',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.25rem',
        sm: '0.125rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}