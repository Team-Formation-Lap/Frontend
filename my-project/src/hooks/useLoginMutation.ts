// hooks/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";

interface LoginParams {
  email: string;
  password: string;
}

const loginApi = async ({ email, password }: LoginParams) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("로그인 실패");
  }

  const data = await res.json();
  return data.accessToken; // 백엔드 응답 형태에 따라 수정
};

export const useLoginMutation = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (token) => {
      setAccessToken(token);
      localStorage.setItem("accessToken", token); // 새로고침 유지용
    },
  });
};
