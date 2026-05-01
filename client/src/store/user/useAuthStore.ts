import { create } from "zustand";
import { clearAuthToken } from "@/lib/api/api";

interface User {
  name: string;
  slug: string;
  adminToken: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  setUser: (user) =>
    set((state) => {
      // don't update if same value
      if (state.user === user) return state;

      return {
        user,
        isAuthenticated: !!user,
        isInitialized: true,
      };
    }),

  logout: () => {
    clearAuthToken();
    set({ user: null, isAuthenticated: false });
    window.location.href = "/";
  },
}));
