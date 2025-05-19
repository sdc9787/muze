import { create } from "zustand";

export const useDarkMode = create((set) => ({
  isDarkMode: typeof window !== "undefined" && (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)),
  toggleDarkMode: () => {
    set((state) => {
      const newTheme = !state.isDarkMode ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return { isDarkMode: !state.isDarkMode };
    });
  },
}));
