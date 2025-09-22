// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginResponse {
  access: string;
  refresh: string;
  userId: number;
  nickname: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  nickname: string | null;
  email: string | null;
  isLoggedIn: boolean;
  login: (loginData: LoginResponse) => void;
  logout: () => void;
  updateTokens: (accessToken: string, refreshToken?: string) => void;
  clearTokens: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      nickname: null,
      email: null,
      isLoggedIn: false,
      
      login: (loginData: LoginResponse) =>
        set({
          accessToken: loginData.access,
          refreshToken: loginData.refresh,
          userId: loginData.userId,
          nickname: loginData.nickname,
          email: loginData.email,
          isLoggedIn: true,
        }),
        
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userId: null,
          nickname: null,
          email: null,
          isLoggedIn: false,
        }),
        
      updateTokens: (accessToken: string, refreshToken?: string) => {
        const currentState = get();
        set({
          accessToken,
          refreshToken: refreshToken || currentState.refreshToken,
        });
      },
      
      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userId: state.userId,
        nickname: state.nickname,
        email: state.email,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;
