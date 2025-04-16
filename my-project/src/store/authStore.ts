// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  userId: number | null;
  nickname: string | null;
  isLoggedIn: boolean;
  login: (token: string, userId: number, nickname: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      nickname: null,
      isLoggedIn: false,
      login: (token, userId, nickname) =>
        set({
          accessToken: token,
          userId: userId,
          nickname: nickname,
          isLoggedIn: true,
        }),
      logout: () =>
        set({
          accessToken: null,
          userId: null,
          nickname: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage 키 이름
      partialize: (state) => ({
        accessToken: state.accessToken,
        userId: state.userId,
        nickname: state.nickname,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;
