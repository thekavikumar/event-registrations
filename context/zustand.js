import { create } from "zustand";

export const useProfile = create((set) => ({
  cart: [],
  setCart: (item) => set((state) => ({ cart: item })),
  removeAll: () => set({ cart: [] }),
}));
