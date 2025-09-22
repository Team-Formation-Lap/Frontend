import axios from "axios";
import useAuthStore from "../store/authStore";
import { refreshAccessToken, isTokenExpired } from "./tokenService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터: 토큰 확인 및 자동 갱신
axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      // 토큰이 만료되었는지 확인
      if (isTokenExpired(accessToken)) {
        console.log("🔄 토큰이 만료되어 갱신을 시도합니다.");
        const newToken = await refreshAccessToken();

        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          // 토큰 갱신 실패 시 인증 헤더 제거
          delete config.headers.Authorization;
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("🔄 401 에러 발생, 토큰 갱신을 시도합니다.");
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } else {
        // 토큰 갱신 실패 시 로그아웃
        useAuthStore.getState().logout();
        window.location.href = "/"; // 로그인 페이지로 리다이렉트
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
