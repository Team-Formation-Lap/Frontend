// hooks/useLogin.ts
import { useState } from "react";
import useAuthStore from "../store/authStore";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
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

      // 백엔드 응답에서 userId가 없다면 임시로 생성 (백엔드 수정 전까지)
      const loginData = {
        access: data.access,
        refresh: data.refresh,
        userId: data.userId || Date.now(), // 임시 userId (백엔드에서 제공될 때까지)
        nickname: data.nickname,
        email: data.email,
      };

      console.log("✅ 로그인 성공");
      console.log("🔐 Access Token:", loginData.access);
      console.log("🔄 Refresh Token:", loginData.refresh);
      console.log("👤 User ID:", loginData.userId);
      console.log("👤 Nickname:", loginData.nickname);
      console.log("📧 Email:", loginData.email);

      // Zustand 스토어에 모든 데이터 저장
      login(loginData);

      // 이메일과 패스워드 초기화
      setEmail("");
      setPassword("");
      
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
    login: handleLogin,
    loading,
    errorMessage,
  };
};
