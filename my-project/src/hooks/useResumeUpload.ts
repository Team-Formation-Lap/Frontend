import { useState } from "react";
import { uploadResume, startInterview } from "../api/resumeAPI";
import useNavigation from "./useNavigation";

const useResumeUpload = (onClose: () => void) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const { goToInterview } = useNavigation();

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setUploadCompleted(false); // 새로운 파일 선택 시 완료 상태 초기화
    }
  };

  // 이력서 업로드 핸들러
  const handleUploadResume = async () => {
    if (!file) return alert("파일을 선택해주세요.");
    setUploading(true);

    try {
      const response = await uploadResume(file);
      if (response.status === 201) {
        alert("이력서가 성공적으로 업로드되었습니다!");
        setUploadCompleted(true);
      } else {
        alert("업로드 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  // 업로드 상태 초기화 함수
  const resetUploadState = () => {
    setFile(null);
    setUploadCompleted(false);
  };

  // 면접 시작 핸들러
  const handleStartInterviewClick = async (resumeId?: number) => {
    console.log("면접 시작 함수 호출됨, resumeId:", resumeId);
    try {
      console.log("📡 startInterview API 호출 시도...");
      const data = await startInterview(resumeId);
      console.log("API 응답 데이터:", data);
      if (data?.interview_id) {
        console.log("면접 페이지로 이동, interview_id:", data.interview_id);
        goToInterview(data.interview_id);
        onClose();
      }
    } catch (error) {
      console.error("면접 시작 오류:", error);
    }
  };

  return {
    file,
    uploading,
    uploadCompleted,
    handleFileChange,
    handleUploadResume,
    handleStartInterviewClick,
    resetUploadState,
  };
};

export default useResumeUpload;
