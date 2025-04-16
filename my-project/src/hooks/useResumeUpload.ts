import { useState } from "react";
import { uploadResume, startInterview } from "../api/resumeAPI";
// import useNavigation from "./useNavigation";

const useResumeUpload = (onClose: () => void) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  // const { goToInterview } = useNavigation();

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

  // ✅ 업로드 상태 초기화 함수
  const resetUploadState = () => {
    setFile(null);
    setUploadCompleted(false);
  };

  // 면접 시작 핸들러
  const handleStartInterviewClick = async () => {
    // if (!uploadCompleted) return;
    // console.log("uploadCompleted", uploadCompleted);
    try {
      // 1. 면접 세션 시작
      const data = await startInterview();
      if (!data?.interview_id) {
        throw new Error("면접 세션 생성 실패");
      }

      // 2. 새 창으로 면접 페이지 열기
      const interviewWindow = window.open(
        `/interview?id=${data.interview_id}`,
        "Interview Room",
        "width=1024,height=768,menubar=no,toolbar=no,status=no"
      );

      if (!interviewWindow) {
        alert("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
        return;
      }

      // 3. 새 창이 완전히 로드된 후에 오디오 공유 시작
      interviewWindow.onload = async () => {
        try {
          // 화면 공유 권한 요청 (오디오 포함)
          const displayStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          });

          // 스트림 정보를 자식 창으로 전달
          interviewWindow.postMessage(
            {
              type: "DISPLAY_STREAM",
              stream: displayStream,
            },
            "*"
          );

          // 자식 창이 닫힐 때 스트림 정리
          interviewWindow.onbeforeunload = () => {
            displayStream.getTracks().forEach((track) => track.stop());
          };

          onClose(); // 모달 닫기
        } catch (error) {
          if (error instanceof Error && error.name === "NotAllowedError") {
            alert(
              "화면 공유가 필요합니다. 면접을 시작하려면 화면 공유를 허용해주세요."
            );
            interviewWindow.close(); // 면접 창 닫기
            return;
          }
          console.error("오디오 공유 오류:", error);
          alert("오디오 공유 설정 중 오류가 발생했습니다.");
          interviewWindow.close(); // 면접 창 닫기
        }
      };
    } catch (error) {
      console.error("면접 시작 오류:", error);
      alert("면접 시작 중 오류가 발생했습니다.");
    }
  };

  return {
    file,
    uploading,
    uploadCompleted,
    handleFileChange,
    handleUploadResume,
    handleStartInterviewClick,
    resetUploadState, // ✅ 외부에서 초기화 가능하게 export
  };
};

export default useResumeUpload;
