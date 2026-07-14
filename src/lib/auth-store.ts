import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  document?: string;
  isB2B?: boolean;
  userType: 'CUSTOMER' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (data: { user: User; accessToken: string; refreshToken: string }) => void;
  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true, isLoading: false }),

      setUser: (user) => set({ user }),

      login: (user) =>
        set({
          user,
          accessToken: 'mock-token-' + Date.now(),
          refreshToken: 'mock-refresh-' + Date.now(),
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'best-gelo-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);