import type { Config } from "tailwindcss";

const config: Config = {
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
        Blue: "#27A6F5",
        DarkerBlue: "#2779F5",
        skyBlue: "#C3EBFA",
        lightPurple: "#F1F0FF",
        darkerPurple: "#CFCEFF",
        lightYellow: "#FEFCE8",
        darkerYellow: "#FAE27C"
      },
    },

  },
  plugins: [],
};
export default config;
