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

  // 🎥 녹화 시작
  const startVideoRecording = useCallback(
    async (externalStream?: MediaStream) => {
      if (videoRecording) {
        console.warn("⚠️ 이미 녹화 중입니다! 중복 실행 방지됨.");
        return;
      }
      setVideoRecording(true);

      try {
        // 웹캠과 마이크 스트림 가져오기
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // 외부 스트림이 있는 경우 오디오 트랙 결합
        let combinedStream;
        if (externalStream) {
          const audioTracks = [
            ...cameraStream.getAudioTracks(),
            ...externalStream.getAudioTracks(),
          ];
          const videoTrack = cameraStream.getVideoTracks()[0];
          combinedStream = new MediaStream([videoTrack, ...audioTracks]);
        } else {
          combinedStream = cameraStream;
        }

        const mediaRecorder = new MediaRecorder(combinedStream, {
          mimeType: "video/webm",
        });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            videoChunksRef.current.push(event.data);
          }
        };

        // 녹화 중지 시 모든 스트림 정리
        mediaRecorder.onstop = () => {
          cameraStream.getTracks().forEach((track) => track.stop());
          if (externalStream) {
            externalStream.getTracks().forEach((track) => track.stop());
          }
        };

        mediaRecorder.start();
        videoMediaRecorderRef.current = mediaRecorder;
        console.log("🎬 영상 녹화 시작");
      } catch (error) {
        console.error("❌ 영상 녹화 시작 실패:", error);
        setVideoRecording(false);
      }
    },
    [videoRecording, setVideoRecording]
  );

  // ⏹ 녹화 종료
  const stopVideoRecording = () => {
    if (videoMediaRecorderRef.current) {
      videoMediaRecorderRef.current.stop();
      videoMediaRecorderRef.current.onstop = () => {
        console.log("🎞️ 영상 녹화 완료. 저장 준비 완료");
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
