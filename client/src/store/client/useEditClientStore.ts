import { create } from "zustand";

interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  companyName?: string;
}

interface CLientState {
  client: Client | null;

  // Actions
  setClient: (client: Client | null) => void;
}

export const useEditClientStore = create<CLientState>((set) => ({
  client: null,

  setClient: (client) =>
    set({
      client,
    }),
}));
