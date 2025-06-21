// 이 훅이 하는 일

// 1. startVideoRecording() : 사용자의 카메라/마이크 접근 → 영상 녹화 시작
// 2. stopVideoRecording() : 녹화 중단 + 영상 데이터 준비
// 3. videoChunksRef : 영상 데이터가 저장된 곳 (녹화 후 저장용으로 사용 가능)
// 4. Zustand 상태 : videoRecording 상태 전역 관리 (녹화 중인지 여부)

import { useRef, useCallback } from "react";
import useInterviewStore from "../store/useInterviewStore";

const useVideoRecorder = () => {
  const { videoRecording, setVideoRecording } = useInterviewStore();
  const videoMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);

  // 녹화 시작
  const startVideoRecording = useCallback(async () => {
    if (videoRecording) {
      console.warn("이미 녹화 중입니다! 중복 실행 방지됨.");
      return;
    }
    setVideoRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      videoMediaRecorderRef.current = mediaRecorder;
      setVideoRecording(true);
      console.log("영상 녹화 시작");
    } catch (error) {
      console.error("영상 녹화 시작 실패:", error);
    }
  }, [videoRecording, setVideoRecording]);

  // 녹화 종료
  const stopVideoRecording = () => {
    if (videoMediaRecorderRef.current) {
      videoMediaRecorderRef.current.stop();
      videoMediaRecorderRef.current.onstop = () => {
        console.log("영상 녹화 완료. 저장 준비 완료");
        // videoChunksRef.current에 녹화된 영상이 있음
      };
      setVideoRecording(false);
    }
  };

  return {
    videoRecording,
    startVideoRecording,
    stopVideoRecording,
    videoChunksRef, // 필요하다면 부모 컴포넌트로 전달 가능
  };
};

export default useVideoRecorder;
