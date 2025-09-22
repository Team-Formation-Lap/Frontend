// api/tokenService.ts
import useAuthStore from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Refresh Token으로 새로운 Access Token 요청
export const refreshAccessToken = async (): Promise<string | null> => {
  const { refreshToken, updateTokens, logout } = useAuthStore.getState();

  if (!refreshToken) {
    console.error("❌ Refresh token이 없습니다.");
    logout();
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/user/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    const newAccessToken = data.access;

    console.log("✅ 토큰 갱신 성공:", newAccessToken);
    updateTokens(newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("❌ 토큰 갱신 실패:", error);
    logout(); // Refresh token도 만료된 경우 로그아웃
    return null;
  }
};

// Access Token의 만료 시간 확인
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

// 토큰이 만료되었는지 확인하고 필요시 갱신
export const ensureValidToken = async (): Promise<string | null> => {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) {
    console.error("❌ Access token이 없습니다.");
    return null;
  }

  if (isTokenExpired(accessToken)) {
    console.log("🔄 토큰이 만료되어 갱신을 시도합니다.");
    return await refreshAccessToken();
  }

  return accessToken;
};
