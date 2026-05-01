import { create } from "zustand";

interface CLientState {
  clientId: string | undefined;

  // Actions
  setClientId: (clientId: string | undefined) => void;
}

export const useClientIdStore = create<CLientState>((set) => ({
  clientId: undefined,

  setClientId: (clientId) =>
    set({
      clientId,
    }),
}));
