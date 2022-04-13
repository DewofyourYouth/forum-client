import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist((set) => ({
    token: null,
    threads: [],
    setThreadsStore: (threads) => set({ threads }),
    deleteThread: (threads) => set(set(threads)),
    setToken: (token) => set({ token }),
    logOut: () => set({ token: null }),
  }))
);
