// src/hooks/useUploadInterviewVideo.ts
//  영상 업로드 로직
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // ← 전역 인스턴스 사용
// import { InterviewId } from "../types"; // 필요시 타입 분리

const useUploadInterviewVideo = (
  videoChunksRef: React.RefObject<Blob[]>,
  interviewId: number,
  stopVideoRecording: () => void,
  socket: WebSocket | null
) => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const uploadVideo = async () => {
    console.log("면접 종료 시도");
    setUploading(true);
    stopVideoRecording();

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
      console.log("웹소켓 연결 종료됨.");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // 딜레이

    let waitTime = 0;
    while (
      (!videoChunksRef.current || videoChunksRef.current.length === 0) &&
      waitTime < 5000
    ) {
      await new Promise((r) => setTimeout(r, 500));
      waitTime += 500;
    }

    if (!videoChunksRef.current || videoChunksRef.current.length === 0) {
      console.error("녹화된 영상 없음");
      setUploading(false);
      return;
    }

    const videoBlob = new Blob(videoChunksRef.current, {
      type: "video/webm",
    });
    const formData = new FormData();
    formData.append("file", videoBlob, "interviewVideo.webm");

    try {
      const res = await axiosInstance.post(
        `/results/upload/${interviewId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // 여기서 영상 업로드에 성공하면 네비게이션 처리 -> 리포트 페이지로 이동
      if (res.status === 201) {
        console.log("영상 업로드 성공");
        navigate("/report", { state: { interviewId } });
      } else {
        console.error("업로드 실패", res);
      }
    } catch (err) {
      console.error("업로드 중 오류", err);
    } finally {
      setUploading(false);
    }
  };

  return { uploading, uploadVideo };
};

export default useUploadInterviewVideo;
