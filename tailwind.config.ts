import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{ts,tsx}"], theme: { extend: { colors: {
  bg: "rgb(var(--bg) / <alpha-value>)", surface: "rgb(var(--surface) / <alpha-value>)", line: "rgb(var(--line) / <alpha-value>)",
  fg: "rgb(var(--fg) / <alpha-value>)", muted: "rgb(var(--muted) / <alpha-value>)", accent: "rgb(var(--accent) / <alpha-value>)" } } }, plugins: [] } satisfies Config;
