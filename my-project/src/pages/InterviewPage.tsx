import { useEffect, useState, useRef } from "react";
import InterviewHeader from "../components/InterviewHeader";
import "../index.css";
import WebcamFeed from "../components/WebcamFeed";
import VirtualInterviewer from "../components/VirtualInterviewer";

const InterviewPage = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [recording, setRecording] = useState(false); // 녹음 상태 관리

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // 웹소켓 서버 연결
    const ws = new WebSocket("ws://localhost:8000/ws/gpt/");

    ws.onopen = () => {
      console.log("웹소켓 연결 성공!");
      ws.send(JSON.stringify({ type: "init", message: "InterviewPage 접속" }));
    };

    ws.onmessage = (event) => {
      console.log("서버로부터 원본 메시지 수신:", event.data);

      try {
        const data = JSON.parse(event.data);
        const decodedMessage = data.message.replace(
          /\\u([\dA-Fa-f]{4})/g,
          (_: string, group: string) => String.fromCharCode(parseInt(group, 16))
        );

        console.log("디코딩된 메시지:", decodedMessage);
        setMessages((prev) => [...prev, decodedMessage]);
      } catch (error) {
        console.error("JSON 파싱 또는 디코딩 오류:", error);
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
        socket.send(JSON.stringify({ type: "audio", audio: base64Audio }));
        console.log("음성 메시지 서버로 전송 완료!");
      };
    } else {
      console.error("웹소켓이 연결되지 않았습니다.");
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
            zIndex: 9999,
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
          <InterviewHeader />
        </div>

        {/* 웹소켓 메시지 표시 & 녹음 버튼 추가 */}
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <h4>서버 메시지 로그</h4>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>

          {/* 🎤 녹음 버튼 */}
          {!recording ? (
            <button
              onClick={startRecording}
              style={{
                marginTop: "10px",
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
                marginTop: "10px",
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
