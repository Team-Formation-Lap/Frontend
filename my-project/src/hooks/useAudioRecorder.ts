// 이 훅이 하는 일

// 1. startRecording() : 마이크 권한 요청 → MediaRecorder로 녹음 시작
// 2. stopRecording() : 녹음 종료 → 데이터 조각 합치고 서버로 전송
// 3. sendAudio() : 웹소켓으로 음성 Blob 전송
// 4. 내부 상태	: mediaRecorderRef, audioChunksRef 로컬 관리, recording은 zustand로 공유

import { useRef } from "react";
import useInterviewStore from "../store/useInterviewStore";

const useAudioRecorder = () => {
  const { socket, setRecording } = useInterviewStore();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 🎤 녹음 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
      console.log("🎙️ 녹음 시작");
    } catch (error) {
      console.error("❌ 마이크 접근 실패:", error);
    }
  };

  // ⏹ 녹음 종료 및 서버 전송
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        sendAudio(audioBlob);
        audioChunksRef.current = [];
      };
      setRecording(false);
      console.log("🛑 녹음 종료");
    }
  };

  // 📤 서버로 오디오 전송
  const sendAudio = (audioBlob: Blob) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(audioBlob);
      console.log("📡 음성 전송 완료!");
    } else {
      console.error("🚫 웹소켓이 열려있지 않음.");
    }
  };

  return {
    startRecording,
    stopRecording,
  };
};

export default useAudioRecorder;
