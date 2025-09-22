// src/pages/InterviewPage.tsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useInterviewStore from "../store/useInterviewStore";
import useWebSocket from "../hooks/useWebSocket";
import useAudioRecorder from "../hooks/useAudioRecorder";
import useVideoRecorder from "../hooks/useVideoRecorder";
import useUploadInterviewVideo from "../hooks/useUploadInterviewVideo";
import useAutoInterviewEnd from "../hooks/useAutoInterviewEnd";

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

  const { 
    interviewId, 
    setInterviewId, 
    recording, 
    setLoading, 
    isLoading,
    answerCount,
    maxAnswers,
    incrementAnswerCount,
    resetAnswerCount,
    socket,
    hasAutoEnded,
  } = useInterviewStore();

  const { startRecording, stopRecording } = useAudioRecorder();
  const {
    videoRecording,
    startVideoRecording,
    stopVideoRecording,
    videoChunksRef,
  } = useVideoRecorder();

  // 기존 면접 종료 훅 (버튼 클릭 시 사용하던 로직)
  const { uploading, uploadVideo } = useUploadInterviewVideo(
    videoChunksRef,
    interviewId!,
    stopVideoRecording,
    socket
  );

  // 자동 종료 훅 (기존 uploadVideo 함수 재사용)
  const { shouldAutoEnd, remainingAnswers } = useAutoInterviewEnd({
    uploadVideo,
  });

  // 면접 시작 시 답변 횟수 초기화
  useEffect(() => {
    resetAnswerCount();
  }, [resetAnswerCount]);

  // 면접 ID 설정
  useEffect(() => {
    const id = Number(location.state?.interviewId || null);
    setInterviewId(id);
  }, [location, setInterviewId]);

  // 웹소켓 연결 & 메시지 처리
  const { socket: wsSocket, isConnected } = useWebSocket(
    virtualInterviewerRef,
    currentAudioRef,
    true
  );

  // 웹소켓 연결 상태에 따른 로딩 처리
  useEffect(() => {
    if (isConnected) {
      setLoading(true);
    }
  }, [isConnected, setLoading]);

  // 메시지 수신 시 로딩 해제
  useEffect(() => {
    if (!wsSocket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.text && data.audio_url) {
          setLoading(false);
        }
      } catch (err) {
        console.error("JSON 파싱 오류:", err);
      }
    };

    wsSocket.addEventListener("message", handleMessage);
    return () => {
      wsSocket.removeEventListener("message", handleMessage);
    };
  }, [wsSocket, setLoading]);

  // 웹소켓 상태에 따른 로딩 처리
  useEffect(() => {
    if (!wsSocket) return;

    const handleOpen = () => {
      console.log("✅ 웹소켓 연결 성공!");
      setLoading(true);
    };

    const handleError = (error: Event) => {
      console.error("❌ 웹소켓 오류:", error);
    };

    const handleClose = () => {
      console.log("🔌 웹소켓 연결 종료");
    };

    wsSocket.addEventListener("open", handleOpen);
    wsSocket.addEventListener("error", handleError);
    wsSocket.addEventListener("close", handleClose);

    return () => {
      wsSocket.removeEventListener("open", handleOpen);
      wsSocket.removeEventListener("error", handleError);
      wsSocket.removeEventListener("close", handleClose);
    };
  }, [wsSocket, setLoading]);

  // 영상 녹화 시작
  useEffect(() => {
    if (!videoRecording) {
      startVideoRecording();
      console.log("🎥 startVideoRecording 실행됨");
    }
  }, [videoRecording, startVideoRecording]);

  // 답변 시작
  const handleStartRecording = () => {
    if (shouldAutoEnd || hasAutoEnded) {
      alert('면접이 종료되었습니다.');
      return;
    }
    startRecording();
  };

  // 답변 종료 - 답변 횟수 증가
  const handleStopRecording = () => {
    if (hasAutoEnded) {
      return; // 이미 자동 종료된 경우 무시
    }
    
    stopRecording();
    setLoading(true);
    
    // 답변 완료 시 횟수 증가
    incrementAnswerCount();
    
    console.log(`✅ ${answerCount + 1}번째 답변 완료`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 로딩 오버레이 */}
      {(isLoading || uploading) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg">
              {uploading
                ? "면접영상 업로드 중..." 
                : shouldAutoEnd || hasAutoEnded
                ? "면접을 종료하고 있습니다..." 
                : "질문을 생성하고 있습니다..."
              }
            </p>
          </div>
        </div>
      )}

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

        {/* 답변 진행 상황 표시 */}
        <div 
          style={{ 
            position: "fixed", 
            top: 100, 
            left: 20, 
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            fontSize: "14px"
          }}
        >
          {shouldAutoEnd || hasAutoEnded ? (
            <span className="text-yellow-300">🎉 면접 완료! 종료 중...</span>
          ) : (
            <span>
              📝 진행 상황: {answerCount}/{maxAnswers} 
              {remainingAnswers > 0 && (
                <span className="text-blue-300"> (남은 답변: {remainingAnswers}개)</span>
              )}
            </span>
          )}
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
              socket={wsSocket}
              videoChunksRef={videoChunksRef}
            />
          )}
        </div>

        {/* 녹음 버튼 */}
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1100 }}>
          {shouldAutoEnd || hasAutoEnded ? (
            // 자동 종료 상태일 때
            <div className="text-center">
              <div className="px-5 py-2 bg-yellow-600 text-white rounded-lg text-lg font-semibold mb-2">
                🎉 면접 완료!
              </div>
              <div className="text-sm text-gray-600">
                잠시만 기다려주세요...
              </div>
            </div>
          ) : !recording ? (
            <button
              onClick={handleStartRecording}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-semibold transition flex items-center gap-x-2"
              disabled={uploading}
            >
              🎤 <span>답변하기</span>
              {remainingAnswers > 0 && (
                <span className="text-sm">({remainingAnswers}개 남음)</span>
              )}
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg font-semibold transition flex items-center gap-x-2"
              disabled={uploading || hasAutoEnded}
            >
              ⏹ <span>답변마치기</span>
              <span className="text-sm">({answerCount + 1}/{maxAnswers})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
