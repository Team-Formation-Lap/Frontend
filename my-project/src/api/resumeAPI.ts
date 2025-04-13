import axiosInstance from "./axiosInstance";
import { useAuthStore } from "../store/authStore";
// 이력서 업로드 API
export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = useAuthStore.getState().accessToken;

  const response = await axiosInstance.post(`/resumes/upload/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

// 면접 시작 API
export const startInterview = async () => {
  const response = await axiosInstance.post("/api/apps/start", {
    question_count: 3,
  });
  return response.data;
};
