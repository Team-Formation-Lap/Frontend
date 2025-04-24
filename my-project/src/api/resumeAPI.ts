import axiosInstance from "./axiosInstance";
import useAuthStore from "../store/authStore";
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
export const startInterview = async (resumeId?: number) => {
  console.log("📝 면접 시작 API 호출, resumeId:", resumeId);
  const data = {
    question_count: 10,
    ...(resumeId && { resume_id: resumeId }),
  };
  console.log("📦 요청 데이터:", data);

  try {
    const response = await axiosInstance.post("/api/apps/start", data);
    console.log("✅ API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API 오류:", error);
    throw error;
  }
};
