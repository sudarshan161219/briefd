import { create } from "zustand";
import { clearAuthToken } from "@/lib/api/api"; // Adjust path to your axios setup

interface User {
  name: string;
  slug: string;
  adminToken: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  logout: () => {
    clearAuthToken();
    set({ user: null, isAuthenticated: false });
    window.location.href = "/";
  },
}));
