// 이 훅이 하는 일
// 1. 웹소켓 연결 : interviewId로 웹소켓 자동 연결
// 2. 메시지 수신 : GPT 질문/음성 수신 시 오디오 재생
// 3. 가상 면접관 연동 : 음성 재생 시 playVideo(), 종료 시 pauseVideo() 호출
// 4. 전역 socket 상태 저장 : Zustand에 socket 저장해서 어디서든 접근 가능

import { useEffect } from "react";
import useInterviewStore from "../store/useInterviewStore";

type VirtualInterviewerRef = React.RefObject<{
  playVideo: () => void;
  pauseVideo: () => void;
}>;

const useWebSocket = (
  virtualInterviewerRef: VirtualInterviewerRef | null,
  currentAudioRef: React.MutableRefObject<HTMLAudioElement | null>,
  enableVideoControl: boolean = true // ✅ 기본값은 true
) => {
  const { interviewId, setSocket } = useInterviewStore();

  useEffect(() => {
    if (!interviewId) return;

    const ws = new WebSocket(
      `ws://localhost:8000/ws/interview/${interviewId}/`
    );
    setSocket(ws);

    ws.onopen = () => {
      console.log("✅ 웹소켓 연결 성공!");
    };

    ws.onmessage = (event) => {
      console.log("📩 서버 메시지 수신:", event.data);

      try {
        const data = JSON.parse(event.data);

        if (data.text && data.audio_url) {
          console.log("🎤 질문:", data.text);
          console.log("🔊 오디오 URL:", data.audio_url);

          // 기존 오디오가 재생 중이면 정지
          if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
          }

          const audio = new Audio(data.audio_url);
          currentAudioRef.current = audio;

          audio.play().then(() => {
            if (enableVideoControl) {
              virtualInterviewerRef?.current?.playVideo();
            }
          });

          audio.addEventListener("ended", () => {
            if (enableVideoControl) {
              virtualInterviewerRef?.current?.pauseVideo();
            }
            currentAudioRef.current = null;
          });
        } else if (data.message) {
          console.log("💬 시스템 메시지:", data.message);
        } else {
          console.warn("⚠️ 알 수 없는 형식:", data);
        }
      } catch (err) {
        console.error("🛑 JSON 파싱 오류:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("❌ 웹소켓 오류:", error);
    };

    ws.onclose = () => {
      console.log("🔌 웹소켓 연결 종료");
    };

    return () => {
      ws.close(); // 언마운트 시 종료
    };
  }, [interviewId, virtualInterviewerRef, currentAudioRef, setSocket]);
};

export default useWebSocket;
