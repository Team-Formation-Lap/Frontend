// api/resultAPI.ts
import axiosInstance from "./axiosInstance";

export const getInterviewResults = async () => {
  const response = await axiosInstance.get("/results/list");
  return response.data;
};

export const getInterviewResultDetail = async (resultId: number) => {
  const response = await axiosInstance.get(`/results/${resultId}`);
  return response.data;
};

export const deleteInterviewResult = async (resultId: number) => {
  try {
    const response = await axiosInstance.delete(`/results/delete/${resultId}`);

    if (response.status >= 400) {
      throw new Error(`삭제 실패: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("삭제 API 오류:", error);
    throw error;
  }
};
