// src/pages/InterviewPage.tsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useInterviewStore from "../store/useInterviewStore";
import useWebSocket from "../hooks/useWebSocket";
import useAudioRecorder from "../hooks/useAudioRecorder";
import useVideoRecorder from "../hooks/useVideoRecorder";

import InterviewHeader from "../components/headers/InterviewHeader";
import VirtualInterviewer from "../components/VirtualInterviewer";
import WebcamFeed from "../components/WebcamFeed";

const InterviewPage = () => {
  const location = useLocation();
  const virtualInterviewerRef = useRef<{
    playVideo: () => void;
    pauseVideo: () => void;
  } | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const { interviewId, setInterviewId, recording } = useInterviewStore();

  const { startRecording, stopRecording } = useAudioRecorder();
  const {
    videoRecording,
    startVideoRecording,
    stopVideoRecording,
    videoChunksRef,
  } = useVideoRecorder();

  // 면접 ID 설정
  useEffect(() => {
    const id = Number(location.state?.interviewId || null);
    setInterviewId(id);
  }, [location, setInterviewId]);

  // 웹소켓 연결 & 메시지 처리
  useWebSocket(virtualInterviewerRef, currentAudioRef, true); // or 생략해도 true

  // 영상 녹화 시작
  useEffect(() => {
    if (!videoRecording) {
      startVideoRecording();
      console.log("🎥 startVideoRecording 실행됨");
    }
  }, [videoRecording, startVideoRecording]);

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
          {interviewId !== null && (
            <InterviewHeader
              interviewId={interviewId}
              stopVideoRecording={stopVideoRecording}
              socket={useInterviewStore.getState().socket} // 전역 상태에서 socket 가져오기
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
