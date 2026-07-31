// Recharts needs concrete color strings (some of its internals do string
// math on colors, and CountChart bakes color into its `data` array), so we
// resolve a palette in JS per theme instead of pointing chart props at the
// CSS custom properties in globals.css directly.

export interface ChartPalette {
  grid: string;
  tick: string;
  track: string;
  accent: string;
  amber: string;
  purple: string;
  success: string;
  danger: string;
  tooltip: {
    backgroundColor: string;
    color: string;
    border: string;
  };
}

export const chartColors: Record<"light" | "dark", ChartPalette> = {
  light: {
    grid: "hsl(220, 14%, 90%)",
    tick: "hsl(220, 9%, 45%)",
    track: "hsl(220, 20%, 96%)",
    accent: "hsl(217, 91%, 60%)",
    amber: "hsl(38, 92%, 55%)",
    purple: "hsl(262, 83%, 65%)",
    success: "hsl(142, 71%, 45%)",
    danger: "hsl(0, 72%, 51%)",
    tooltip: {
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(222, 20%, 12%)",
      border: "1px solid hsl(220, 14%, 90%)",
    },
  },
  dark: {
    grid: "hsl(222, 16%, 20%)",
    tick: "hsl(217, 12%, 62%)",
    track: "hsl(222, 18%, 15%)",
    accent: "hsl(217, 91%, 65%)",
    amber: "hsl(38, 92%, 60%)",
    purple: "hsl(262, 85%, 75%)",
    success: "hsl(142, 60%, 50%)",
    danger: "hsl(0, 70%, 58%)",
    tooltip: {
      backgroundColor: "hsl(222, 24%, 10%)",
      color: "hsl(210, 20%, 92%)",
      border: "1px solid hsl(222, 16%, 20%)",
    },
  },
};

export function getChartPalette(resolvedTheme: string | undefined): ChartPalette {
  return chartColors[resolvedTheme === "dark" ? "dark" : "light"];
}
