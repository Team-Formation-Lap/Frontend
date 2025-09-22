// types/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  userId: number;
  nickname: string;
  email: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  questionCount?: number;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  nickname: string | null;
  email: string | null;
  isLoggedIn: boolean;
}
