import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#151516",
        ink: {
          DEFAULT: "#151516",
          2: "#2A2C2E",
          3: "#35373A",
        },
        bone: {
          DEFAULT: "#F5F2EC",
          2: "#EFEBE2",
        },
        paper: "#F8F6F1",
        cream: "#FAFAF6",
        muted: {
          DEFAULT: "#807A70",
          2: "#A8A29A",
          3: "#C9C4BB",
        },
        gold: {
          DEFAULT: "#C49A55",
          2: "#D8B477",
          ember: "#E6A95B",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        meta: "0.1em",
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
