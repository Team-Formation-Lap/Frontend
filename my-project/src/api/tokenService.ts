// api/tokenService.ts
import useAuthStore from "../store/authStore";

const API_BASE_URL = "http://localhost:8000";

// Access Token의 만료 시간 확인
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // 5분 여유를 두고 만료 확인 (서버와 클라이언트 시간 차이 고려)
    const bufferTime = 5 * 60; // 5분
    return payload.exp < (currentTime + bufferTime);
  } catch {
    return true;
  }
};

// Refresh Token으로 새로운 Access Token 요청 (현재 백엔드에서 미지원)
export const refreshAccessToken = async (): Promise<string | null> => {
  const { refreshToken, logout } = useAuthStore.getState();

  if (!refreshToken) {
    console.error("❌ Refresh token이 없습니다.");
    logout();
    return null;
  }

  try {
    // TODO: 백엔드에서 refresh token API 구현 필요
    // 현재는 SimpleJWT의 기본 엔드포인트가 설정되지 않음
    console.log("⚠️ Refresh token API가 백엔드에 구현되지 않았습니다.");
    console.log("🔄 재로그인이 필요합니다.");
    
    // refresh token 기능이 없으므로 로그아웃 처리
    logout();
    return null;

    /* 백엔드에서 다음 URL 추가 시 사용 가능:
    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    const newAccessToken = data.access;
    
    useAuthStore.getState().updateTokens(newAccessToken);
    return newAccessToken;
    */
  } catch (error) {
    console.error("❌ 토큰 갱신 실패:", error);
    logout();
    return null;
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
    console.log("🔄 토큰이 만료되었습니다. 재로그인이 필요합니다.");
    return await refreshAccessToken(); // 현재는 로그아웃 처리됨
  }

  return accessToken;
};
