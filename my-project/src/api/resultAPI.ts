// api/resultAPI.ts
import axiosInstance from "./axiosInstance";

export const getInterviewResults = async () => {
  const response = await axiosInstance.get("/results/list");
  return response.data;
};

export const getInterviewResultDetail = async (interviewId: number) => {
  const response = await axiosInstance.get(`/results/${interviewId}`);
  return response.data;
};
