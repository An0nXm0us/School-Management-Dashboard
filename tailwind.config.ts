import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        ring: "hsl(var(--ring))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))",
        tagBlue: {
          DEFAULT: "hsl(var(--tag-blue))",
          foreground: "hsl(var(--tag-blue-foreground))",
        },
        tagPurple: {
          DEFAULT: "hsl(var(--tag-purple))",
          foreground: "hsl(var(--tag-purple-foreground))",
        },
        tagAmber: {
          DEFAULT: "hsl(var(--tag-amber))",
          foreground: "hsl(var(--tag-amber-foreground))",
        },
        tagGreen: {
          DEFAULT: "hsl(var(--tag-green))",
          foreground: "hsl(var(--tag-green-foreground))",
        },
      },
      borderRadius: {
        xl: "0.875rem",
      },
    },
  },
  plugins: [],
};
export default config;
