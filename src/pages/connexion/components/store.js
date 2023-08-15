import { create } from "zustand";

export const useAccountStore = create(
  (set) => ({
    account: undefined,
    setAccount: (account) => set({ account }),
  })
)