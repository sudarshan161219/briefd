import { create } from "zustand";

interface CLientState {
  clientId: string;

  // Actions
  setClientId: (clientId: string) => void;
}

export const useClientIdStore = create<CLientState>((set) => ({
  clientId: "",

  setClientId: (clientId) =>
    set({
      clientId,
    }),
}));
