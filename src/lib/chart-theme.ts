"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ChartTheme {
  grid: string;
  axis: string;
  tick: string;
  label: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipLabel: string;
}

const dark: ChartTheme = {
  grid: "#2a2f3e",
  axis: "#2a2f3e",
  tick: "#5c6178",
  label: "#8b8fa3",
  tooltipBg: "#151921",
  tooltipBorder: "#2a2f3e",
  tooltipLabel: "#e8e8ec",
};

const light: ChartTheme = {
  grid: "#e0dbd3",
  axis: "#e0dbd3",
  tick: "#a8a29e",
  label: "#57534e",
  tooltipBg: "#ffffff",
  tooltipBorder: "#e0dbd3",
  tooltipLabel: "#1c1917",
};

export function useChartTheme(): ChartTheme {
  const { resolved } = useTheme();
  return resolved === "dark" ? dark : light;
}
