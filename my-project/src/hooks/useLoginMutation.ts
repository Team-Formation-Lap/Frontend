// hooks/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  userId: number;
  nickname: string;
  email: string;
}

const loginApi = async ({ email, password }: LoginParams): Promise<LoginResponse> => {
  const res = await fetch("http://localhost:8000/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "로그인 실패");
  }

  const data = await res.json();
  
  // 백엔드 응답을 표준화
  return {
    access: data.access,
    refresh: data.refresh,
    userId: data.userId || Date.now(), // 백엔드에서 userId를 제공하지 않는 경우 임시값
    nickname: data.nickname,
    email: data.email,
  };
};

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (loginData) => {
      console.log("✅ 로그인 성공 (React Query):", loginData);
      login(loginData);
    },
    onError: (error: Error) => {
      console.error("❌ 로그인 실패 (React Query):", error.message);
    },
  });
};
