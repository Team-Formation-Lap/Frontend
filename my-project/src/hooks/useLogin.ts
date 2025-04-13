// hooks/useLogin.ts
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "로그인 실패");
      }

      const data = await res.json();
      console.log("📦 응답 데이터:", data);

      const token = data.access;
      // ✅ 콘솔 출력 추가
      console.log("✅ 로그인 성공");
      console.log("🔐 Access Token:", token);

      setAccessToken(token);
      localStorage.setItem("accessToken", token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ 로그인 에러:", err.message);
      setErrorMessage(err.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    login,
    loading,
    errorMessage,
  };
};
