// src/pages/InterviewPage.tsx
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useInterviewStore from "../store/useInterviewStore";
import useWebSocket from "../hooks/useWebSocket";
import useAudioRecorder from "../hooks/useAudioRecorder";
import useVideoRecorder from "../hooks/useVideoRecorder";

import InterviewHeader from "../components/headers/InterviewHeader";
import VirtualInterviewer from "../components/VirtualInterviewer";
import WebcamFeed from "../components/WebcamFeed";

const InterviewPage = () => {
  const [searchParams] = useSearchParams();
  const virtualInterviewerRef = useRef<{
    playVideo: () => void;
    pauseVideo: () => void;
  } | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const displayStreamRef = useRef<MediaStream | null>(null);

  const { setInterviewId, recording } = useInterviewStore();

  const { startRecording, stopRecording } = useAudioRecorder();
  const {
    videoRecording,
    startVideoRecording,
    stopVideoRecording,
    videoChunksRef,
  } = useVideoRecorder();

  // URL 파라미터에서 면접 ID 가져오기
  useEffect(() => {
    const id = Number(searchParams.get("id"));
    if (id) {
      setInterviewId(id);
    }
  }, [searchParams, setInterviewId]);

  // 부모 창에서 전달받은 디스플레이 스트림 처리
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === "DISPLAY_STREAM") {
        try {
          // 부모 창에서 전달받은 스트림을 직접 사용
          const displayStream = event.data.stream;
          displayStreamRef.current = displayStream;

          // videoRecorder에 스트림 전달
          if (!videoRecording) {
            startVideoRecording(displayStream);
          }
        } catch (error) {
          console.error("스트림 처리 중 오류:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      // 컴포넌트 언마운트 시 스트림 정리
      if (displayStreamRef.current) {
        displayStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoRecording, startVideoRecording]);

  // 웹소켓 연결 & 메시지 처리
  useWebSocket(virtualInterviewerRef, currentAudioRef);

  return (
    <div className="flex flex-col h-screen">
      <div
        style={{
          position: "relative",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        {/* 가상 면접관 */}
        <div style={{ position: "absolute", inset: 0 }}>
          <VirtualInterviewer ref={virtualInterviewerRef} />
        </div>

        {/* 웹캠 */}
        <div style={{ position: "fixed", bottom: 20, left: 20, zIndex: 99 }}>
          <WebcamFeed />
        </div>

        {/* 헤더 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          {useInterviewStore.getState().interviewId !== null && (
            <InterviewHeader
              interviewId={useInterviewStore.getState().interviewId!}
              stopVideoRecording={stopVideoRecording}
              socket={useInterviewStore.getState().socket}
              videoChunksRef={videoChunksRef}
            />
          )}
        </div>

        {/* 녹음 버튼 */}
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1100 }}>
          {!recording ? (
            <button
              onClick={startRecording}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-semibold transition flex items-center gap-x-2"
            >
              🎤 <span>답변하기</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg font-semibold transition flex items-center gap-x-2"
            >
              ⏹ <span>답변마치기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
