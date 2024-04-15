import { useState, useEffect } from "react";

export type Theme = "inherit" | "light" | "dark";

export const useAutoDark = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const handleThemeChange = (system: MediaQueryList) => {
    if (system.matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  useEffect(() => {
    handleThemeChange(system);
    system.addEventListener("change", () => handleThemeChange(system));
    return () => {
      system.removeEventListener("change", () => handleThemeChange(system));
    };
  }, []);
  return [theme, setTheme] as const;
};
