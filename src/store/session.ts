import { SessionState } from "@/types/StateTypes";
import { create } from "zustand";

export const useSessionStore = create<SessionState>((set) => ({
  sessionExpiredOpen: false,

  showSessionExpired: () => {
    set({ sessionExpiredOpen: true });
  },

  hideSessionExpired: () => {
    set({ sessionExpiredOpen: false });
  },
}));
