import { create } from "zustand";

export const useSideMenu = create((set) => ({
  isSideMenuOpen: false,
  toggleSideMenuOpen: () => set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
}));
