import axiosInstance from "./axiosInstance";

// 이력서 업로드 API
export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(`/resumes/upload/1`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// 면접 시작 API
export const startInterview = async () => {
  const response = await axiosInstance.post("/api/apps/start", {
    user_id: 1,
    question_count: 3,
  });

  return response.data;
};
