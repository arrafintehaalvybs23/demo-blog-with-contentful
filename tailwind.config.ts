import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
}) satisfies Config;
