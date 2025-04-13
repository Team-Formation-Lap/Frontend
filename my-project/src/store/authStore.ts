// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  userId: number | null;
  isLoggedIn: boolean;
  login: (token: string, userId: number) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      isLoggedIn: false,
      login: (token) =>
        set({
          accessToken: token,
          isLoggedIn: true,
        }),
      logout: () =>
        set({
          accessToken: null,
          userId: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage 키 이름
      partialize: (state) => ({
        accessToken: state.accessToken,
        userId: state.userId,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;
