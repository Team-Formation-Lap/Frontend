import axios from "axios";
import useAuthStore from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터: 요청을 보낼 때 `Content-Type`을 동적으로 설정
// axiosInstance.interceptors.request.use((config) => {
//   if (!config.headers["Content-Type"]) {
//     config.headers["Content-Type"] = "application/json"; // 기본값은 JSON
//   }
//   return config;
// });

// 요청마다 최신 accessToken 동적으로 주입
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
