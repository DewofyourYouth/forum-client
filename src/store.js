import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist((set, get) => ({
    token: null,
    setToken: (token) => set({ token }),
    logOut: () => set({ token: null }),
  }))
);
