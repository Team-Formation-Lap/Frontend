import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터: 요청을 보낼 때 `Content-Type`을 동적으로 설정
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json"; // 기본값은 JSON
  }
  return config;
});

export default axiosInstance;
