import { useEffect, useState, useRef } from "react";
import InterviewHeader from "../components/InterviewHeader";
import "../index.css";
import { useLocation } from "react-router-dom"; // interview_id 가져오기

import WebcamFeed from "../components/WebcamFeed";
import VirtualInterviewer from "../components/VirtualInterviewer";

const InterviewPage = () => {
  const location = useLocation();
  const interviewId = Number(location.state?.interviewId || null);
  console.log("면접 ID:", interviewId);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [recording, setRecording] = useState(false); // 녹음 상태 관리
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  // 🎥 영상 녹화 관련 변수 추가
  const [, setVideoRecording] = useState(false);
  const videoMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  useEffect(() => {
    startVideoRecording(); // 페이지 진입 시 자동 영상 녹화 시작
  }, []);

  useEffect(() => {
    // 웹소켓 서버 연결
    const ws = new WebSocket(
      `ws://localhost:8000/ws/interview/${Number(interviewId)}/`
    );

    ws.onopen = () => {
      console.log("웹소켓 연결 성공!");
      // ws.send(JSON.stringify({ type: "init", message: "InterviewPage 접속" }));
    };

    ws.onmessage = (event) => {
      console.log("서버로부터 원본 메시지 수신:", event.data);

      try {
        const data = JSON.parse(event.data);

        if (data.text && data.audio_url) {
          // 🧑‍💻 GPT 질문 및 음성 URL 처리
          console.log("🎤 GPT 질문:", data.text);
          console.log("🔊 음성 파일 URL:", data.audio_url);

          // 메시지 업데이트
          setMessages((prev) => [...prev, data.text]);

          // 음성 자동 재생
          const audio = new Audio(data.audio_url);
          audio
            .play()
            .catch((error) => console.error("🔊 음성 재생 오류:", error));
        } else if (data.message) {
          // 💬 일반적인 시스템 메시지 처리
          console.log("💡 일반 메시지:", data.message);
          setMessages((prev) => [...prev, data.message]);
        } else {
          console.warn("⚠️ 서버에서 알 수 없는 데이터 형식 수신:", data);
        }
      } catch (error) {
        console.error("🛑 JSON 파싱 오류:", error);
      }
    };

    ws.onclose = () => {
      console.log("웹소켓 연결 종료");
    };

    ws.onerror = (error) => {
      console.error("웹소켓 오류 발생:", error);
    };

    setSocket(ws);

    return () => {
      ws.close(); // 페이지 언마운트 시 웹소켓 종료
    };
  }, []);

  // 🎤 음성 녹음 시작
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
      console.log("녹음 시작!");
    } catch (error) {
      console.error("마이크 접근 실패:", error);
    }
  };

  // ⏹ 녹음 종료 및 서버로 전송
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        sendAudio(audioBlob);
        audioChunksRef.current = []; // 녹음 데이터 초기화
      };
      setRecording(false);
      console.log("녹음 종료 및 서버로 전송");
    }
  };

  // 📤 웹소켓을 통해 서버로 음성 데이터 전송 (웹소켓 종료 없이)
  const sendAudio = (audioBlob: Blob) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      // 음성 데이터를 Base64로 변환 후 서버에 전송
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64Audio = reader.result;
        socket.send(JSON.stringify({ type: "audio", audio_url: base64Audio }));
        console.log("음성 메시지 서버로 전송 완료!");
      };
    } else {
      console.error("웹소켓이 연결되지 않았습니다.");
    }
  };
  // 🎥 영상 녹화 시작 함수
  const startVideoRecording = async () => {
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
      console.log("🎥 영상 녹화 시작!");
    } catch (error) {
      console.error("🎥 영상 녹화 시작 실패:", error);
    }
  };

  // 🎥 영상 녹화 중지 함수
  const stopVideoRecording = () => {
    if (videoMediaRecorderRef.current) {
      videoMediaRecorderRef.current.stop();
      videoMediaRecorderRef.current.onstop = () => {
        console.log("🎥 녹화 종료됨, 파일 저장 준비");
      };
      setVideoRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        {/* Virtual Interviewer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <VirtualInterviewer />
        </div>

        {/* Webcam Feed */}
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 99,
          }}
        >
          <WebcamFeed />
        </div>

        {/* Interview Header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <InterviewHeader
            interviewId={interviewId}
            stopVideoRecording={stopVideoRecording} // 면접 종료 시 영상 녹화도 중지
            socket={socket} // 웹소켓 연결 정보 전달
            videoChunksRef={videoChunksRef} // ✅ 녹화된 영상 데이터 전달
          />
        </div>

        {/* 웹소켓 메시지 표시 */}
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "white",
            padding: "15px 20px",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: "1.4",
            zIndex: 1000,
            whiteSpace: "pre-line",
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          <h4>질문</h4>
          <ul style={{ fontSize: "18px", color: "#aaa", margin: 0 }}>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>

        {/* 웹소켓 메시지 표시 */}
        {/* <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "white",
            padding: "15px 20px",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: "1.4",
            zIndex: 1000,
            whiteSpace: "pre-line",
            // opacity: visible ? 1 : 0, // 페이드인 효과
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          <h4>질문</h4>
          <p style={{ fontSize: "18px", color: "#aaa", margin: 0 }}>
            {" "}
            신수진 님, 귀하의 이력서를 통해 'Preview' 프로젝트에 대한 경험을
            읽어보았습니다. 이 프로젝트에서 프론트엔드 개발자로서 디자인, 페이지
            퍼블리싱, 그리고 API 연동 등 다양한 작업을 수행하셨는데요, 특히
            Recharts.js 라이브러리를 사용해 데이터를 시각화했다고 하셨습니다. 이
            부분에서 데이터 시각화를 위해 Recharts.js를 선택하신 이유와 이를
            통해 가장 도전적이었던 부분은 무엇이었는지 말씀해 주실 수 있을까요?
          </p>
        </div> */}
        {/* 🎤 녹음 버튼 */}
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1100, // 메시지 로그보다 위에 위치
          }}
        >
          {!recording ? (
            <button
              onClick={startRecording}
              style={{
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              🎤 답변하기
            </button>
          ) : (
            <button
              onClick={stopRecording}
              style={{
                padding: "10px 15px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ⏹ 답변마치기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
